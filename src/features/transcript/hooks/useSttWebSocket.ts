import { useCallback, useEffect, useRef, useState } from "react";
import { createSttStompClient, type SttStompClient } from "../api/sttStompClient";
import {
  clearPcmBuffer,
  drainPcmBuffer,
  pushPcmChunk,
} from "../lib/pcmSendBuffer";
import {
  computeReconnectDelayMs,
  STOMP_RECONNECT_ATTEMPTS,
  waitMs,
} from "../lib/stompReconnectPolicy";
import {
  normalizeDebateIdToString,
  type SttErrorData,
  type SttWebSocketMessage,
} from "../types/sttMessages";

export type SttConnectionStatus =
  | "idle"
  | "connecting"
  | "ready"
  | "recording"
  | "disconnected"
  | "reconnecting"
  | "stopping"
  | "ended"
  | "error";

const CONNECTION_UNAVAILABLE_ERROR: SttErrorData = {
  code: "STOMP_CONNECTION_FAILED",
  status: 503,
  message: "STT 서버와 연결할 수 없습니다. 네트워크 상태를 확인한 뒤 다시 시도해 주세요.",
};

const STOMP_LOG_PREFIX = "[STOMP]";

const PCM_CAPTURE_STATUSES: SttConnectionStatus[] = [
  "recording",
  "ready",
  "disconnected",
  "reconnecting",
];

function canCapturePcm(status: SttConnectionStatus, wasRecording: boolean): boolean {
  return wasRecording && PCM_CAPTURE_STATUSES.includes(status);
}

export type UseSttWebSocketOptions = {
  /** REST·라우트 debateId — destination 경로에 사용 */
  sessionDebateId?: string;
  onMessage?: (message: SttWebSocketMessage) => void;
  onReady?: (debateId: number, debateIdString: string) => void;
  onEnded?: () => void;
  onError?: (error: SttErrorData) => void;
};

function parseNumericDebateId(value: string | undefined): number | null {
  if (value == null || value === "") {
    return null;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export type UseSttWebSocketResult = {
  status: SttConnectionStatus;
  debateId: number | null;
  debateIdString: string | null;
  /** DEBATE_START 수신 시각(ms) */
  debateStartedAt: number | null;
  canSendAudio: boolean;
  /** recording 또는 (재연결 중이면서 녹음 세션 유지) */
  shouldCaptureAudio: boolean;
  lastError: SttErrorData | null;
  connect: () => void;
  disconnect: () => void;
  stopDebate: () => void;
  sendPcm: (buffer: ArrayBuffer) => void;
};

export function useSttWebSocket(options: UseSttWebSocketOptions = {}): UseSttWebSocketResult {
  const { sessionDebateId, onMessage, onReady, onEnded, onError } = options;

  const [status, setStatus] = useState<SttConnectionStatus>("idle");
  const [debateId, setDebateId] = useState<number | null>(() =>
    parseNumericDebateId(sessionDebateId),
  );
  const [debateStartedAt, setDebateStartedAt] = useState<number | null>(null);
  const [lastError, setLastError] = useState<SttErrorData | null>(null);
  const [wasRecording, setWasRecording] = useState(false);

  const clientRef = useRef<SttStompClient | null>(null);
  const callbacksRef = useRef({ onMessage, onReady, onEnded, onError });
  const debateIdRef = useRef<number | null>(parseNumericDebateId(sessionDebateId));
  const sessionDebateIdRef = useRef(sessionDebateId);
  const statusRef = useRef<SttConnectionStatus>("idle");
  const receiveBlockedRef = useRef(false);
  const sessionEndNotifiedRef = useRef(false);
  const stopRequestedRef = useRef(false);
  const pendingStopDebateIdRef = useRef<number | null>(null);
  const wasRecordingRef = useRef(false);
  const reconnectAttemptRef = useRef(0);
  const reconnectAbortRef = useRef<AbortController | null>(null);
  const intentionalDisconnectRef = useRef(false);
  const connectPromiseResolveRef = useRef<(() => void) | null>(null);
  const pcmBufferRef = useRef<ArrayBuffer[]>([]);

  useEffect(() => {
    sessionDebateIdRef.current = sessionDebateId;
    const parsed = parseNumericDebateId(sessionDebateId);
    if (parsed != null) {
      debateIdRef.current = parsed;
    }
  }, [sessionDebateId]);

  useEffect(() => {
    statusRef.current = status;
    console.info(`${STOMP_LOG_PREFIX} status changed`, {
      status,
      sessionDebateId: sessionDebateIdRef.current,
      debateId: debateIdRef.current,
    });
  }, [status]);

  useEffect(() => {
    callbacksRef.current = { onMessage, onReady, onEnded, onError };
  }, [onMessage, onReady, onEnded, onError]);

  const updateWasRecording = useCallback((value: boolean) => {
    wasRecordingRef.current = value;
    setWasRecording(value);
  }, []);

  const flushPcmBufferIfNeeded = useCallback(() => {
    const client = clientRef.current;
    const activeDebateId = debateIdRef.current;
    if (client == null || !client.isConnected() || activeDebateId == null) {
      return;
    }
    if (pcmBufferRef.current.length === 0) {
      return;
    }

    drainPcmBuffer(pcmBufferRef.current, chunk => {
      client.sendPcm(activeDebateId, chunk);
    });
  }, []);

  const notifySessionEnded = useCallback(() => {
    if (sessionEndNotifiedRef.current) {
      return;
    }
    sessionEndNotifiedRef.current = true;
    stopRequestedRef.current = false;
    receiveBlockedRef.current = false;
    updateWasRecording(false);
    clearPcmBuffer(pcmBufferRef.current);
    setStatus("ended");
    callbacksRef.current.onEnded?.();
  }, [updateWasRecording]);

  const resolveConnectWaiter = useCallback(() => {
    connectPromiseResolveRef.current?.();
    connectPromiseResolveRef.current = null;
  }, []);

  const waitForConnect = useCallback(
    (timeoutMs: number, signal: AbortSignal): Promise<boolean> => {
      if (clientRef.current?.isConnected()) {
        return Promise.resolve(true);
      }

      return new Promise(resolve => {
        const timer = window.setTimeout(() => {
          connectPromiseResolveRef.current = null;
          resolve(false);
        }, timeoutMs);

        const onAbort = () => {
          window.clearTimeout(timer);
          connectPromiseResolveRef.current = null;
          resolve(false);
        };

        signal.addEventListener("abort", onAbort, { once: true });

        connectPromiseResolveRef.current = () => {
          window.clearTimeout(timer);
          signal.removeEventListener("abort", onAbort);
          resolve(true);
        };
      });
    },
    [],
  );

  const handleServerMessage = useCallback(
    (message: SttWebSocketMessage) => {
      callbacksRef.current.onMessage?.(message);

      switch (message.type) {
        case "DEBATE_START": {
          sessionEndNotifiedRef.current = false;
          stopRequestedRef.current = false;
          pendingStopDebateIdRef.current = null;
          debateIdRef.current = message.debateId;
          setDebateId(message.debateId);
          setDebateStartedAt(prev => prev ?? Date.now());
          setLastError(null);
          updateWasRecording(true);
          statusRef.current = "recording";
          setStatus("recording");
          callbacksRef.current.onReady?.(
            message.debateId,
            normalizeDebateIdToString(message.debateId),
          );
          break;
        }
        case "DEBATE_END": {
          notifySessionEnded();
          intentionalDisconnectRef.current = true;
          clientRef.current?.deactivate();
          clientRef.current = null;
          break;
        }
        case "ERROR": {
          const errorData = message.data as SttErrorData;
          setLastError(errorData);
          setStatus("error");
          callbacksRef.current.onError?.(errorData);
          break;
        }
        default:
          break;
      }
    },
    [notifySessionEnded, updateWasRecording],
  );

  const subscribeAndStart = useCallback(() => {
    const client = clientRef.current;
    const activeDebateId =
      debateIdRef.current ?? parseNumericDebateId(sessionDebateIdRef.current);
    if (client == null || activeDebateId == null) {
      console.warn(`${STOMP_LOG_PREFIX} subscribe skipped: client or debateId unavailable`, {
        hasClient: client != null,
        activeDebateId,
        sessionDebateId: sessionDebateIdRef.current,
      });
      setStatus("error");
      return;
    }

    console.info(`${STOMP_LOG_PREFIX} subscribeAndStart`, { activeDebateId });

    flushPcmBufferIfNeeded();

    client.subscribeChannel(activeDebateId, message => {
      if (
        receiveBlockedRef.current &&
        message.type !== "DEBATE_END" &&
        message.type !== "ERROR"
      ) {
        return;
      }
      handleServerMessage(message);
    });

    const pendingStopId = pendingStopDebateIdRef.current;
    if (pendingStopId != null) {
      client.sendStop(pendingStopId);
      pendingStopDebateIdRef.current = null;
      return;
    }

    if (wasRecordingRef.current) {
      console.info(`${STOMP_LOG_PREFIX} resuming session after reconnect`, { activeDebateId });
    }

    setStatus("ready");
    client.sendStart(activeDebateId);
  }, [flushPcmBufferIfNeeded, handleServerMessage]);

  const runReconnectLoop = useCallback(async () => {
    console.warn(`${STOMP_LOG_PREFIX} reconnect loop started`);
    reconnectAbortRef.current?.abort();
    const abortController = new AbortController();
    reconnectAbortRef.current = abortController;

    for (let attempt = 0; attempt < STOMP_RECONNECT_ATTEMPTS.length; attempt += 1) {
      if (abortController.signal.aborted) {
        return;
      }

      const { baseDelayMs, connectTimeoutMs } = STOMP_RECONNECT_ATTEMPTS[attempt];
      const delayMs = computeReconnectDelayMs(baseDelayMs);
      await waitMs(delayMs);

      if (abortController.signal.aborted) {
        return;
      }

      reconnectAttemptRef.current = attempt + 1;
      statusRef.current = "reconnecting";
      setStatus("reconnecting");
      console.info(`${STOMP_LOG_PREFIX} reconnect attempt`, {
        attempt: reconnectAttemptRef.current,
        delayMs,
        connectTimeoutMs,
      });

      intentionalDisconnectRef.current = false;
      clientRef.current?.activate();

      const connected = await waitForConnect(connectTimeoutMs, abortController.signal);
      if (connected) {
        console.info(`${STOMP_LOG_PREFIX} reconnect succeeded`, { attempt: reconnectAttemptRef.current });
        reconnectAttemptRef.current = 0;
        subscribeAndStart();
        resolveConnectWaiter();
        return;
      }

      clientRef.current?.deactivate();
    }

    if (abortController.signal.aborted) {
      return;
    }

    reconnectAttemptRef.current = 0;
    console.error(`${STOMP_LOG_PREFIX} reconnect exhausted`);
    clearPcmBuffer(pcmBufferRef.current);
    setLastError(CONNECTION_UNAVAILABLE_ERROR);
    setStatus("error");
    callbacksRef.current.onError?.(CONNECTION_UNAVAILABLE_ERROR);
  }, [resolveConnectWaiter, subscribeAndStart, waitForConnect]);

  const ensureClient = useCallback(() => {
    if (clientRef.current) {
      return clientRef.current;
    }

    const client = createSttStompClient({
      onConnect: () => {
        console.info(`${STOMP_LOG_PREFIX} onConnect handler`, {
          status: statusRef.current,
          sessionDebateId: sessionDebateIdRef.current,
          debateId: debateIdRef.current,
        });
        resolveConnectWaiter();
        flushPcmBufferIfNeeded();

        if (statusRef.current === "reconnecting") {
          return;
        }

        if (
          statusRef.current === "connecting" ||
          statusRef.current === "ready" ||
          statusRef.current === "recording" ||
          statusRef.current === "stopping"
        ) {
          subscribeAndStart();
        }
      },
      onWebSocketClose: () => {
        console.warn(`${STOMP_LOG_PREFIX} onWebSocketClose handler`, {
          status: statusRef.current,
          intentionalDisconnect: intentionalDisconnectRef.current,
          stopRequested: stopRequestedRef.current,
        });
        if (intentionalDisconnectRef.current) {
          return;
        }

        if (
          stopRequestedRef.current ||
          statusRef.current === "ended" ||
          statusRef.current === "stopping"
        ) {
          if (stopRequestedRef.current && !sessionEndNotifiedRef.current) {
            notifySessionEnded();
          }
          return;
        }

        if (statusRef.current === "error") {
          return;
        }

        if (wasRecordingRef.current) {
          statusRef.current = "disconnected";
          setStatus("disconnected");
        }

        void runReconnectLoop();
      },
      onStompError: frame => {
        console.error(`${STOMP_LOG_PREFIX} onStompError handler`, {
          status: statusRef.current,
          headers: frame.headers,
          body: frame.body,
        });
        if (statusRef.current !== "stopping" && statusRef.current !== "ended") {
          setStatus("error");
        }
      },
    });

    clientRef.current = client;
    return client;
  }, [flushPcmBufferIfNeeded, notifySessionEnded, resolveConnectWaiter, runReconnectLoop, subscribeAndStart]);

  const connect = useCallback(() => {
    console.info(`${STOMP_LOG_PREFIX} connect requested`, {
      sessionDebateId: sessionDebateIdRef.current,
    });
    reconnectAbortRef.current?.abort();
    reconnectAbortRef.current = null;
    reconnectAttemptRef.current = 0;
    intentionalDisconnectRef.current = false;

    clientRef.current?.deactivate();
    clientRef.current = null;

    receiveBlockedRef.current = false;
    sessionEndNotifiedRef.current = false;
    stopRequestedRef.current = false;
    pendingStopDebateIdRef.current = null;
    updateWasRecording(false);
    clearPcmBuffer(pcmBufferRef.current);

    const parsedDebateId = parseNumericDebateId(sessionDebateIdRef.current);
    debateIdRef.current = parsedDebateId;
    setDebateId(parsedDebateId);
    setDebateStartedAt(null);
    setLastError(null);
    setStatus("connecting");

    const client = ensureClient();
    client.activate();
  }, [ensureClient, updateWasRecording]);

  const disconnect = useCallback(() => {
    console.info(`${STOMP_LOG_PREFIX} disconnect requested`, {
      status: statusRef.current,
    });
    reconnectAbortRef.current?.abort();
    reconnectAbortRef.current = null;
    intentionalDisconnectRef.current = true;

    clientRef.current?.deactivate();
    clientRef.current = null;

    receiveBlockedRef.current = false;
    stopRequestedRef.current = false;
    updateWasRecording(false);
    clearPcmBuffer(pcmBufferRef.current);
    debateIdRef.current = parseNumericDebateId(sessionDebateIdRef.current);

    setStatus(current => {
      if (current !== "ended" && current !== "error") {
        setDebateStartedAt(null);
        return "idle";
      }
      return current;
    });
  }, [updateWasRecording]);

  const stopDebate = useCallback(() => {
    const activeDebateId =
      debateIdRef.current ?? parseNumericDebateId(sessionDebateIdRef.current);
    if (activeDebateId == null) {
      console.warn("[useSttWebSocket] STOP skipped: debateId unavailable");
      notifySessionEnded();
      return;
    }

    receiveBlockedRef.current = true;
    stopRequestedRef.current = true;
    updateWasRecording(false);
    clearPcmBuffer(pcmBufferRef.current);
    setStatus("stopping");

    const sendStopOnce = () => {
      const client = clientRef.current;
      if (client?.isConnected()) {
        client.sendStop(activeDebateId);
        return true;
      }
      return false;
    };

    if (sendStopOnce()) {
      return;
    }

    pendingStopDebateIdRef.current = activeDebateId;
    intentionalDisconnectRef.current = false;
    clientRef.current?.deactivate();
    clientRef.current = null;

    const client = ensureClient();
    client.activate();

    const retryTimer = window.setInterval(() => {
      if (sendStopOnce()) {
        window.clearInterval(retryTimer);
      }
    }, 100);
    window.setTimeout(() => window.clearInterval(retryTimer), 5_000);
  }, [ensureClient, notifySessionEnded, updateWasRecording]);

  const sendPcm = useCallback((buffer: ArrayBuffer) => {
    const canAcceptPcm =
      !receiveBlockedRef.current && canCapturePcm(statusRef.current, wasRecordingRef.current);

    if (!canAcceptPcm) {
      return;
    }

    const activeDebateId = debateIdRef.current;
    const client = clientRef.current;

    if (client?.isConnected() && activeDebateId != null) {
      client.sendPcm(activeDebateId, buffer);
      return;
    }

    pushPcmChunk(pcmBufferRef.current, buffer);
  }, []);

  useEffect(() => {
    if (status !== "stopping") {
      return;
    }

    const timer = window.setTimeout(() => {
      notifySessionEnded();
      intentionalDisconnectRef.current = true;
      clientRef.current?.deactivate();
      clientRef.current = null;
    }, 5_000);

    return () => window.clearTimeout(timer);
  }, [status, notifySessionEnded]);

  useEffect(() => {
    return () => {
      reconnectAbortRef.current?.abort();
      intentionalDisconnectRef.current = true;
      clientRef.current?.deactivate();
      clientRef.current = null;
    };
  }, []);

  const resolvedDebateId = debateId ?? parseNumericDebateId(sessionDebateId);
  const debateIdString =
    resolvedDebateId != null ? normalizeDebateIdToString(resolvedDebateId) : null;

  const shouldCaptureAudio = canCapturePcm(status, wasRecording);

  return {
    status,
    debateId: resolvedDebateId,
    debateIdString,
    debateStartedAt,
    canSendAudio: status === "recording",
    shouldCaptureAudio,
    lastError,
    connect,
    disconnect,
    stopDebate,
    sendPcm,
  };
}

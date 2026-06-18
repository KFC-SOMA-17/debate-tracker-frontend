import { useCallback, useEffect, useRef, useState } from "react";
import { createSttStompClient, type SttStompClient } from "../api/sttStompClient";
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
  | "reconnecting"
  | "stopping"
  | "ended"
  | "error";

const CONNECTION_UNAVAILABLE_ERROR: SttErrorData = {
  code: "STOMP_CONNECTION_FAILED",
  status: 503,
  message: "STT 서버와 연결할 수 없습니다. 네트워크 상태를 확인한 뒤 다시 시도해 주세요.",
};

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

  useEffect(() => {
    sessionDebateIdRef.current = sessionDebateId;
    const parsed = parseNumericDebateId(sessionDebateId);
    if (parsed != null) {
      debateIdRef.current = parsed;
    }
  }, [sessionDebateId]);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    callbacksRef.current = { onMessage, onReady, onEnded, onError };
  }, [onMessage, onReady, onEnded, onError]);

  const notifySessionEnded = useCallback(() => {
    if (sessionEndNotifiedRef.current) {
      return;
    }
    sessionEndNotifiedRef.current = true;
    stopRequestedRef.current = false;
    receiveBlockedRef.current = false;
    wasRecordingRef.current = false;
    setStatus("ended");
    callbacksRef.current.onEnded?.();
  }, []);

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
          setDebateStartedAt(Date.now());
          setLastError(null);
          wasRecordingRef.current = true;
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
    [notifySessionEnded],
  );

  const subscribeAndStart = useCallback(() => {
    const client = clientRef.current;
    const activeDebateId =
      debateIdRef.current ?? parseNumericDebateId(sessionDebateIdRef.current);
    if (client == null || activeDebateId == null) {
      console.warn("[useSttWebSocket] subscribe skipped: client or debateId unavailable");
      setStatus("error");
      return;
    }

    client.subscribeTopic(activeDebateId, message => {
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
      statusRef.current = "recording";
      setStatus("recording");
      return;
    }

    setStatus("ready");
    client.sendStart(activeDebateId);
  }, [handleServerMessage]);

  const runReconnectLoop = useCallback(async () => {
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

      intentionalDisconnectRef.current = false;
      clientRef.current?.activate();

      const connected = await waitForConnect(connectTimeoutMs, abortController.signal);
      if (connected) {
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
        resolveConnectWaiter();

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

        void runReconnectLoop();
      },
      onStompError: () => {
        if (statusRef.current !== "stopping" && statusRef.current !== "ended") {
          setStatus("error");
        }
      },
    });

    clientRef.current = client;
    return client;
  }, [notifySessionEnded, resolveConnectWaiter, runReconnectLoop, subscribeAndStart]);

  const connect = useCallback(() => {
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
    wasRecordingRef.current = false;

    const parsedDebateId = parseNumericDebateId(sessionDebateIdRef.current);
    debateIdRef.current = parsedDebateId;
    setDebateId(parsedDebateId);
    setDebateStartedAt(null);
    setLastError(null);
    setStatus("connecting");

    const client = ensureClient();
    client.activate();
  }, [ensureClient]);

  const disconnect = useCallback(() => {
    reconnectAbortRef.current?.abort();
    reconnectAbortRef.current = null;
    intentionalDisconnectRef.current = true;

    clientRef.current?.deactivate();
    clientRef.current = null;

    receiveBlockedRef.current = false;
    stopRequestedRef.current = false;
    wasRecordingRef.current = false;
    debateIdRef.current = parseNumericDebateId(sessionDebateIdRef.current);

    setStatus(current => {
      if (current !== "ended" && current !== "error") {
        setDebateStartedAt(null);
        return "idle";
      }
      return current;
    });
  }, []);

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
    wasRecordingRef.current = false;
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
  }, [ensureClient, notifySessionEnded]);

  const sendPcm = useCallback((buffer: ArrayBuffer) => {
    if (statusRef.current !== "recording" || receiveBlockedRef.current) {
      return;
    }

    const activeDebateId = debateIdRef.current;
    const client = clientRef.current;
    if (activeDebateId == null || client == null || !client.isConnected()) {
      return;
    }

    client.sendPcm(activeDebateId, buffer);
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

  return {
    status,
    debateId: resolvedDebateId,
    debateIdString,
    debateStartedAt,
    canSendAudio: status === "recording",
    lastError,
    connect,
    disconnect,
    stopDebate,
    sendPcm,
  };
}

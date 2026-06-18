import { useCallback, useEffect, useRef, useState } from "react";
import { createSttWebSocket, type SttWebSocketConnection } from "../api/sttWebSocket";
import {
  normalizeDebateIdToString,
  parseSttWebSocketMessage,
  type SttErrorData,
  type SttWebSocketMessage,
} from "../types/sttMessages";

export type SttConnectionStatus =
  | "idle"
  | "connecting"
  | "ready"
  | "recording"
  | "stopping"
  | "ended"
  | "error";

export type UseSttWebSocketOptions = {
  /** REST·라우트 debateId — START·STOP 제어 메시지에 포함 */
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
  const [debateId, setDebateId] = useState<number | null>(null);
  const [debateStartedAt, setDebateStartedAt] = useState<number | null>(null);
  const [lastError, setLastError] = useState<SttErrorData | null>(null);

  const connectionRef = useRef<SttWebSocketConnection | null>(null);
  const callbacksRef = useRef({ onMessage, onReady, onEnded, onError });
  const debateIdRef = useRef<number | null>(null);
  const sessionDebateIdRef = useRef(sessionDebateId);
  const statusRef = useRef<SttConnectionStatus>("idle");
  /** STOP 전송 후 DEBATE_END·ERROR 외 서버 메시지 무시 */
  const receiveBlockedRef = useRef(false);
  const sessionEndNotifiedRef = useRef(false);
  const stopRequestedRef = useRef(false);
  /** 소켓 재연결 시 onOpen에서 START 대신 STOP만 전송 */
  const pendingStopDebateIdRef = useRef<number | null>(null);

  useEffect(() => {
    sessionDebateIdRef.current = sessionDebateId;
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
    setStatus("ended");
    callbacksRef.current.onEnded?.();
  }, []);

  const handleServerMessage = useCallback((message: SttWebSocketMessage) => {
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
        connectionRef.current?.close();
        connectionRef.current = null;
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
  }, [notifySessionEnded]);

  const openSocketConnection = useCallback(() => {
    const connection = createSttWebSocket({
      onOpen: () => {
        const pendingStopId = pendingStopDebateIdRef.current;
        if (pendingStopId != null) {
          connection.sendStop(pendingStopId);
          pendingStopDebateIdRef.current = null;
          return;
        }

        const activeDebateId = parseNumericDebateId(sessionDebateIdRef.current);
        if (activeDebateId == null) {
          console.warn("[useSttWebSocket] START skipped: debateId unavailable");
          setStatus("error");
          return;
        }
        setStatus("ready");
        connection.sendStart(activeDebateId);
      },
      onMessage: raw => {
        const parsed = parseSttWebSocketMessage(raw);
        if (!parsed) {
          return;
        }
        if (
          receiveBlockedRef.current &&
          parsed.type !== "DEBATE_END" &&
          parsed.type !== "ERROR"
        ) {
          return;
        }
        handleServerMessage(parsed);
      },
      onError: () => {
        if (connectionRef.current) {
          setStatus("error");
        }
      },
      onClose: () => {
        connectionRef.current = null;
        if (stopRequestedRef.current && !sessionEndNotifiedRef.current) {
          notifySessionEnded();
          return;
        }
        setStatus(current =>
          current === "ended" || current === "error" || current === "stopping" ? current : "idle",
        );
      },
    });

    connectionRef.current = connection;
    connection.connect();
  }, [handleServerMessage, notifySessionEnded]);

  const connect = useCallback(() => {
    connectionRef.current?.close();

    receiveBlockedRef.current = false;
    sessionEndNotifiedRef.current = false;
    stopRequestedRef.current = false;
    pendingStopDebateIdRef.current = null;
    debateIdRef.current = null;
    setStatus("connecting");
    setDebateId(null);
    setDebateStartedAt(null);
    setLastError(null);

    openSocketConnection();
  }, [openSocketConnection]);

  const disconnect = useCallback(() => {
    connectionRef.current?.close();
    connectionRef.current = null;
    receiveBlockedRef.current = false;
    stopRequestedRef.current = false;
    debateIdRef.current = null;
    setStatus(current => {
      if (current !== "ended" && current !== "error") {
        setDebateStartedAt(null);
        return "idle";
      }
      return current;
    });
    setDebateId(null);
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
    setStatus("stopping");

    const sendStopOnce = () => {
      const connection = connectionRef.current;
      if (connection?.getReadyState() === WebSocket.OPEN) {
        connection.sendStop(activeDebateId);
        return true;
      }
      return false;
    };

    if (sendStopOnce()) {
      return;
    }

    pendingStopDebateIdRef.current = activeDebateId;
    connectionRef.current?.close();
    connectionRef.current = null;
    openSocketConnection();

    const retryTimer = window.setInterval(() => {
      if (sendStopOnce()) {
        window.clearInterval(retryTimer);
      }
    }, 100);
    window.setTimeout(() => window.clearInterval(retryTimer), 5_000);
  }, [notifySessionEnded, openSocketConnection]);

  const sendPcm = useCallback((buffer: ArrayBuffer) => {
    if (statusRef.current !== "recording" || receiveBlockedRef.current) {
      return;
    }
    connectionRef.current?.sendPcm(buffer);
  }, []);

  useEffect(() => {
    if (status !== "stopping") {
      return;
    }

    const timer = window.setTimeout(() => {
      notifySessionEnded();
      connectionRef.current?.close();
      connectionRef.current = null;
    }, 5_000);

    return () => window.clearTimeout(timer);
  }, [status, notifySessionEnded]);

  useEffect(() => {
    return () => {
      connectionRef.current?.close();
      connectionRef.current = null;
    };
  }, []);

  const debateIdString = debateId != null ? normalizeDebateIdToString(debateId) : null;

  return {
    status,
    debateId,
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

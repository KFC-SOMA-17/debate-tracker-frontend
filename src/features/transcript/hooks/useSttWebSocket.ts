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
  /** REST·라우트 debateId — DEBATE_START 수신 전 STOP 등 fallback */
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
  const [lastError, setLastError] = useState<SttErrorData | null>(null);

  const connectionRef = useRef<SttWebSocketConnection | null>(null);
  const callbacksRef = useRef({ onMessage, onReady, onEnded, onError });
  const debateIdRef = useRef<number | null>(null);
  const sessionDebateIdRef = useRef(sessionDebateId);
  /** STOP 전송 후 DEBATE_END·ERROR 외 서버 메시지 무시 */
  const receiveBlockedRef = useRef(false);
  const sessionEndNotifiedRef = useRef(false);
  const stopRequestedRef = useRef(false);

  useEffect(() => {
    sessionDebateIdRef.current = sessionDebateId;
  }, [sessionDebateId]);

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
        debateIdRef.current = message.debateId;
        setDebateId(message.debateId);
        setLastError(null);
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

  const connect = useCallback(() => {
    connectionRef.current?.close();

    receiveBlockedRef.current = false;
    sessionEndNotifiedRef.current = false;
    stopRequestedRef.current = false;
    debateIdRef.current = null;
    setStatus("connecting");
    setDebateId(null);
    setLastError(null);

    const connection = createSttWebSocket({
      onOpen: () => {
        setStatus("ready");
        connection.sendStart();
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
        setStatus(current => (current === "ended" || current === "error" ? current : "idle"));
      },
    });

    connectionRef.current = connection;
    connection.connect();
  }, [handleServerMessage, notifySessionEnded]);

  const disconnect = useCallback(() => {
    connectionRef.current?.close();
    connectionRef.current = null;
    receiveBlockedRef.current = false;
    stopRequestedRef.current = false;
    debateIdRef.current = null;
    setStatus(current => (current === "ended" || current === "error" ? current : "idle"));
    setDebateId(null);
  }, []);

  const stopDebate = useCallback(() => {
    const connection = connectionRef.current;
    if (!connection) {
      return;
    }

    const activeDebateId =
      debateIdRef.current ?? parseNumericDebateId(sessionDebateIdRef.current);
    if (activeDebateId == null) {
      console.warn("[useSttWebSocket] STOP skipped: debateId unavailable");
      return;
    }

    receiveBlockedRef.current = true;
    stopRequestedRef.current = true;
    setStatus("stopping");

    const sendStopOnce = () => {
      if (connection.getReadyState() === WebSocket.OPEN) {
        connection.sendStop(activeDebateId);
        return true;
      }
      return false;
    };

    if (!sendStopOnce()) {
      const retryTimer = window.setInterval(() => {
        if (sendStopOnce()) {
          window.clearInterval(retryTimer);
        }
      }, 100);
      window.setTimeout(() => window.clearInterval(retryTimer), 5_000);
    }
  }, []);

  const sendPcm = useCallback(
    (buffer: ArrayBuffer) => {
      if (status !== "recording" || receiveBlockedRef.current) {
        return;
      }
      connectionRef.current?.sendPcm(buffer);
    },
    [status],
  );

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
    canSendAudio: status === "recording",
    lastError,
    connect,
    disconnect,
    stopDebate,
    sendPcm,
  };
}

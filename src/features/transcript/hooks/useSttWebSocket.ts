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
  onMessage?: (message: SttWebSocketMessage) => void;
  onReady?: (debateId: number, debateIdString: string) => void;
  onEnded?: () => void;
  onError?: (error: SttErrorData) => void;
};

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
  const { onMessage, onReady, onEnded, onError } = options;

  const [status, setStatus] = useState<SttConnectionStatus>("idle");
  const [debateId, setDebateId] = useState<number | null>(null);
  const [lastError, setLastError] = useState<SttErrorData | null>(null);

  const connectionRef = useRef<SttWebSocketConnection | null>(null);
  const callbacksRef = useRef({ onMessage, onReady, onEnded, onError });

  useEffect(() => {
    callbacksRef.current = { onMessage, onReady, onEnded, onError };
  }, [onMessage, onReady, onEnded, onError]);

  const handleServerMessage = useCallback((message: SttWebSocketMessage) => {
    callbacksRef.current.onMessage?.(message);

    switch (message.type) {
      case "DEBATE_START": {
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
        setStatus("ended");
        callbacksRef.current.onEnded?.();
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
  }, []);

  const connect = useCallback(() => {
    connectionRef.current?.close();

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
        if (parsed) {
          handleServerMessage(parsed);
        }
      },
      onError: () => {
        if (connectionRef.current) {
          setStatus("error");
        }
      },
      onClose: () => {
        connectionRef.current = null;
        setStatus(current => (current === "ended" || current === "error" ? current : "idle"));
      },
    });

    connectionRef.current = connection;
    connection.connect();
  }, [handleServerMessage]);

  const disconnect = useCallback(() => {
    connectionRef.current?.close();
    connectionRef.current = null;
    setStatus("idle");
    setDebateId(null);
  }, []);

  const stopDebate = useCallback(() => {
    const activeDebateId = debateId;
    const connection = connectionRef.current;
    if (activeDebateId == null || !connection) {
      return;
    }
    setStatus("stopping");
    connection.sendStop(activeDebateId);
  }, [debateId]);

  const sendPcm = useCallback(
    (buffer: ArrayBuffer) => {
      if (status !== "recording") {
        return;
      }
      connectionRef.current?.sendPcm(buffer);
    },
    [status],
  );

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

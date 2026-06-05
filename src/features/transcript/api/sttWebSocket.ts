import type { ControlMessage } from "../types/sttMessages";
import { getSttWebSocketUrl } from "./getSttWebSocketUrl";

export type SttWebSocketHandlers = {
  onOpen?: () => void;
  onMessage?: (data: string) => void;
  onError?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
};

export type SttWebSocketConnection = {
  connect: () => void;
  sendStart: (debateId: number) => void;
  sendStop: (debateId: number) => void;
  sendPcm: (buffer: ArrayBuffer) => void;
  close: () => void;
  getReadyState: () => number;
};

function sendControlMessage(socket: WebSocket, message: ControlMessage): void {
  if (socket.readyState !== WebSocket.OPEN) {
    return;
  }
  socket.send(JSON.stringify(message));
}

export function createSttWebSocket(handlers: SttWebSocketHandlers = {}): SttWebSocketConnection {
  let socket: WebSocket | null = null;

  const ensureSocket = (): WebSocket => {
    if (socket) {
      return socket;
    }

    const instance = new WebSocket(getSttWebSocketUrl());
    instance.binaryType = "arraybuffer";

    instance.addEventListener("open", () => {
      handlers.onOpen?.();
    });

    instance.addEventListener("message", event => {
      if (typeof event.data === "string") {
        handlers.onMessage?.(event.data);
      }
    });

    instance.addEventListener("error", event => {
      handlers.onError?.(event);
    });

    instance.addEventListener("close", event => {
      handlers.onClose?.(event);
    });

    socket = instance;
    return instance;
  };

  return {
    connect() {
      ensureSocket();
    },
    sendStart(debateId) {
      const activeSocket = socket;
      if (!activeSocket || activeSocket.readyState !== WebSocket.OPEN) {
        return;
      }
      sendControlMessage(activeSocket, { type: "START", debateId });
    },
    sendStop(debateId) {
      const activeSocket = socket;
      if (!activeSocket || activeSocket.readyState !== WebSocket.OPEN) {
        return;
      }
      sendControlMessage(activeSocket, { type: "STOP", debateId });
    },
    sendPcm(buffer) {
      const activeSocket = socket;
      if (!activeSocket || activeSocket.readyState !== WebSocket.OPEN) {
        return;
      }
      activeSocket.send(buffer);
    },
    close() {
      socket?.close();
      socket = null;
    },
    getReadyState() {
      return socket?.readyState ?? WebSocket.CLOSED;
    },
  };
}

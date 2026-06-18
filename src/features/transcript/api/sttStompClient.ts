import { Client, type IFrame, type StompSubscription } from "@stomp/stompjs";
import {
  debateAudioDestination,
  debateStartDestination,
  debateStopDestination,
  debateTopicDestination,
} from "./stompDestinations";
import { getStompBrokerUrl } from "./getStompBrokerUrl";
import { parseSttWebSocketMessage, type SttWebSocketMessage } from "../types/sttMessages";

export type SttStompClientHandlers = {
  onConnect?: () => void;
  onDisconnect?: () => void;
  onWebSocketClose?: (event: CloseEvent) => void;
  onStompError?: (frame: IFrame) => void;
};

export type SttStompClient = {
  activate: () => void;
  deactivate: () => void;
  isConnected: () => boolean;
  subscribeTopic: (
    debateId: number,
    onMessage: (message: SttWebSocketMessage) => void,
  ) => StompSubscription | null;
  unsubscribeAll: () => void;
  sendStart: (debateId: number) => void;
  sendStop: (debateId: number) => void;
  sendPcm: (debateId: number, buffer: ArrayBuffer) => void;
};

const STOMP_HEARTBEAT_MS = 2_000;

export function createSttStompClient(handlers: SttStompClientHandlers = {}): SttStompClient {
  let topicSubscription: StompSubscription | null = null;

  const client = new Client({
    brokerURL: getStompBrokerUrl(),
    reconnectDelay: 0,
    heartbeatIncoming: STOMP_HEARTBEAT_MS,
    heartbeatOutgoing: STOMP_HEARTBEAT_MS,
  });

  client.onConnect = () => {
    handlers.onConnect?.();
  };

  client.onDisconnect = () => {
    handlers.onDisconnect?.();
  };

  client.onWebSocketClose = event => {
    handlers.onWebSocketClose?.(event);
  };

  client.onStompError = frame => {
    handlers.onStompError?.(frame);
  };

  const ensureConnected = (): boolean => {
    return client.connected;
  };

  return {
    activate() {
      if (!client.active) {
        client.activate();
      }
    },
    deactivate() {
      topicSubscription?.unsubscribe();
      topicSubscription = null;
      if (client.active) {
        client.deactivate();
      }
    },
    isConnected() {
      return client.connected;
    },
    subscribeTopic(debateId, onMessage) {
      if (!ensureConnected()) {
        return null;
      }

      topicSubscription?.unsubscribe();
      topicSubscription = client.subscribe(debateTopicDestination(debateId), frame => {
        if (frame.body == null || frame.body === "") {
          return;
        }
        const parsed = parseSttWebSocketMessage(frame.body);
        if (parsed) {
          onMessage(parsed);
        }
      });

      return topicSubscription;
    },
    unsubscribeAll() {
      topicSubscription?.unsubscribe();
      topicSubscription = null;
    },
    sendStart(debateId) {
      if (!ensureConnected()) {
        return;
      }
      client.publish({
        destination: debateStartDestination(debateId),
        body: "{}",
      });
    },
    sendStop(debateId) {
      if (!ensureConnected()) {
        return;
      }
      client.publish({
        destination: debateStopDestination(debateId),
        body: "{}",
      });
    },
    sendPcm(debateId, buffer) {
      if (!ensureConnected()) {
        return;
      }
      client.publish({
        destination: debateAudioDestination(debateId),
        binaryBody: new Uint8Array(buffer),
        headers: { "content-type": "application/octet-stream" },
      });
    },
  };
}

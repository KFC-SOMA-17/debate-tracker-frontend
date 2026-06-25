import { Client, type IFrame, type StompSubscription } from "@stomp/stompjs";
import {
  debateAudioDestination,
  debateChannelDestination,
  debateStartDestination,
  debateStopDestination,
} from "./stompDestinations";
import { getStompBrokerUrl } from "./getStompBrokerUrl";
import {
  logStompReceive,
  logStompReceiveParseFailure,
  logStompSend,
  resetStompTrafficLogger,
} from "../lib/stompTrafficLogger";
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
  subscribeChannel: (
    debateId: number,
    onMessage: (message: SttWebSocketMessage) => void,
  ) => StompSubscription | null;
  unsubscribeAll: () => void;
  sendStart: (debateId: number) => void;
  sendStop: (debateId: number) => void;
  sendPcm: (debateId: number, buffer: ArrayBuffer) => void;
};

const STOMP_HEARTBEAT_MS = 2_000;
const STOMP_LOG_PREFIX = "[STOMP]";

export function createSttStompClient(handlers: SttStompClientHandlers = {}): SttStompClient {
  let channelSubscription: StompSubscription | null = null;
  const brokerURL = getStompBrokerUrl();

  console.info(`${STOMP_LOG_PREFIX} creating client`, { brokerURL });

  const client = new Client({
    brokerURL,
    reconnectDelay: 0,
    heartbeatIncoming: STOMP_HEARTBEAT_MS,
    heartbeatOutgoing: STOMP_HEARTBEAT_MS,
    debug: message => {
      console.debug(`${STOMP_LOG_PREFIX} protocol`, message);
    },
  });

  client.onConnect = frame => {
    console.info(`${STOMP_LOG_PREFIX} connected`, { headers: frame.headers });
    handlers.onConnect?.();
  };

  client.onDisconnect = () => {
    console.info(`${STOMP_LOG_PREFIX} disconnected`);
    handlers.onDisconnect?.();
  };

  client.onWebSocketClose = event => {
    console.warn(`${STOMP_LOG_PREFIX} WebSocket closed`, {
      code: event.code,
      reason: event.reason,
      wasClean: event.wasClean,
    });
    handlers.onWebSocketClose?.(event);
  };

  client.onStompError = frame => {
    console.error(`${STOMP_LOG_PREFIX} broker error`, {
      headers: frame.headers,
      body: frame.body,
    });
    handlers.onStompError?.(frame);
  };

  const ensureConnected = (): boolean => {
    return client.connected;
  };

  return {
    activate() {
      console.info(`${STOMP_LOG_PREFIX} activate requested`, { active: client.active, connected: client.connected });
      if (!client.active) {
        client.activate();
      }
    },
    deactivate() {
      console.info(`${STOMP_LOG_PREFIX} deactivate requested`, { active: client.active, connected: client.connected });
      resetStompTrafficLogger();
      channelSubscription?.unsubscribe();
      channelSubscription = null;
      if (client.active) {
        client.deactivate();
      }
    },
    isConnected() {
      return client.connected;
    },
    subscribeChannel(debateId, onMessage) {
      if (!ensureConnected()) {
        console.warn(`${STOMP_LOG_PREFIX} subscribe skipped: not connected`, { debateId });
        return null;
      }

      const destination = debateChannelDestination(debateId);
      console.info(`${STOMP_LOG_PREFIX} subscribing`, { debateId, destination });

      channelSubscription?.unsubscribe();
      channelSubscription = client.subscribe(debateChannelDestination(debateId), frame => {
        logStompReceive({
          destination: frame.headers.destination,
          headers: frame.headers as Record<string, string>,
          body: frame.body,
          binaryBody: frame.binaryBody,
        });

        if (frame.body == null || frame.body === "") {
          return;
        }
        const parsed = parseSttWebSocketMessage(frame.body);
        if (parsed) {
          onMessage(parsed);
          return;
        }
        logStompReceiveParseFailure(frame.body, frame.headers.destination);
      });

      return channelSubscription;
    },
    unsubscribeAll() {
      channelSubscription?.unsubscribe();
      channelSubscription = null;
    },
    sendStart(debateId) {
      if (!ensureConnected()) {
        console.warn(`${STOMP_LOG_PREFIX} sendStart skipped: not connected`, { debateId });
        return;
      }
      const destination = debateStartDestination(debateId);
      console.info(`${STOMP_LOG_PREFIX} sendStart`, { debateId, destination });
      logStompSend({ destination, body: "{}" });
      client.publish({
        destination,
        body: "{}",
      });
    },
    sendStop(debateId) {
      if (!ensureConnected()) {
        console.warn(`${STOMP_LOG_PREFIX} sendStop skipped: not connected`, { debateId });
        return;
      }
      const destination = debateStopDestination(debateId);
      console.info(`${STOMP_LOG_PREFIX} sendStop`, { debateId, destination });
      logStompSend({ destination, body: "{}" });
      client.publish({
        destination,
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

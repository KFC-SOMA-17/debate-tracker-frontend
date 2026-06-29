import { ws } from "msw";
import type { TranscriptionSegment } from "@/features/transcript/types/sttMessages";
import { getCurrentMockDebateNumericId } from "../fixtures/mockDebateStore";
import {
  createMockSegmentId,
  MOCK_TRANSCRIPT_TEMPLATES,
  toDraftMockContent,
  toRefinedSegment,
} from "../fixtures/transcriptScenario";
import {
  encodeStompConnected,
  encodeStompMessage,
  parseStompFrame,
  type StompFrame,
} from "./stompFrame";

const DEBATE_START_DELAY_MS = 500;
const TRANSCRIPTION_INTERVAL_MS = 1_500;
const REFINED_INTERVAL_MS = 5_000;
const STOP_REFINED_DELAY_MS = 800;
const DEBATE_END_DELAY_MS = 1_500;

const stompWebSocketLink = ws.link(/\/ws$/);

type ClientSubscription = {
  id: string;
  destination: string;
};

function parseDebateIdFromAppDestination(destination: string): number | null {
  const match = destination.match(/^\/app\/debate\/(\d+)\/(?:start|stop|audio)$/);
  if (match == null) {
    return null;
  }
  const parsed = Number(match[1]);
  return Number.isFinite(parsed) ? parsed : null;
}

function sendToClient(client: { send: (data: string) => void }, payload: string): void {
  client.send(payload);
}

function broadcastMessage(
  client: { send: (data: string) => void },
  subscription: ClientSubscription,
  body: unknown,
): void {
  sendToClient(
    client,
    encodeStompMessage(subscription.destination, subscription.id, JSON.stringify(body)),
  );
}

export const sttWebSocketHandlers = [
  stompWebSocketLink.addEventListener("connection", ({ client }) => {
    let debateId = getCurrentMockDebateNumericId();
    let segmentSequence = 0;
    let transcriptionTimer: ReturnType<typeof setInterval> | null = null;
    let refinedTimer: ReturnType<typeof setInterval> | null = null;
    const segmentsById = new Map<string, TranscriptionSegment>();
    const subscriptions: ClientSubscription[] = [];

    const clearTimers = () => {
      if (transcriptionTimer) {
        clearInterval(transcriptionTimer);
        transcriptionTimer = null;
      }
      if (refinedTimer) {
        clearInterval(refinedTimer);
        refinedTimer = null;
      }
    };

    const sendRefinedForRecent = () => {
      const segments = [...segmentsById.values()].slice(-3).map(toRefinedSegment);
      if (segments.length === 0) {
        return;
      }

      const payload = {
        debateId,
        type: "REFINED_TRANSCRIPTION",
        data: { segments },
      };

      for (const subscription of subscriptions) {
        broadcastMessage(client, subscription, payload);
      }
    };

    const startTranscriptionLoop = () => {
      transcriptionTimer = setInterval(() => {
        const template = MOCK_TRANSCRIPT_TEMPLATES[segmentSequence % MOCK_TRANSCRIPT_TEMPLATES.length];
        const segment: TranscriptionSegment = {
          id: createMockSegmentId(segmentSequence),
          ...template,
          content: toDraftMockContent(template.content),
        };
        segmentSequence += 1;
        segmentsById.set(segment.id, segment);

        const payload = {
          debateId,
          type: "TRANSCRIPTION",
          data: segment,
        };

        for (const subscription of subscriptions) {
          broadcastMessage(client, subscription, payload);
        }
      }, TRANSCRIPTION_INTERVAL_MS);

      refinedTimer = setInterval(() => {
        sendRefinedForRecent();
      }, REFINED_INTERVAL_MS);
    };

    const handleSend = (frame: StompFrame) => {
      const destination = frame.headers.destination;
      if (destination == null) {
        return;
      }

      const startDebateId = parseDebateIdFromAppDestination(destination);
      if (startDebateId == null) {
        return;
      }

      if (destination.endsWith("/start")) {
        debateId = startDebateId;
        segmentsById.clear();
        segmentSequence = 0;
        clearTimers();

        setTimeout(() => {
          const payload = {
            debateId,
            type: "DEBATE_START",
            data: null,
          };

          for (const subscription of subscriptions) {
            broadcastMessage(client, subscription, payload);
          }
          startTranscriptionLoop();
        }, DEBATE_START_DELAY_MS);
        return;
      }

      if (destination.endsWith("/stop")) {
        clearTimers();
        setTimeout(() => {
          sendRefinedForRecent();
        }, STOP_REFINED_DELAY_MS);
        setTimeout(() => {
          const payload = {
            debateId: startDebateId,
            type: "DEBATE_END",
            data: null,
          };

          for (const subscription of subscriptions) {
            broadcastMessage(client, subscription, payload);
          }
        }, DEBATE_END_DELAY_MS);
      }
    };

    client.addEventListener("message", event => {
      const raw =
        typeof event.data === "string"
          ? event.data
          : event.data instanceof ArrayBuffer
            ? new TextDecoder().decode(event.data)
            : null;

      if (raw == null) {
        return;
      }

      const frame = parseStompFrame(raw);
      if (frame == null) {
        return;
      }

      switch (frame.command) {
        case "CONNECT":
        case "STOMP":
          sendToClient(client, encodeStompConnected());
          break;
        case "SUBSCRIBE": {
          const id = frame.headers.id;
          const destination = frame.headers.destination;
          if (id && destination) {
            subscriptions.push({ id, destination });
          }
          break;
        }
        case "UNSUBSCRIBE": {
          const id = frame.headers.id;
          if (id) {
            const index = subscriptions.findIndex(subscription => subscription.id === id);
            if (index >= 0) {
              subscriptions.splice(index, 1);
            }
          }
          break;
        }
        case "SEND":
          handleSend(frame);
          break;
        default:
          break;
      }
    });

    client.addEventListener("close", () => {
      clearTimers();
    });
  }),
];

import { ws } from "msw";
import type { ControlMessage, TranscriptionSegment } from "@/features/transcript/types/sttMessages";
import { getCurrentMockDebateNumericId } from "../fixtures/mockDebateStore";
import {
  createMockSegmentId,
  MOCK_TRANSCRIPT_TEMPLATES,
  toDraftMockContent,
  toRefinedSegment,
} from "../fixtures/transcriptScenario";

const DEBATE_START_DELAY_MS = 500;
const TRANSCRIPTION_INTERVAL_MS = 1_500;
const REFINED_INTERVAL_MS = 5_000;
const STOP_REFINED_DELAY_MS = 800;
const DEBATE_END_DELAY_MS = 1_500;

const sttWebSocketLink = ws.link(/\/ws\/stt$/);

function sendJson(client: { send: (data: string) => void }, payload: unknown): void {
  client.send(JSON.stringify(payload));
}

function parseControlMessage(raw: string): ControlMessage | null {
  try {
    const json: unknown = JSON.parse(raw);
    if (typeof json !== "object" || json === null) {
      return null;
    }
    const record = json as Record<string, unknown>;
    if (record.type === "START" && typeof record.debateId === "number") {
      return { type: "START", debateId: record.debateId };
    }
    if (record.type === "STOP" && typeof record.debateId === "number") {
      return { type: "STOP", debateId: record.debateId };
    }
    return null;
  } catch {
    return null;
  }
}

export const sttWebSocketHandlers = [
  sttWebSocketLink.addEventListener("connection", ({ client }) => {
    let debateId = getCurrentMockDebateNumericId();
    let segmentSequence = 0;
    let transcriptionTimer: ReturnType<typeof setInterval> | null = null;
    let refinedTimer: ReturnType<typeof setInterval> | null = null;
    const segmentsById = new Map<string, TranscriptionSegment>();

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
      sendJson(client, {
        debateId,
        type: "REFINED_TRANSCRIPTION",
        data: { segments },
      });
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

        sendJson(client, {
          debateId,
          type: "TRANSCRIPTION",
          data: segment,
        });
      }, TRANSCRIPTION_INTERVAL_MS);

      refinedTimer = setInterval(() => {
        sendRefinedForRecent();
      }, REFINED_INTERVAL_MS);
    };

    client.addEventListener("message", event => {
      if (typeof event.data !== "string") {
        return;
      }

      const control = parseControlMessage(event.data);
      if (!control) {
        return;
      }

      if (control.type === "START") {
        debateId = control.debateId;
        segmentsById.clear();
        segmentSequence = 0;
        clearTimers();

        setTimeout(() => {
          sendJson(client, {
            debateId,
            type: "DEBATE_START",
            data: null,
          });
          startTranscriptionLoop();
        }, DEBATE_START_DELAY_MS);
        return;
      }

      if (control.type === "STOP") {
        clearTimers();
        setTimeout(() => {
          sendRefinedForRecent();
        }, STOP_REFINED_DELAY_MS);
        setTimeout(() => {
          sendJson(client, {
            debateId: control.debateId,
            type: "DEBATE_END",
            data: null,
          });
        }, DEBATE_END_DELAY_MS);
      }
    });

    client.addEventListener("close", () => {
      clearTimers();
    });
  }),
];

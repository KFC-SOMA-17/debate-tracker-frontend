export type SttMessageType =
  | "DEBATE_START"
  | "TRANSCRIPTION"
  | "REFINED_TRANSCRIPTION"
  | "ERROR"
  | "DEBATE_END";

export type TranscriptionSegment = {
  id: string;
  content: string;
  speaker: string;
  startAt: number;
  endAt: number;
};

export type RefinedSegments = {
  segments: TranscriptionSegment[];
};

export type SttErrorData = {
  code: string;
  status: number;
  message: string;
};

export type SttWebSocketMessage = {
  debateId: number;
  type: SttMessageType;
  data: TranscriptionSegment | RefinedSegments | SttErrorData | null;
};

const STT_MESSAGE_TYPES: ReadonlySet<string> = new Set([
  "DEBATE_START",
  "TRANSCRIPTION",
  "REFINED_TRANSCRIPTION",
  "ERROR",
  "DEBATE_END",
]);

function isTranscriptionSegment(value: unknown): value is TranscriptionSegment {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const record = value as Record<string, unknown>;
  return (
    typeof record.id === "string" &&
    typeof record.content === "string" &&
    typeof record.speaker === "string" &&
    typeof record.startAt === "number" &&
    typeof record.endAt === "number"
  );
}

function isRefinedSegments(value: unknown): value is RefinedSegments {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const segments = (value as RefinedSegments).segments;
  return Array.isArray(segments) && segments.every(isTranscriptionSegment);
}

function isSttErrorData(value: unknown): value is SttErrorData {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const record = value as Record<string, unknown>;
  return (
    typeof record.code === "string" &&
    typeof record.status === "number" &&
    typeof record.message === "string"
  );
}

export function parseSttWebSocketMessage(raw: string): SttWebSocketMessage | null {
  try {
    const json: unknown = JSON.parse(raw);
    if (typeof json !== "object" || json === null) {
      return null;
    }

    const record = json as Record<string, unknown>;
    if (typeof record.debateId !== "number" || typeof record.type !== "string") {
      return null;
    }
    if (!STT_MESSAGE_TYPES.has(record.type)) {
      return null;
    }

    const type = record.type as SttMessageType;

    if (type === "DEBATE_START" || type === "DEBATE_END") {
      if (record.data !== null) {
        return null;
      }
      return { debateId: record.debateId, type, data: null };
    }

    if (type === "TRANSCRIPTION") {
      if (!isTranscriptionSegment(record.data)) {
        return null;
      }
      return { debateId: record.debateId, type, data: record.data };
    }

    if (type === "REFINED_TRANSCRIPTION") {
      if (!isRefinedSegments(record.data)) {
        return null;
      }
      return { debateId: record.debateId, type, data: record.data };
    }

    if (type === "ERROR") {
      if (!isSttErrorData(record.data)) {
        return null;
      }
      return { debateId: record.debateId, type, data: record.data };
    }

    return null;
  } catch {
    return null;
  }
}

export function normalizeDebateIdToString(debateId: number): string {
  return String(debateId);
}

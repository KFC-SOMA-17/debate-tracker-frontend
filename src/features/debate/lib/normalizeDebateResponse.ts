export type NormalizedDebate = {
  debateId: string;
  topic: string;
};

function readString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function normalizeDebateResponse(raw: unknown): NormalizedDebate {
  if (typeof raw !== "object" || raw === null) {
    return { debateId: "", topic: "" };
  }

  const record = raw as Record<string, unknown>;
  const debateId =
    readString(record.debateId) ??
    (record.id != null ? String(record.id).trim() : "") ??
    "";
  const topic = readString(record.topic) ?? readString(record.title) ?? "";

  return { debateId, topic };
}

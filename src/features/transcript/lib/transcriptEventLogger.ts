import type { SttWebSocketMessage } from "../types/sttMessages";

type LoggedEvent = {
  seq: number;
  receivedAt: string;
  type: SttWebSocketMessage["type"];
  debateId: number;
  data: SttWebSocketMessage["data"];
};

type TranscriptEventLog = {
  debateId: string;
  startedAt: string;
  endedAt?: string;
  events: LoggedEvent[];
};

let activeLog: TranscriptEventLog | null = null;
let sequence = 0;

function isDevEnvironment(): boolean {
  return import.meta.env.DEV;
}

export function resetTranscriptEventLog(debateId: string): void {
  if (!isDevEnvironment()) {
    return;
  }
  activeLog = {
    debateId,
    startedAt: new Date().toISOString(),
    events: [],
  };
  sequence = 0;
}

export function pushTranscriptEvent(message: SttWebSocketMessage): void {
  if (!isDevEnvironment() || !activeLog) {
    return;
  }
  if (message.type !== "TRANSCRIPTION" && message.type !== "REFINED_TRANSCRIPTION") {
    return;
  }

  sequence += 1;
  activeLog.events.push({
    seq: sequence,
    receivedAt: new Date().toISOString(),
    type: message.type,
    debateId: message.debateId,
    data: message.data,
  });

  console.info("[transcript-event]", message.type, message);
}

export function flushTranscriptEventLogDownload(): void {
  if (!isDevEnvironment() || !activeLog) {
    return;
  }

  const payload: TranscriptEventLog = {
    ...activeLog,
    endedAt: new Date().toISOString(),
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${payload.debateId}-transcript-events.json`;
  anchor.click();
  URL.revokeObjectURL(url);

  activeLog = null;
  sequence = 0;
}

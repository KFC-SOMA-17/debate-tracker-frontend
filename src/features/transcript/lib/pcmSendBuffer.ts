import { CHUNK_DURATION_MS } from "@/features/audioCapture/constants/audioProcessing";

/** 단절 중 보관할 최대 시간 (ms) */
export const PCM_BUFFER_MAX_DURATION_MS = 30_000;

/** 30s @ 200ms chunk */
export const PCM_BUFFER_MAX_CHUNKS = PCM_BUFFER_MAX_DURATION_MS / CHUNK_DURATION_MS;

export function pushPcmChunk(buffer: ArrayBuffer[], chunk: ArrayBuffer): boolean {
  if (buffer.length >= PCM_BUFFER_MAX_CHUNKS) {
    return false;
  }

  buffer.push(chunk.slice(0));
  return true;
}

export function drainPcmBuffer(
  buffer: ArrayBuffer[],
  send: (chunk: ArrayBuffer) => void,
): number {
  const count = buffer.length;

  for (const chunk of buffer) {
    send(chunk);
  }

  buffer.length = 0;
  return count;
}

export function clearPcmBuffer(buffer: ArrayBuffer[]): void {
  buffer.length = 0;
}

import { describe, expect, it } from "vitest";
import {
  clearPcmBuffer,
  drainPcmBuffer,
  PCM_BUFFER_MAX_CHUNKS,
  pushPcmChunk,
} from "./pcmSendBuffer";

function makeChunk(byte: number): ArrayBuffer {
  return new Uint8Array([byte]).buffer;
}

describe("pcmSendBuffer", () => {
  it("chunk를 FIFO 순서로 drain한다", () => {
    const buffer: ArrayBuffer[] = [];
    pushPcmChunk(buffer, makeChunk(1));
    pushPcmChunk(buffer, makeChunk(2));
    pushPcmChunk(buffer, makeChunk(3));

    const sent: number[] = [];
    const count = drainPcmBuffer(buffer, chunk => {
      sent.push(new Uint8Array(chunk)[0]!);
    });

    expect(count).toBe(3);
    expect(sent).toEqual([1, 2, 3]);
    expect(buffer).toHaveLength(0);
  });

  it("최대 chunk 수를 초과하면 새 chunk를 거부한다", () => {
    const buffer: ArrayBuffer[] = [];

    for (let index = 0; index < PCM_BUFFER_MAX_CHUNKS; index += 1) {
      expect(pushPcmChunk(buffer, makeChunk(index))).toBe(true);
    }

    expect(buffer).toHaveLength(PCM_BUFFER_MAX_CHUNKS);
    expect(pushPcmChunk(buffer, makeChunk(255))).toBe(false);
    expect(buffer).toHaveLength(PCM_BUFFER_MAX_CHUNKS);
  });

  it("push 시 chunk 복사본을 저장한다", () => {
    const buffer: ArrayBuffer[] = [];
    const original = new Uint8Array([42]).buffer;
    pushPcmChunk(buffer, original);

    new Uint8Array(original)[0] = 99;

    expect(new Uint8Array(buffer[0]!)[0]).toBe(42);
  });

  it("clear 후 buffer가 비어 있다", () => {
    const buffer: ArrayBuffer[] = [];
    pushPcmChunk(buffer, makeChunk(1));
    clearPcmBuffer(buffer);
    expect(buffer).toHaveLength(0);
  });

  it("빈 buffer drain은 0을 반환한다", () => {
    const buffer: ArrayBuffer[] = [];
    expect(drainPcmBuffer(buffer, () => {})).toBe(0);
  });
});

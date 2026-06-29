import { float32ToInt16PCM } from "./pcmEncode";

/**
 * 다운샘플된 16kHz float 스트림을 고정 샘플 수(예: 200ms) 단위로 잘라 PCM16 chunk로 만든다.
 */
export class ChunkAccumulator {
  private readonly targetSampleCount: number;
  private buffer: Float32Array = new Float32Array(0);

  /** @param targetSampleCount chunk당 16kHz 샘플 수 (CHUNK_SAMPLE_COUNT) */
  constructor(targetSampleCount: number) {
    this.targetSampleCount = targetSampleCount;
  }

  /** 누적 버퍼를 비운다. 캡처 재개·그래프 재시작 시 호출한다. */
  reset(): void {
    this.buffer = new Float32Array(0);
  }

  /**
   * float 샘플을 내부 버퍼에 이어 붙이고, 목표 길이에 도달한 구간마다 Int16Array chunk를 반환한다.
   */
  push(samples: Float32Array): Int16Array[] {
    if (samples.length === 0) {
      return [];
    }

    const merged = new Float32Array(this.buffer.length + samples.length);
    merged.set(this.buffer, 0);
    merged.set(samples, this.buffer.length);
    this.buffer = merged;

    const chunks: Int16Array[] = [];

    while (this.buffer.length >= this.targetSampleCount) {
      const slice = this.buffer.slice(0, this.targetSampleCount);
      this.buffer = this.buffer.slice(this.targetSampleCount);
      chunks.push(float32ToInt16PCM(slice));
    }

    return chunks;
  }
}

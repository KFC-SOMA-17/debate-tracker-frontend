/**
 * STT용 리샘플: 다운샘플 시 구간(boxcar) 평균으로 에일리어싱을 완화한다.
 * Worklet 프레임 단위 입력은 DownsampleStream으로 경계를 이어 처리한다.
 */

/** 이전 프레임 잔여(carry)와 새 Worklet 프레임을 하나의 입력 버퍼로 합친다. */
function mergeFloat32(a: Float32Array, b: Float32Array): Float32Array {
  if (a.length === 0) {
    return b;
  }
  if (b.length === 0) {
    return a;
  }
  const merged = new Float32Array(a.length + b.length);
  merged.set(a, 0);
  merged.set(b, a.length);
  return merged;
}

/**
 * 출력 샘플 1개에 대응하는 입력 구간(예: 48k→16k면 3샘플)의 boxcar 평균을 계산한다.
 */
function averageInputBin(
  buffer: Float32Array,
  bufferGlobalStart: number,
  outputIndex: number,
  ratio: number,
): number {
  const globalStart = Math.floor(outputIndex * ratio);
  const globalEnd = Math.floor((outputIndex + 1) * ratio);
  const localStart = Math.max(0, globalStart - bufferGlobalStart);
  const localEnd = Math.min(buffer.length, globalEnd - bufferGlobalStart);

  if (localEnd <= localStart) {
    const idx = Math.min(buffer.length - 1, localStart);
    return buffer[idx] ?? 0;
  }

  let sum = 0;
  for (let i = localStart; i < localEnd; i++) {
    sum += buffer[i]!;
  }
  return sum / (localEnd - localStart);
}

/**
 * 단일 버퍼 전체를 targetSampleRate로 다운샘플한다. 테스트·일괄 변환용(스트리밍은 DownsampleStream).
 */
export function downsampleFloat32(
  input: Float32Array,
  inputSampleRate: number,
  outputSampleRate: number,
): Float32Array {
  if (input.length === 0) {
    return new Float32Array(0);
  }

  if (inputSampleRate === outputSampleRate) {
    return input.slice();
  }

  const stream = new DownsampleStream(inputSampleRate, outputSampleRate);
  return stream.push(input);
}

/**
 * Worklet 프레임 단위 입력을 이어 받아 16kHz float를 반환한다. 구간 경계가 프레임마다 끊기지 않도록 carry를 유지한다.
 */
export class DownsampleStream {
  private carry = new Float32Array(0);
  private processedInputSamples = 0;
  private readonly inputSampleRate: number;
  private readonly outputSampleRate: number;
  private readonly ratio: number;

  constructor(inputSampleRate: number, outputSampleRate: number) {
    this.inputSampleRate = inputSampleRate;
    this.outputSampleRate = outputSampleRate;
    this.ratio =
      inputSampleRate === outputSampleRate ? 1 : inputSampleRate / outputSampleRate;
  }

  /** 스트림 위치·미처리 입력을 초기화한다. */
  reset(): void {
    this.carry = new Float32Array(0);
    this.processedInputSamples = 0;
  }

  /** 새 입력 프레임을 반영하고, 완성된 16kHz 출력 샘플만 반환한다. */
  push(input: Float32Array): Float32Array {
    if (input.length === 0) {
      return new Float32Array(0);
    }

    if (this.inputSampleRate === this.outputSampleRate) {
      return input.slice();
    }

    const merged = mergeFloat32(this.carry, input);
    const bufferGlobalStart = this.processedInputSamples;
    const streamLength = this.processedInputSamples + merged.length;
    const totalCompleteOutputs = Math.floor(streamLength / this.ratio);
    const alreadyCompleteOutputs = Math.floor(this.processedInputSamples / this.ratio);
    const newOutputCount = totalCompleteOutputs - alreadyCompleteOutputs;

    if (newOutputCount <= 0) {
      this.carry = merged.slice();
      return new Float32Array(0);
    }

    const output = new Float32Array(newOutputCount);
    for (let k = 0; k < newOutputCount; k++) {
      const outputIndex = alreadyCompleteOutputs + k;
      output[k] = averageInputBin(merged, bufferGlobalStart, outputIndex, this.ratio);
    }

    const consumedInputSamples = Math.floor(totalCompleteOutputs * this.ratio);
    const localConsumed = consumedInputSamples - this.processedInputSamples;
    this.carry = merged.slice(localConsumed);
    this.processedInputSamples = consumedInputSamples;

    return output;
  }
}

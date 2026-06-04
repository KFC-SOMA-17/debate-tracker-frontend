/** AudioWorklet 전용 — 상수 파일 import 없이 프로세서 이름만 유지 */
const PCM_CAPTURE_PROCESSOR_NAME = "pcm-capture-processor";

class PcmCaptureProcessor extends AudioWorkletProcessor {
  process(inputs: Float32Array[][]) {
    const channel = inputs[0]?.[0];
    if (channel && channel.length > 0) {
      this.port.postMessage(channel.slice());
    }
    return true;
  }
}

registerProcessor(PCM_CAPTURE_PROCESSOR_NAME, PcmCaptureProcessor);

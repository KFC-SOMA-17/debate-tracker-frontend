import { HIGHPASS_FREQUENCY_HZ } from "../constants/audioProcessing";

/**
 * 마이크 소스에 high-pass BiquadFilter를 연결해 저역 럼블·잡음을 줄인다. 반환 노드는 Worklet 등 다음 단계에 연결한다.
 */
export function createHighpassFilter(context: AudioContext, source: AudioNode): BiquadFilterNode {
  const filter = context.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = HIGHPASS_FREQUENCY_HZ;
  filter.Q.value = 0.707;
  source.connect(filter);
  return filter;
}

export { HIGHPASS_FREQUENCY_HZ };

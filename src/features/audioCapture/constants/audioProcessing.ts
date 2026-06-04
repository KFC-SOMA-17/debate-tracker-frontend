/** Azure Speech 등 STT에 흔히 쓰는 mono PCM16 입력 */
export const TARGET_SAMPLE_RATE = 16_000;

/** 서버 전송 chunk 길이 (ms) — 변경 시 이 값만 수정 */
export const CHUNK_DURATION_MS = 200;

export const BYTES_PER_SAMPLE = 2;

/** 200ms @ 16kHz mono Int16 */
export const CHUNK_SAMPLE_COUNT = Math.floor((TARGET_SAMPLE_RATE * CHUNK_DURATION_MS) / 1000);

export const EXPECTED_CHUNK_BYTE_LENGTH = CHUNK_SAMPLE_COUNT * BYTES_PER_SAMPLE;

/** high-pass: 럼블·저역 잡음 제거 */
export const HIGHPASS_FREQUENCY_HZ = 100;

export const PCM_CAPTURE_PROCESSOR_NAME = "pcm-capture-processor";

export type UserMediaAudioOptions = {
  noiseSuppression: boolean;
};

export const getUserMediaAudioConstraints = (
  options: UserMediaAudioOptions = { noiseSuppression: true },
): MediaTrackConstraints => ({
  channelCount: 1,
  echoCancellation: true,
  noiseSuppression: options.noiseSuppression,
  autoGainControl: true,
});

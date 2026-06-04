/**
 * Web Audio float 샘플(-1~1)을 STT·전송용 signed 16-bit PCM으로 양자화한다.
 */
export function float32ToInt16PCM(samples: Float32Array): Int16Array {
  const pcm = new Int16Array(samples.length);

  for (let i = 0; i < samples.length; i++) {
    const clamped = Math.max(-1, Math.min(1, samples[i]));
    pcm[i] = clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff;
  }

  return pcm;
}

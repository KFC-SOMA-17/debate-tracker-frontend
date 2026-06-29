/**
 * PCM16 chunk의 RMS(음량)를 계산한다. chunk 메타·무음 감지·디버그 표시에 사용한다.
 */
export function computeRmsFromInt16(pcm: Int16Array): number {
  if (pcm.length === 0) {
    return 0;
  }

  let sumSquares = 0;
  for (let i = 0; i < pcm.length; i++) {
    const normalized = pcm[i] / 32768;
    sumSquares += normalized * normalized;
  }

  return Math.sqrt(sumSquares / pcm.length);
}

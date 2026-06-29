/** 최초 DEBATE_START에서만 transcript를 비운다. 재연결 DEBATE_START는 유지한다. */
export function shouldClearTranscriptOnDebateStart(sessionInitialized: boolean): boolean {
  return !sessionInitialized;
}

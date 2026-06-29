const pollCountByDebateId = new Map<string, number>();

/** GET마다 1 증가. 반환값은 이번 응답에 쓸 stage 인덱스(0부터). */
export function advanceAgendaPollStage(debateId: string, maxStage: number): number {
  const count = pollCountByDebateId.get(debateId) ?? 0;
  const stage = Math.min(count, maxStage);
  pollCountByDebateId.set(debateId, count + 1);
  return stage;
}

export function resetMockAgendaPollStore(): void {
  pollCountByDebateId.clear();
}

export function resetAgendaPollForDebate(debateId: string): void {
  pollCountByDebateId.delete(debateId);
}

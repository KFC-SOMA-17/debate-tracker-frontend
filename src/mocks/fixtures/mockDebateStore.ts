let lastDebateNumericId = 0;

export function createMockDebateNumericId(): number {
  lastDebateNumericId += 1;
  return lastDebateNumericId;
}

export function getCurrentMockDebateNumericId(): number {
  return lastDebateNumericId > 0 ? lastDebateNumericId : 1;
}

export function resetMockDebateStore(): void {
  lastDebateNumericId = 0;
}

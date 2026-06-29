export type StompReconnectAttempt = {
  baseDelayMs: number;
  connectTimeoutMs: number;
};

export const STOMP_RECONNECT_ATTEMPTS: readonly StompReconnectAttempt[] = [
  { baseDelayMs: 1_000, connectTimeoutMs: 5_000 },
  { baseDelayMs: 2_000, connectTimeoutMs: 5_000 },
  { baseDelayMs: 4_000, connectTimeoutMs: 5_000 },
] as const;

/** Full jitter: uniform random in [0, baseDelayMs). */
export function computeReconnectDelayMs(
  baseDelayMs: number,
  random: () => number = Math.random,
): number {
  return Math.floor(random() * baseDelayMs);
}

export function waitMs(ms: number): Promise<void> {
  return new Promise(resolve => {
    window.setTimeout(resolve, ms);
  });
}

import { describe, expect, it } from "vitest";
import {
  computeReconnectDelayMs,
  STOMP_RECONNECT_ATTEMPTS,
} from "./stompReconnectPolicy";

describe("stompReconnectPolicy", () => {
  it("3회 재시도 설정을 제공한다", () => {
    expect(STOMP_RECONNECT_ATTEMPTS).toHaveLength(3);
    expect(STOMP_RECONNECT_ATTEMPTS.map(attempt => attempt.baseDelayMs)).toEqual([1_000, 2_000, 4_000]);
    expect(STOMP_RECONNECT_ATTEMPTS.every(attempt => attempt.connectTimeoutMs === 5_000)).toBe(true);
  });

  it("full jitter delay는 [0, baseDelayMs) 범위에 있다", () => {
    const baseDelayMs = 1_000;
    for (let index = 0; index < 20; index += 1) {
      const delayMs = computeReconnectDelayMs(baseDelayMs, () => index / 20);
      expect(delayMs).toBeGreaterThanOrEqual(0);
      expect(delayMs).toBeLessThan(baseDelayMs);
    }
  });
});

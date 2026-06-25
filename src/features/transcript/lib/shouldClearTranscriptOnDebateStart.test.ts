import { describe, expect, it } from "vitest";
import { shouldClearTranscriptOnDebateStart } from "./shouldClearTranscriptOnDebateStart";

describe("shouldClearTranscriptOnDebateStart", () => {
  it("최초 DEBATE_START에서만 초기화한다", () => {
    expect(shouldClearTranscriptOnDebateStart(false)).toBe(true);
    expect(shouldClearTranscriptOnDebateStart(true)).toBe(false);
  });
});

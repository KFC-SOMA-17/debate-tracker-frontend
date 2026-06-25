import { describe, expect, it } from "vitest";
import { normalizeDebateResponse } from "./normalizeDebateResponse";

describe("normalizeDebateResponse", () => {
  it("topic·debateId 필드를 그대로 사용한다", () => {
    expect(normalizeDebateResponse({ debateId: "12", topic: "AI 윤리" })).toEqual({
      debateId: "12",
      topic: "AI 윤리",
    });
  });

  it("서버의 title·id 필드를 topic·debateId로 정규화한다", () => {
    expect(normalizeDebateResponse({ id: 7, title: "교육 정책" })).toEqual({
      debateId: "7",
      topic: "교육 정책",
    });
  });
});

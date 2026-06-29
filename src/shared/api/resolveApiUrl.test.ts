import { describe, expect, it } from "vitest";
import { normalizeBaseUrl, resolveApiUrl } from "./resolveApiUrl";

describe("normalizeBaseUrl", () => {
  it("https// 형태의 오타를 https:// 로 보정한다", () => {
    expect(normalizeBaseUrl("https//api.dev.debate-tracker.com")).toBe(
      "https://api.dev.debate-tracker.com",
    );
  });
});

describe("resolveApiUrl", () => {
  it("base URL과 path를 절대 URL로 조합한다", () => {
    expect(resolveApiUrl("/api/debates", "https://api.dev.debate-tracker.com")).toBe(
      "https://api.dev.debate-tracker.com/api/debates",
    );
  });

  it("base URL이 없으면 path만 반환한다", () => {
    expect(resolveApiUrl("/api/debates", "")).toBe("/api/debates");
  });
});

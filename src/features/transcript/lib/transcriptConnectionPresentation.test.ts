import { describe, expect, it } from "vitest";
import {
  getTranscriptConnectionPresentation,
  shouldShowTranscriptConnectionBanner,
} from "./transcriptConnectionPresentation";

describe("transcriptConnectionPresentation", () => {
  it("네트워크 단절·재연결·실패 상태에서 배너를 표시한다", () => {
    expect(shouldShowTranscriptConnectionBanner("disconnected", "active")).toBe(true);
    expect(shouldShowTranscriptConnectionBanner("reconnecting", "active")).toBe(true);
    expect(shouldShowTranscriptConnectionBanner("error", "active")).toBe(true);
    expect(shouldShowTranscriptConnectionBanner("recording", "active")).toBe(false);
  });

  it("재연결 실패 문구를 반환한다", () => {
    const presentation = getTranscriptConnectionPresentation("error", "active", {
      code: "STOMP_CONNECTION_FAILED",
      status: 503,
      message: "재연결 실패",
    });

    expect(presentation?.badgeLabel).toBe("재연결 실패");
    expect(presentation?.bannerDescription).toBe("재연결 실패");
  });
});

import { describe, expect, it, vi } from "vitest";
import { logStompSend } from "./stompTrafficLogger";

describe("stompTrafficLogger", () => {
  it("PCM SEND는 로그하지 않는다", () => {
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});

    logStompSend({
      destination: "/app/debate/1/audio",
      headers: { "content-type": "application/octet-stream" },
      binaryBody: new Uint8Array([0, 1, 2, 3]),
    });

    expect(infoSpy).not.toHaveBeenCalled();
    infoSpy.mockRestore();
  });

  it("JSON SEND는 로그한다", () => {
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});

    logStompSend({
      destination: "/app/debate/1/start",
      body: "{}",
    });

    expect(infoSpy).toHaveBeenCalledWith(
      "[STOMP traffic]",
      expect.objectContaining({
        direction: "SEND",
        destination: "/app/debate/1/start",
        body: "{}",
      }),
    );

    infoSpy.mockRestore();
  });
});

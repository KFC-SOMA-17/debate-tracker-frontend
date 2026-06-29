import { describe, expect, it } from "vitest";
import {
  encodeStompConnected,
  encodeStompMessage,
  parseStompFrame,
} from "../../../mocks/ws/stompFrame";

describe("stompFrame", () => {
  it("CONNECT 프레임을 파싱한다", () => {
    const raw = "CONNECT\naccept-version:1.2\nhost:localhost\n\n\u0000";
    const frame = parseStompFrame(raw);

    expect(frame).toEqual({
      command: "CONNECT",
      headers: {
        "accept-version": "1.2",
        host: "localhost",
      },
      body: "",
    });
  });

  it("SEND 프레임을 파싱한다", () => {
    const raw = "SEND\ndestination:/app/debate/1/start\n\n{}\u0000";
    const frame = parseStompFrame(raw);

    expect(frame?.command).toBe("SEND");
    expect(frame?.headers.destination).toBe("/app/debate/1/start");
    expect(frame?.body).toBe("{}");
  });

  it("CONNECTED·MESSAGE 프레임을 생성한다", () => {
    const connected = parseStompFrame(encodeStompConnected());
    expect(connected?.command).toBe("CONNECTED");

    const message = parseStompFrame(
      encodeStompMessage("/topic/debate/1", "sub-0", '{"type":"DEBATE_START"}'),
    );
    expect(message?.command).toBe("MESSAGE");
    expect(message?.headers.destination).toBe("/topic/debate/1");
    expect(message?.body).toBe('{"type":"DEBATE_START"}');
  });
});

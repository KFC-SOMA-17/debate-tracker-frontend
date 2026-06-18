import { describe, expect, it } from "vitest";
import {
  debateAudioDestination,
  debateStartDestination,
  debateStopDestination,
  debateTopicDestination,
} from "./stompDestinations";

describe("stompDestinations", () => {
  it("debateId별 destination 경로를 생성한다", () => {
    expect(debateTopicDestination(1)).toBe("/topic/debate/1");
    expect(debateStartDestination(42)).toBe("/app/debate/42/start");
    expect(debateStopDestination(42)).toBe("/app/debate/42/stop");
    expect(debateAudioDestination(42)).toBe("/app/debate/42/audio");
  });
});

import { describe, expect, it } from "vitest";
import { DownsampleStream, downsampleFloat32 } from "./downsample";

describe("downsampleFloat32", () => {
  it("48kHz → 16kHz: 3샘플 구간 평균으로 길이가 1/3이 된다", () => {
    const input = new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const output = downsampleFloat32(input, 48_000, 16_000);

    expect(output.length).toBe(3);
    expect(output[0]).toBeCloseTo(2, 5);
    expect(output[1]).toBeCloseTo(5, 5);
    expect(output[2]).toBeCloseTo(8, 5);
  });

  it("동일 샘플레이트면 복사본을 반환한다", () => {
    const input = new Float32Array([0.5, -0.5]);
    const output = downsampleFloat32(input, 16_000, 16_000);
    expect(output).not.toBe(input);
    expect(Array.from(output)).toEqual([0.5, -0.5]);
  });
});

describe("DownsampleStream", () => {
  it("프레임 경계에서도 출력 샘플이 끊기지 않는다", () => {
    const stream = new DownsampleStream(48_000, 16_000);
    const frameA = new Float32Array([1, 2, 3, 4, 5, 6]);
    const frameB = new Float32Array([7, 8, 9]);

    const outA = stream.push(frameA);
    const outB = stream.push(frameB);
    const oneShot = downsampleFloat32(
      new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      48_000,
      16_000,
    );

    expect(outA.length).toBe(2);
    expect(outB.length).toBe(1);
    expect(outA[0]).toBeCloseTo(2, 5);
    expect(outA[1]).toBeCloseTo(5, 5);
    expect(outB[0]).toBeCloseTo(8, 5);
    expect(Array.from(oneShot)).toEqual([outA[0], outA[1], outB[0]]);
  });

  it("reset 후 스트림 상태가 초기화된다", () => {
    const stream = new DownsampleStream(48_000, 16_000);
    stream.push(new Float32Array([1, 2, 3, 4, 5, 6]));
    stream.reset();
    const output = stream.push(new Float32Array([3, 6, 9]));
    expect(output.length).toBe(1);
    expect(output[0]).toBeCloseTo(6, 5);
  });
});

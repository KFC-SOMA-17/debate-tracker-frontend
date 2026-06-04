export type MicPermissionState = "unknown" | "prompting" | "granted" | "denied" | "not_found" | "error";

export type CaptureState = "idle" | "starting" | "capturing" | "paused" | "stopped";

export type RecordingStatus = "idle" | "requesting" | "capturing" | "paused" | "denied" | "error";

export type AudioChunkMeta = {
  sequence: number;
  byteLength: number;
  sampleRate: number;
  durationMs: number;
  rms: number;
  elapsedSincePreviousMs: number;
  timestamp: number;
};

export type NoiseSuppressionMode = {
  enabled: boolean;
  /** 브라우저 constraint 적용 여부 (스트림 재시작 시 반영) */
  applied: boolean;
};

export type AudioCaptureState = {
  captureState: CaptureState;
  micPermission: MicPermissionState;
  isPaused: boolean;
  sourceSampleRate: number | null;
  noiseSuppression: NoiseSuppressionMode;
  totalChunkCount: number;
  lastChunk: AudioChunkMeta | null;
};

export const createInitialAudioCaptureState = (): AudioCaptureState => ({
  captureState: "idle",
  micPermission: "unknown",
  isPaused: false,
  sourceSampleRate: null,
  noiseSuppression: { enabled: true, applied: true },
  totalChunkCount: 0,
  lastChunk: null,
});

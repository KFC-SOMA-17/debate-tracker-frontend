import { useCallback, useEffect, useRef, useState } from "react";
import {
  CHUNK_DURATION_MS,
  CHUNK_SAMPLE_COUNT,
  getUserMediaAudioConstraints,
  PCM_CAPTURE_PROCESSOR_NAME,
  TARGET_SAMPLE_RATE,
} from "../constants/audioProcessing";
import { ChunkAccumulator } from "../lib/accumulateChunks";
import { computeRmsFromInt16 } from "../lib/chunkMetrics";
import { DownsampleStream } from "../lib/downsample";
import { createHighpassFilter } from "../lib/noiseFilter";
import pcmCaptureProcessorUrl from "../worklets/pcmCaptureProcessor.ts?worker&url";
import type {
  AudioCaptureState,
  AudioChunkMeta,
  CaptureState,
  MicPermissionState,
  RecordingStatus,
} from "../types/audioCapture";
import { createInitialAudioCaptureState } from "../types/audioCapture";

export type UseAudioCaptureOptions = {
  enabled: boolean;
  onChunk?: (chunk: ArrayBuffer, meta: AudioChunkMeta) => void;
};

export type UseAudioCaptureResult = {
  state: AudioCaptureState;
  recordingStatus: RecordingStatus;
  isPaused: boolean;
  pauseCapture: () => void;
  resumeCapture: () => void;
  setNoiseSuppressionEnabled: (enabled: boolean) => void;
  startCapture: () => Promise<void>;
  stopCapture: () => void;
};

type CaptureResources = {
  stream: MediaStream;
  audioTrack: MediaStreamTrack;
  context: AudioContext;
  worklet: AudioWorkletNode;
};

function mapMicError(error: unknown): MicPermissionState {
  if (error instanceof DOMException) {
    if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
      return "denied";
    }
    if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
      return "not_found";
    }
  }
  return "error";
}

function mapRecordingStatus(mic: MicPermissionState, capture: CaptureState): RecordingStatus {
  if (mic === "denied") {
    return "denied";
  }
  if (mic === "not_found" || mic === "error") {
    return "error";
  }
  if (mic === "prompting" || capture === "starting") {
    return "requesting";
  }
  if (capture === "paused") {
    return "paused";
  }
  if (capture === "capturing") {
    return "capturing";
  }
  return "idle";
}

export function useAudioCapture({ enabled, onChunk }: UseAudioCaptureOptions): UseAudioCaptureResult {
  const [captureState, setCaptureState] = useState<AudioCaptureState>(createInitialAudioCaptureState);

  const state = enabled ? captureState : createInitialAudioCaptureState();

  const resourcesRef = useRef<CaptureResources | null>(null);
  const accumulatorRef = useRef(new ChunkAccumulator(CHUNK_SAMPLE_COUNT));
  const downsampleStreamRef = useRef<DownsampleStream | null>(null);
  const sequenceRef = useRef(0);
  const lastChunkTimeRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);
  const noiseSuppressionRef = useRef(true);
  const onChunkRef = useRef(onChunk);

  useEffect(() => {
    onChunkRef.current = onChunk;
  }, [onChunk]);

  const teardownGraph = useCallback(() => {
    const resources = resourcesRef.current;
    if (!resources) {
      return;
    }

    resources.worklet.port.onmessage = null;
    resources.worklet.disconnect();
    resources.stream.getTracks().forEach(track => track.stop());
    void resources.context.close();
    resourcesRef.current = null;
  }, []);

  const releaseCaptureResources = useCallback(() => {
    teardownGraph();
    accumulatorRef.current.reset();
    downsampleStreamRef.current = null;
    sequenceRef.current = 0;
    lastChunkTimeRef.current = null;
    isPausedRef.current = false;
  }, [teardownGraph]);

  const stopCapture = useCallback(() => {
    releaseCaptureResources();
    setCaptureState(prev => ({
      ...prev,
      captureState: "stopped",
      isPaused: false,
      lastChunk: null,
    }));
  }, [releaseCaptureResources]);

  const emitChunk = useCallback((pcm: Int16Array, sourceSampleRate: number) => {
    const now = performance.now();
    const elapsedSincePreviousMs = lastChunkTimeRef.current === null ? 0 : Math.round(now - lastChunkTimeRef.current);
    lastChunkTimeRef.current = now;

    const sequence = sequenceRef.current;
    sequenceRef.current += 1;

    const meta: AudioChunkMeta = {
      sequence,
      byteLength: pcm.byteLength,
      sampleRate: TARGET_SAMPLE_RATE,
      durationMs: CHUNK_DURATION_MS,
      rms: computeRmsFromInt16(pcm),
      elapsedSincePreviousMs,
      timestamp: now,
    };

    const chunkBuffer = pcm.buffer.slice(pcm.byteOffset, pcm.byteOffset + pcm.byteLength) as ArrayBuffer;
    onChunkRef.current?.(chunkBuffer, meta);

    setCaptureState(prev => ({
      ...prev,
      sourceSampleRate,
      captureState: isPausedRef.current ? "paused" : "capturing",
      micPermission: "granted",
      totalChunkCount: prev.totalChunkCount + 1,
      lastChunk: meta,
    }));
  }, []);

  const handleFilteredFrame = useCallback(
    (frame: Float32Array, sourceSampleRate: number) => {
      if (isPausedRef.current) {
        return;
      }

      const stream = downsampleStreamRef.current;
      if (!stream) {
        return;
      }

      const downsampled = stream.push(frame);
      const chunks = accumulatorRef.current.push(downsampled);

      for (const pcm of chunks) {
        emitChunk(pcm, sourceSampleRate);
      }
    },
    [emitChunk]
  );

  const bootstrapCaptureGraph = useCallback(async (): Promise<number> => {
    releaseCaptureResources();

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: getUserMediaAudioConstraints({ noiseSuppression: noiseSuppressionRef.current }),
      video: false,
    });

    const audioTrack = stream.getAudioTracks()[0];
    const context = new AudioContext();
    await context.resume();

    const sourceSampleRate = context.sampleRate;
    downsampleStreamRef.current = new DownsampleStream(sourceSampleRate, TARGET_SAMPLE_RATE);
    await context.audioWorklet.addModule(pcmCaptureProcessorUrl);

    const source = context.createMediaStreamSource(stream);
    const highpass = createHighpassFilter(context, source);
    const worklet = new AudioWorkletNode(context, PCM_CAPTURE_PROCESSOR_NAME);
    highpass.connect(worklet);

    accumulatorRef.current.reset();
    sequenceRef.current = 0;
    lastChunkTimeRef.current = null;
    isPausedRef.current = false;

    worklet.port.onmessage = (event: MessageEvent<Float32Array>) => {
      handleFilteredFrame(event.data, sourceSampleRate);
    };

    resourcesRef.current = {
      stream,
      audioTrack,
      context,
      worklet,
    };

    return sourceSampleRate;
  }, [handleFilteredFrame, releaseCaptureResources]);

  const applyCaptureReadyState = useCallback((sourceSampleRate: number) => {
    setCaptureState(prev => ({
      ...prev,
      captureState: "capturing",
      micPermission: "granted",
      isPaused: false,
      sourceSampleRate,
      noiseSuppression: {
        enabled: noiseSuppressionRef.current,
        applied: noiseSuppressionRef.current,
      },
      totalChunkCount: 0,
      lastChunk: null,
    }));
  }, []);

  const applyCaptureErrorState = useCallback((micPermission: MicPermissionState) => {
    setCaptureState(prev => ({
      ...prev,
      captureState: "idle",
      micPermission,
    }));
  }, []);

  const startCapture = useCallback(async () => {
    try {
      const sourceSampleRate = await bootstrapCaptureGraph();
      applyCaptureReadyState(sourceSampleRate);
    } catch (error) {
      applyCaptureErrorState(mapMicError(error));
    }
  }, [applyCaptureErrorState, applyCaptureReadyState, bootstrapCaptureGraph]);

  const pauseCapture = useCallback(() => {
    const resources = resourcesRef.current;
    if (!resources || isPausedRef.current) {
      return;
    }

    isPausedRef.current = true;
    resources.audioTrack.enabled = false;

    setCaptureState(prev => ({
      ...prev,
      captureState: "paused",
      isPaused: true,
    }));
  }, []);

  const resumeCapture = useCallback(() => {
    const resources = resourcesRef.current;
    if (!resources || !isPausedRef.current) {
      return;
    }

    isPausedRef.current = false;
    resources.audioTrack.enabled = true;
    accumulatorRef.current.reset();
    downsampleStreamRef.current?.reset();
    lastChunkTimeRef.current = null;

    setCaptureState(prev => ({
      ...prev,
      captureState: "capturing",
      isPaused: false,
    }));
  }, []);

  const setNoiseSuppressionEnabled = useCallback(
    (nextEnabled: boolean) => {
      noiseSuppressionRef.current = nextEnabled;

      let shouldRestart = false;
      setCaptureState(prev => {
        shouldRestart = Boolean(resourcesRef.current) && nextEnabled !== prev.noiseSuppression.applied;
        return {
          ...prev,
          noiseSuppression: { enabled: nextEnabled, applied: prev.noiseSuppression.applied },
        };
      });

      if (shouldRestart) {
        void startCapture();
      }
    },
    [startCapture]
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let cancelled = false;

    void bootstrapCaptureGraph()
      .then(sourceSampleRate => {
        if (cancelled) {
          return;
        }
        applyCaptureReadyState(sourceSampleRate);
      })
      .catch(error => {
        if (cancelled) {
          return;
        }
        applyCaptureErrorState(mapMicError(error));
      });

    return () => {
      cancelled = true;
      releaseCaptureResources();
    };
  }, [enabled, applyCaptureErrorState, applyCaptureReadyState, bootstrapCaptureGraph, releaseCaptureResources]);

  const recordingStatus = mapRecordingStatus(state.micPermission, state.captureState);

  return {
    state,
    recordingStatus,
    isPaused: state.isPaused,
    pauseCapture,
    resumeCapture,
    setNoiseSuppressionEnabled,
    startCapture,
    stopCapture,
  };
}

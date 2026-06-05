import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import {
  flushTranscriptEventLogDownload,
  pushTranscriptEvent,
  resetTranscriptEventLog,
} from "../lib/transcriptEventLogger";
import {
  selectOrderedSegments,
  transcriptRecordReducer,
} from "../lib/transcriptRecordReducer";
import { initialTranscriptRecordState } from "../types/transcriptRecord";
import type { RefinedSegments, SttErrorData, TranscriptionSegment } from "../types/sttMessages";
import { normalizeDebateIdToString } from "../types/sttMessages";
import { useSttWebSocket, type SttConnectionStatus } from "./useSttWebSocket";

export type UseTranscriptSessionOptions = {
  /** WebSocket 연결·START 유지 여부 (active 토론 중) */
  enabled: boolean;
  /** 라우트·REST debateId — START·STOP 제어 메시지에 포함 */
  sessionDebateId?: string;
  /** 비활성화 시 로컬 record 초기화 (idle로 복귀할 때) */
  resetWhenDisabled?: boolean;
  onSessionEnded?: () => void;
};

export type UseTranscriptSessionResult = {
  segments: TranscriptionSegment[];
  sttStatus: SttConnectionStatus;
  /** DEBATE_START 수신 시각(ms) */
  debateStartedAt: number | null;
  lastError: SttErrorData | null;
  canSendAudio: boolean;
  sendPcm: (buffer: ArrayBuffer) => void;
  stopDebate: () => void;
};

export function useTranscriptSession({
  enabled,
  sessionDebateId,
  resetWhenDisabled = false,
  onSessionEnded,
}: UseTranscriptSessionOptions): UseTranscriptSessionResult {
  const [record, dispatch] = useReducer(transcriptRecordReducer, initialTranscriptRecordState);
  const onSessionEndedRef = useRef(onSessionEnded);

  useEffect(() => {
    onSessionEndedRef.current = onSessionEnded;
  }, [onSessionEnded]);

  const handleMessage = useCallback((message: import("../types/sttMessages").SttWebSocketMessage) => {
    pushTranscriptEvent(message);

    switch (message.type) {
      case "DEBATE_START":
        dispatch({ type: "CLEAR" });
        resetTranscriptEventLog(normalizeDebateIdToString(message.debateId));
        break;
      case "TRANSCRIPTION":
        dispatch({ type: "APPEND_TRANSCRIPTION", segment: message.data as TranscriptionSegment });
        break;
      case "REFINED_TRANSCRIPTION": {
        const refined = message.data as RefinedSegments;
        dispatch({ type: "UPSERT_REFINED", segments: refined.segments });
        break;
      }
      default:
        break;
    }
  }, []);

  const handleSessionEndedFromWs = useCallback(() => {
    flushTranscriptEventLogDownload();
    onSessionEndedRef.current?.();
  }, []);

  const { status, debateStartedAt, lastError, canSendAudio, connect, disconnect, stopDebate, sendPcm } =
    useSttWebSocket({
    sessionDebateId,
    onMessage: handleMessage,
    onEnded: handleSessionEndedFromWs,
    onError: () => {
      // 상태는 useSttWebSocket이 error로 관리
    },
  });

  useEffect(() => {
    if (!enabled) {
      return;
    }

    connect();
    return () => {
      disconnect();
    };
  }, [enabled, sessionDebateId, connect, disconnect]);

  useEffect(() => {
    if (enabled || !resetWhenDisabled) {
      return;
    }
    dispatch({ type: "CLEAR" });
  }, [enabled, resetWhenDisabled]);

  const segments = useMemo(() => selectOrderedSegments(record), [record]);

  return {
    segments,
    sttStatus: status,
    debateStartedAt,
    lastError,
    canSendAudio,
    sendPcm,
    stopDebate,
  };
}

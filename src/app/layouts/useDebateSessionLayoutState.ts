import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useMatch } from "react-router-dom";
import { DEBATE_SESSION_MATCH } from "@/app/router";
import { useAudioCapture } from "@/features/audioCapture/hooks/useAudioCapture";
import { useDebateFlowStore } from "@/features/debate/store/debateFlowStore";
import { useTranscriptSession } from "@/features/transcript/hooks/useTranscriptSession";
import type { DebateSessionPhase } from "./DebateSessionLayoutContext";
import { useDebateElapsedLabel } from "./useDebateElapsedLabel";

function readNavigateTopic(state: unknown): string | null {
  if (typeof state !== "object" || state === null) {
    return null;
  }
  const topic = (state as { topic?: unknown }).topic;
  return typeof topic === "string" && topic.trim().length > 0 ? topic.trim() : null;
}

export function useDebateSessionLayoutState() {
  const location = useLocation();
  const debateMatch = useMatch(DEBATE_SESSION_MATCH);
  const debateId = debateMatch?.params.debateId;
  const navigateTopic = useMemo(() => readNavigateTopic(location.state), [location.state]);
  const activeDebateTopic = useDebateFlowStore(state => state.activeDebateTopic);
  const markSessionEnded = useDebateFlowStore(state => state.markSessionEnded);
  const setActiveDebate = useDebateFlowStore(state => state.setActiveDebate);

  const debateTopic = useMemo(() => {
    const fromStore = activeDebateTopic?.trim();
    if (fromStore) {
      return fromStore;
    }

    return navigateTopic;
  }, [activeDebateTopic, navigateTopic]);

  const [isEnded, setIsEnded] = useState(false);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);

  useEffect(() => {
    if (debateId != null) {
      setActiveDebate(debateId);
    }
  }, [debateId, setActiveDebate]);

  const phase: DebateSessionPhase = isEnded ? "ended" : "active";
  const transcriptWsEnabled = phase === "active" && !isEnded;

  const handleSessionEnded = useCallback(() => {
    setIsEnded(true);
    markSessionEnded();
  }, [markSessionEnded]);

  const transcript = useTranscriptSession({
    enabled: transcriptWsEnabled,
    sessionDebateId: debateId,
    resetWhenDisabled: false,
    onSessionEnded: handleSessionEnded,
  });

  const { recordingStatus } = useAudioCapture({
    enabled: transcriptWsEnabled && transcript.shouldCaptureAudio,
    onChunk: buffer => transcript.sendPcm(buffer),
  });

  const elapsedLabel = useDebateElapsedLabel({
    startedAt: transcript.debateStartedAt,
    running: phase === "active",
  });

  const openEndDebateModal = () => {
    setIsEndModalOpen(true);
  };

  const confirmEndDebate = () => {
    transcript.stopDebate();
    setIsEndModalOpen(false);
  };

  return {
    phase,
    debateId,
    debateTopic,
    elapsedLabel,
    recordingStatus,
    transcriptSegments: transcript.segments,
    sttStatus: transcript.sttStatus,
    lastSttError: transcript.lastError,
    isEndModalOpen,
    setIsEndModalOpen,
    openEndDebateModal,
    confirmEndDebate,
  };
}

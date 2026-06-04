import { useCallback, useMemo, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { DEBATE_ROUTES, DEBATE_SESSION_MATCH } from "@/app/router";
import { useAudioCapture } from "@/features/audioCapture/hooks/useAudioCapture";
import { createDebate } from "@/features/debate/api/debateApi";
import { formatElapsedTime } from "@/features/transcript/lib/formatElapsedTime";
import { useTranscriptSession } from "@/features/transcript/hooks/useTranscriptSession";
import type { DebateSessionPhase } from "./DebateSessionLayoutContext";

export function useDebateSessionLayoutState() {
  const navigate = useNavigate();
  const debateMatch = useMatch(DEBATE_SESSION_MATCH);
  const debateId = debateMatch?.params.debateId;
  const [isEnded, setIsEnded] = useState(false);
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [debateTopic, setDebateTopic] = useState<string | null>(null);

  const phase: DebateSessionPhase = debateId ? (isEnded ? "ended" : "active") : "idle";
  const transcriptWsEnabled = phase === "active" && !isEnded;

  const handleSessionEnded = useCallback(() => {
    setIsEnded(true);
  }, []);

  const transcript = useTranscriptSession({
    enabled: transcriptWsEnabled,
    sessionDebateId: debateId,
    resetWhenDisabled: phase === "idle",
    onSessionEnded: handleSessionEnded,
  });

  const { recordingStatus } = useAudioCapture({
    enabled: transcript.canSendAudio,
    onChunk: buffer => transcript.sendPcm(buffer),
  });

  const elapsedLabel = useMemo(() => {
    if (phase === "idle") {
      return undefined;
    }
    const lastSegment = transcript.segments[transcript.segments.length - 1];
    if (!lastSegment) {
      return "00:00";
    }
    return formatElapsedTime(lastSegment.endAt);
  }, [phase, transcript.segments]);

  const openStartDebateModal = () => {
    setIsStartModalOpen(true);
  };

  const openEndDebateModal = () => {
    setIsEndModalOpen(true);
  };

  const confirmStartDebate = async (topic: string) => {
    const trimmedTopic = topic.trim();
    if (!trimmedTopic) {
      return;
    }

    try {
      const { debateId: createdId, topic: savedTopic } = await createDebate({ topic: trimmedTopic });
      setDebateTopic(savedTopic);
      setIsEnded(false);
      setIsStartModalOpen(false);
      navigate(DEBATE_ROUTES.session(createdId), { replace: true });
    } catch (error) {
      console.error("[createDebate]", error);
    }
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
    isStartModalOpen,
    setIsStartModalOpen,
    isEndModalOpen,
    setIsEndModalOpen,
    openStartDebateModal,
    openEndDebateModal,
    confirmStartDebate,
    confirmEndDebate,
  };
}

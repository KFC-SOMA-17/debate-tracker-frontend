import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { DEBATE_ROUTES, DEBATE_SESSION_MATCH } from "@/app/router";
import type { DebateSessionPhase } from "./DebateSessionLayoutContext";

const MOCK_ELAPSED = "24:18";

export function useDebateSessionLayoutState() {
  const navigate = useNavigate();
  const debateMatch = useMatch(DEBATE_SESSION_MATCH);
  const debateId = debateMatch?.params.debateId;
  const [isEnded, setIsEnded] = useState(false);
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [debateTopic, setDebateTopic] = useState<string | null>(null);

  const phase: DebateSessionPhase = debateId ? (isEnded ? "ended" : "active") : "idle";

  const openStartDebateModal = () => {
    setIsStartModalOpen(true);
  };

  const openEndDebateModal = () => {
    setIsEndModalOpen(true);
  };

  const confirmStartDebate = (topic: string) => {
    const trimmedTopic = topic.trim();
    if (!trimmedTopic) {
      return;
    }

    setDebateTopic(trimmedTopic);
    setIsEnded(false);
    setIsStartModalOpen(false);
    navigate(DEBATE_ROUTES.session(crypto.randomUUID()), { replace: true });
  };

  const confirmEndDebate = () => {
    setIsEnded(true);
    setIsEndModalOpen(false);
  };

  return {
    phase,
    debateId,
    debateTopic,
    elapsedLabel: phase === "idle" ? undefined : MOCK_ELAPSED,
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

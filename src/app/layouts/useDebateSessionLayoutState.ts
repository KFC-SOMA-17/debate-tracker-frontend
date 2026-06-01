import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { DEBATE_ROUTES, DEBATE_SESSION_MATCH } from "@/app/router";
import type { DebateSessionPhase } from "./DebateSessionLayoutContext";

const MOCK_TOPIC = "AI 창작물은 예술인가";
const MOCK_ELAPSED = "24:18";

export function useDebateSessionLayoutState() {
  const navigate = useNavigate();
  const debateMatch = useMatch(DEBATE_SESSION_MATCH);
  const debateId = debateMatch?.params.debateId;
  const [isEnded, setIsEnded] = useState(false);

  const phase: DebateSessionPhase = debateId ? (isEnded ? "ended" : "active") : "idle";

  const onStartDebate = () => {
    navigate(DEBATE_ROUTES.session(crypto.randomUUID()), { replace: true });
  };

  const onEndDebate = () => {
    setIsEnded(true);
  };

  return {
    phase,
    debateId,
    topic: phase !== "idle" ? MOCK_TOPIC : undefined,
    elapsedLabel: phase === "idle" ? undefined : MOCK_ELAPSED,
    onStartDebate,
    onEndDebate,
  };
}

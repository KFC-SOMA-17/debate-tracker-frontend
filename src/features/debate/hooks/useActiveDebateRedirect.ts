import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DEBATE_ROUTES } from "@/app/router";
import { useDebateFlowStore } from "../store/debateFlowStore";

/** 진행 중 세션이 있으면 `/debates/:id`로 보냄 (상태 복원 없음) */
export function useActiveDebateRedirect() {
  const navigate = useNavigate();
  const activeDebateId = useDebateFlowStore(state => state.activeDebateId);
  const isSessionEnded = useDebateFlowStore(state => state.isSessionEnded);

  useEffect(() => {
    if (activeDebateId != null && !isSessionEnded) {
      navigate(DEBATE_ROUTES.session(activeDebateId), { replace: true });
    }
  }, [activeDebateId, isSessionEnded, navigate]);
}

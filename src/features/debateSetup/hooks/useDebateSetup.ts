import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEBATE_ROUTES } from "@/app/router";
import { createDebate } from "@/features/debate/api/debateApi";
import { useDebateFlowStore } from "@/features/debate/store/debateFlowStore";
import { ApiError } from "@/shared/api/errors";

export function useDebateSetup() {
  const navigate = useNavigate();
  const setActiveDebate = useDebateFlowStore(state => state.setActiveDebate);
  const [topicInput, setTopicInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trimmedTopic = topicInput.trim();
  const canSubmit = trimmedTopic.length > 0 && !isSubmitting;

  const cancel = () => {
    navigate(DEBATE_ROUTES.home);
  };

  const confirmStartDebate = async () => {
    if (!canSubmit) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const { debateId, topic } = await createDebate({ topic: trimmedTopic });
      setActiveDebate(debateId);
      navigate(DEBATE_ROUTES.session(debateId), {
        replace: true,
        state: { topic },
      });
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : "토론을 시작하지 못했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    topicInput,
    setTopicInput,
    canSubmit,
    isSubmitting,
    error,
    cancel,
    confirmStartDebate,
  };
}

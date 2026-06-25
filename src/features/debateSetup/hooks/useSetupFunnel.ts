import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEBATE_ROUTES } from "@/app/router";
import { createDebate } from "@/features/debate/api/debateApi";
import { useDebateFlowStore } from "@/features/debate/store/debateFlowStore";
import { ApiError } from "@/shared/api/errors";
import { SETUP_STEP_ORDER, type SetupStepId } from "../constants/setupSteps";
import { buildStepProgressItems } from "../lib/buildStepProgressItems";
import { getAdjacentStepId } from "../lib/setupStepNavigation";
import { useMicPermission } from "./useMicPermission";

export function useSetupFunnel() {
  const navigate = useNavigate();
  const setActiveDebate = useDebateFlowStore(state => state.setActiveDebate);

  const [currentStepId, setCurrentStepId] = useState<SetupStepId>("topic");
  const [topicInput, setTopicInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { micPermission, micErrorMessage, isRequestingMic, checkMicPermission, requestMicPermission } =
    useMicPermission();

  useEffect(() => {
    if (currentStepId !== "mic") {
      return;
    }

    void checkMicPermission();
  }, [currentStepId, checkMicPermission]);

  const trimmedTopic = topicInput.trim();
  const canGoNext = currentStepId === "topic" && trimmedTopic.length > 0 && !isSubmitting;
  const canStartDebate =
    currentStepId === "mic" && micPermission === "granted" && !isSubmitting && !isRequestingMic;

  const stepProgressItems = useMemo(
    () => buildStepProgressItems(SETUP_STEP_ORDER, currentStepId),
    [currentStepId],
  );

  const cancel = () => {
    navigate(DEBATE_ROUTES.home);
  };

  const goNext = () => {
    if (!canGoNext) {
      return;
    }

    const nextStepId = getAdjacentStepId(SETUP_STEP_ORDER, currentStepId, 1);
    if (nextStepId) {
      setCurrentStepId(nextStepId);
      setError(null);
    }
  };

  const goPrevious = () => {
    const previousStepId = getAdjacentStepId(SETUP_STEP_ORDER, currentStepId, -1);
    if (previousStepId) {
      setCurrentStepId(previousStepId);
      setError(null);
    }
  };

  const confirmStartDebate = async () => {
    if (!canStartDebate) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const { debateId, topic } = await createDebate({ topic: trimmedTopic });
      setActiveDebate(debateId, topic);
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
    currentStepId,
    topicInput,
    setTopicInput,
    canGoNext,
    canStartDebate,
    isSubmitting,
    error,
    micPermission,
    micErrorMessage,
    isRequestingMic,
    stepProgressItems,
    cancel,
    goNext,
    goPrevious,
    requestMicPermission,
    confirmStartDebate,
  };
}

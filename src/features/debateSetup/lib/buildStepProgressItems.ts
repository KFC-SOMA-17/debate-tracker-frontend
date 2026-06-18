import type { StepProgressItem, StepStatus } from "@/shared/ui/stepper";
import { SETUP_STEP_META, type SetupStepId } from "../constants/setupSteps";

function resolveStepStatus(stepIndex: number, currentIndex: number): StepStatus {
  if (stepIndex < currentIndex) {
    return "completed";
  }
  if (stepIndex === currentIndex) {
    return "current";
  }
  return "upcoming";
}

export function buildStepProgressItems(
  order: readonly SetupStepId[],
  currentStepId: SetupStepId,
): StepProgressItem[] {
  const currentIndex = order.indexOf(currentStepId);

  return order.map((id, index) => ({
    id,
    label: SETUP_STEP_META[id].label,
    status: resolveStepStatus(index, currentIndex),
    stepNumber: index + 1,
  }));
}

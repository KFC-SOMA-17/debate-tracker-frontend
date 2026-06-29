import type { SetupStepId } from "../constants/setupSteps";

export function getAdjacentStepId(
  order: readonly SetupStepId[],
  currentId: SetupStepId,
  direction: -1 | 1,
): SetupStepId | null {
  const currentIndex = order.indexOf(currentId);
  if (currentIndex === -1) {
    return null;
  }

  const nextIndex = currentIndex + direction;
  if (nextIndex < 0 || nextIndex >= order.length) {
    return null;
  }

  return order[nextIndex] ?? null;
}

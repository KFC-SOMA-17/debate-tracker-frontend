export const SETUP_STEP_ORDER = ["topic", "mic"] as const;

export type SetupStepId = (typeof SETUP_STEP_ORDER)[number];

export const SETUP_STEP_META: Record<SetupStepId, { label: string }> = {
  topic: { label: "주제 입력" },
  mic: { label: "마이크 허용" },
};

export const SETUP_TOPIC_PLACEHOLDER = "예: AI 창작물은 예술인가";

import { createContext, useContext, type ReactNode } from "react";

export type DebateSessionPhase = "idle" | "active" | "ended";

export type DebateSessionLayoutContextValue = {
  phase: DebateSessionPhase;
  /** 토론 진행 중·종료 후 header/배너용 (idle에서는 미사용) */
  topic?: string;
  /** 진행 시간 표시 mock (예: "24:18") */
  elapsedLabel?: string;
  onStartDebate?: () => void;
  onEndDebate?: () => void;
};

const DebateSessionLayoutContext = createContext<DebateSessionLayoutContextValue | null>(null);

export function useDebateSessionLayout(): DebateSessionLayoutContextValue {
  const value = useContext(DebateSessionLayoutContext);
  if (!value) {
    throw new Error("useDebateSessionLayout must be used within DebateSessionLayout");
  }
  return value;
}

export { DebateSessionLayoutContext };

export type DebateSessionLayoutProviderProps = {
  value: DebateSessionLayoutContextValue;
  children: ReactNode;
};

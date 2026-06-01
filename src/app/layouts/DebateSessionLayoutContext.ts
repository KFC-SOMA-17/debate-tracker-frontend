import { createContext, useContext, type ReactNode } from "react";

export type DebateSessionPhase = "idle" | "active" | "ended";

export type DebateSessionLayoutContextValue = {
  phase: DebateSessionPhase;
  /** null이면 배너 placeholder 표시 */
  debateTopic: string | null;
  elapsedLabel?: string;
  openStartDebateModal: () => void;
  openEndDebateModal: () => void;
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

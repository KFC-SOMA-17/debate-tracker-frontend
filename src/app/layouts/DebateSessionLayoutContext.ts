import { createContext, useContext, type ReactNode } from "react";
import type { RecordingStatus } from "@/features/audioCapture/types/audioCapture";

export type DebateSessionPhase = "idle" | "active" | "ended";

export type DebateSessionLayoutContextValue = {
  phase: DebateSessionPhase;
  /** null이면 배너 placeholder 표시 */
  debateTopic: string | null;
  elapsedLabel?: string;
  /** 토론 진행 중 마이크·캡처 상태 (헤더 녹음 배지) */
  recordingStatus: RecordingStatus;
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

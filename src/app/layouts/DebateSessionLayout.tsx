import type { ReactNode } from "react";
import { AppHeader, HeaderBrand } from "@/shared/ui/header";
import { Navigation } from "@/shared/ui/navigation";
import { DEBATE_NAV_IDS, DEBATE_NAV_ITEMS } from "./debateNavigation";
import { DebateSessionHeaderTrailing } from "./DebateSessionHeaderTrailing";
import {
  DebateSessionLayoutContext,
  type DebateSessionLayoutContextValue,
  type DebateSessionPhase,
} from "./DebateSessionLayoutContext";

export type DebateSessionLayoutProps = {
  children: ReactNode;
  /** 라우트·API 연동 전 mock. 2단계 이후 URL/쿼리에서 유도 */
  phase?: DebateSessionPhase;
  topic?: string;
  elapsedLabel?: string;
  onStartDebate?: () => void;
  onEndDebate?: () => void;
  /** 2단계에서 라우트 path와 동기화 */
  activeNavId?: string;
  onNavigate?: (navId: string) => void;
};

export function DebateSessionLayout({
  children,
  phase = "idle",
  topic,
  elapsedLabel,
  onStartDebate,
  onEndDebate,
  activeNavId = DEBATE_NAV_IDS.mainDashboard,
  onNavigate,
}: DebateSessionLayoutProps) {
  const contextValue: DebateSessionLayoutContextValue = {
    phase,
    topic,
    elapsedLabel,
    onStartDebate,
    onEndDebate,
  };

  return (
    <DebateSessionLayoutContext.Provider value={contextValue}>
      <div className="flex min-h-screen flex-col bg-bg-subtle">
        <AppHeader brand={<HeaderBrand />} trailing={<DebateSessionHeaderTrailing />} />
        <Navigation items={[...DEBATE_NAV_ITEMS]} activeId={activeNavId} onNavigate={onNavigate} />
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</main>
      </div>
    </DebateSessionLayoutContext.Provider>
  );
}

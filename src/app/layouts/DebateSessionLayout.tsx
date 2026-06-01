import { Outlet, useNavigate } from "react-router-dom";
import { DEBATE_ROUTES } from "@/app/router";
import { AppHeader, HeaderBrand } from "@/shared/ui/header";
import { Navigation } from "@/shared/ui/navigation";
import { DEBATE_NAV_IDS, DEBATE_NAV_ITEMS } from "./debateNavigation";
import { DebateSessionHeaderTrailing } from "./DebateSessionHeaderTrailing";
import { DebateSessionLayoutContext } from "./DebateSessionLayoutContext";
import { useDebateSessionLayoutState } from "./useDebateSessionLayoutState";

export function DebateSessionLayout() {
  const navigate = useNavigate();
  const { phase, topic, elapsedLabel, onStartDebate, onEndDebate } = useDebateSessionLayoutState();

  const handleNavigate = (navId: string) => {
    if (navId === DEBATE_NAV_IDS.mainDashboard) {
      navigate(DEBATE_ROUTES.home);
    }
  };

  return (
    <DebateSessionLayoutContext.Provider
      value={{
        phase,
        topic,
        elapsedLabel,
        onStartDebate,
        onEndDebate,
      }}
    >
      <div className="flex min-h-screen flex-col bg-bg-subtle">
        <AppHeader brand={<HeaderBrand />} trailing={<DebateSessionHeaderTrailing />} />
        <Navigation items={[...DEBATE_NAV_ITEMS]} activeId={DEBATE_NAV_IDS.mainDashboard} onNavigate={handleNavigate} />
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <Outlet />
        </main>
      </div>
    </DebateSessionLayoutContext.Provider>
  );
}

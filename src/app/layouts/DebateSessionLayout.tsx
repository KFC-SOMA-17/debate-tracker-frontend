import { Outlet, useNavigate } from "react-router-dom";
import { EndDebateConfirmModal } from "@/features/mainDashboard/components/EndDebateConfirmModal";
import { StartDebateModal } from "@/features/mainDashboard/components/StartDebateModal";
import { DEBATE_ROUTES } from "@/app/router";
import { AppHeader, HeaderBrand } from "@/shared/ui/header";
import { Navigation } from "@/shared/ui/navigation";
import { DEBATE_NAV_IDS, DEBATE_NAV_ITEMS } from "./debateNavigation";
import { DebateSessionHeaderTrailing } from "./DebateSessionHeaderTrailing";
import { DebateSessionLayoutContext } from "./DebateSessionLayoutContext";
import { useDebateSessionLayoutState } from "./useDebateSessionLayoutState";

export function DebateSessionLayout() {
  const navigate = useNavigate();
  const {
    phase,
    debateTopic,
    elapsedLabel,
    recordingStatus,
    transcriptSegments,
    sttStatus,
    lastSttError,
    isStartModalOpen,
    setIsStartModalOpen,
    isEndModalOpen,
    setIsEndModalOpen,
    openStartDebateModal,
    openEndDebateModal,
    confirmStartDebate,
    confirmEndDebate,
  } = useDebateSessionLayoutState();

  const handleNavigate = (navId: string) => {
    if (navId === DEBATE_NAV_IDS.mainDashboard) {
      navigate(DEBATE_ROUTES.home);
    }
  };

  return (
    <DebateSessionLayoutContext.Provider
      value={{
        phase,
        debateTopic,
        elapsedLabel,
        recordingStatus,
        transcriptSegments,
        sttStatus,
        lastSttError,
        openStartDebateModal,
        openEndDebateModal,
      }}
    >
      <div className="flex h-screen max-h-screen flex-col overflow-hidden bg-bg-subtle">
        <AppHeader brand={<HeaderBrand />} trailing={<DebateSessionHeaderTrailing />} />
        <Navigation
          items={[...DEBATE_NAV_ITEMS(phase)]}
          activeId={DEBATE_NAV_IDS.mainDashboard}
          onNavigate={handleNavigate}
        />
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <Outlet />
        </main>
      </div>

      <StartDebateModal open={isStartModalOpen} onOpenChange={setIsStartModalOpen} onConfirm={confirmStartDebate} />
      <EndDebateConfirmModal open={isEndModalOpen} onOpenChange={setIsEndModalOpen} onConfirm={confirmEndDebate} />
    </DebateSessionLayoutContext.Provider>
  );
}

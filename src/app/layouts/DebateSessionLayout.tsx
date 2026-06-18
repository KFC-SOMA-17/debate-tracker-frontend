import { Outlet, useNavigate, useParams } from "react-router-dom";
import { EndDebateConfirmModal } from "@/features/mainDashboard/components/EndDebateConfirmModal";
import { DEBATE_ROUTES } from "@/app/router";
import { AppHeader, HeaderBrand } from "@/shared/ui/header";
import { Navigation } from "@/shared/ui/navigation";
import { DEBATE_NAV_IDS, DEBATE_NAV_ITEMS } from "./debateNavigation";
import { DebateSessionHeaderTrailing } from "./DebateSessionHeaderTrailing";
import { DebateSessionLayoutContext } from "./DebateSessionLayoutContext";
import { useDebateSessionLayoutState } from "./useDebateSessionLayoutState";

export function DebateSessionLayout() {
  const navigate = useNavigate();
  const { debateId } = useParams<{ debateId: string }>();
  const {
    phase,
    debateTopic,
    elapsedLabel,
    recordingStatus,
    transcriptSegments,
    sttStatus,
    lastSttError,
    isEndModalOpen,
    setIsEndModalOpen,
    openEndDebateModal,
    confirmEndDebate,
  } = useDebateSessionLayoutState();

  const handleNavigate = (navId: string) => {
    if (navId === DEBATE_NAV_IDS.mainDashboard && debateId != null) {
      navigate(DEBATE_ROUTES.session(debateId));
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

      <EndDebateConfirmModal open={isEndModalOpen} onOpenChange={setIsEndModalOpen} onConfirm={confirmEndDebate} />
    </DebateSessionLayoutContext.Provider>
  );
}

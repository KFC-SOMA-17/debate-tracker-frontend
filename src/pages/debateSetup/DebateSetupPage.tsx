import { useActiveDebateRedirect } from "@/features/debate/hooks/useActiveDebateRedirect";
import { SetupMicPermissionStep } from "@/features/debateSetup/components/SetupMicPermissionStep";
import { SetupTopicStep } from "@/features/debateSetup/components/SetupTopicStep";
import { useSetupFunnel } from "@/features/debateSetup/hooks/useSetupFunnel";
import { AppHeader, HeaderBrand } from "@/shared/ui/header";
import { StepProgress } from "@/shared/ui/stepper";
import {
  ContentInner,
  MainContent,
  PageRoot,
  StepContent,
} from "./DebateSetupPage.styles";

export function DebateSetupPage() {
  useActiveDebateRedirect();

  const {
    currentStepId,
    topicInput,
    setTopicInput,
    canGoNext,
    canStartDebate,
    isSubmitting,
    error,
    micPermission,
    micErrorMessage,
    isRequestingMic,
    stepProgressItems,
    cancel,
    goNext,
    goPrevious,
    requestMicPermission,
    confirmStartDebate,
  } = useSetupFunnel();

  return (
    <PageRoot>
      <AppHeader brand={<HeaderBrand />} />
      <MainContent>
        <ContentInner>
          <StepProgress steps={stepProgressItems} />
          <StepContent>
            {currentStepId === "topic" ? (
              <SetupTopicStep
                topicInput={topicInput}
                onTopicInputChange={setTopicInput}
                canGoNext={canGoNext}
                isSubmitting={isSubmitting}
                error={error}
                onCancel={cancel}
                onNext={goNext}
              />
            ) : (
              <SetupMicPermissionStep
                micPermission={micPermission}
                micErrorMessage={micErrorMessage}
                isRequestingMic={isRequestingMic}
                canStartDebate={canStartDebate}
                isSubmitting={isSubmitting}
                error={error}
                onPrevious={goPrevious}
                onRequestMicPermission={requestMicPermission}
                onStartDebate={confirmStartDebate}
              />
            )}
          </StepContent>
        </ContentInner>
      </MainContent>
    </PageRoot>
  );
}

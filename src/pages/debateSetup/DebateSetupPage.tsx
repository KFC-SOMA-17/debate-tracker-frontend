import { useActiveDebateRedirect } from "@/features/debate/hooks/useActiveDebateRedirect";
import { SetupMicPermissionStep } from "@/features/debateSetup/components/SetupMicPermissionStep";
import { SetupTopicStep } from "@/features/debateSetup/components/SetupTopicStep";
import { useSetupFunnel } from "@/features/debateSetup/hooks/useSetupFunnel";
import { AppHeader, HeaderBrand } from "@/shared/ui/header";
import { StepProgress } from "@/shared/ui/stepper";

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
    <div className="flex h-screen max-h-screen flex-col overflow-hidden bg-bg-subtle">
      <AppHeader brand={<HeaderBrand />} />
      <main className="min-h-0 flex-1 overflow-y-auto scrollbar-hidden px-6 pt-16 pb-12">
        <div className="mx-auto w-full max-w-xl">
          <StepProgress steps={stepProgressItems} />
          <div className="mt-8">
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
          </div>
        </div>
      </main>
    </div>
  );
}

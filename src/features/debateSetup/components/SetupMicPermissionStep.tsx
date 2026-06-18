import type { MicPermissionState } from "@/features/audioCapture/types/audioCapture";
import { Button } from "@/shared/ui/button";
import { SetupMicLargeIcon, SetupMicSmallIcon, SetupPlaySmallIcon } from "@/shared/ui/icons/setup";
import { SetupStepCard } from "./SetupStepCard";

interface SetupMicPermissionStepProps {
  micPermission: MicPermissionState;
  micErrorMessage: string | null;
  isRequestingMic: boolean;
  canStartDebate: boolean;
  isSubmitting: boolean;
  error: string | null;
  onPrevious: () => void;
  onRequestMicPermission: () => void;
  onStartDebate: () => void;
}

export function SetupMicPermissionStep({
  micPermission,
  micErrorMessage,
  isRequestingMic,
  canStartDebate,
  isSubmitting,
  error,
  onPrevious,
  onRequestMicPermission,
  onStartDebate,
}: SetupMicPermissionStepProps) {
  const showMicAction = micPermission !== "granted";

  return (
    <SetupStepCard
      header={
        <div className="flex flex-col gap-1.5">
          <h1 className="text-xl font-bold text-text-primary">마이크 권한을 허용해주세요</h1>
          <p className="text-sm text-text-muted">음성 인식을 위해 마이크 접근 권한이 필요합니다.</p>
        </div>
      }
      footer={
        <div className="flex items-center justify-between gap-2">
          <Button
            type="button"
            variant="secondary"
            className="cursor-pointer"
            disabled={isSubmitting}
            onClick={onPrevious}
          >
            이전
          </Button>
          <Button
            type="button"
            className="cursor-pointer"
            disabled={!canStartDebate}
            loading={isSubmitting}
            rightIcon={!isSubmitting ? <SetupPlaySmallIcon className="size-4" aria-hidden /> : undefined}
            onClick={() => void onStartDebate()}
          >
            {isSubmitting ? "시작 중..." : "토론 시작"}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-6 px-8 py-10 text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-accent-primary-muted">
          <SetupMicLargeIcon className="size-9" aria-hidden />
        </div>
        <p className="text-sm leading-5 text-text-muted">
          브라우저의 마이크 권한 허용 후에
          <br />
          아래 버튼을 눌러주세요.
        </p>
        {showMicAction ? (
          <Button
            type="button"
            variant="secondary"
            className="cursor-pointer border-accent-primary text-accent-primary hover:bg-accent-primary-muted"
            loading={isRequestingMic}
            leftIcon={!isRequestingMic ? <SetupMicSmallIcon className="size-4" aria-hidden /> : undefined}
            onClick={() => void onRequestMicPermission()}
          >
            권한을 허용했습니다
          </Button>
        ) : (
          <p className="text-sm font-medium text-status-success">마이크 권한이 허용되었습니다.</p>
        )}
        {micErrorMessage ? <p className="text-xs text-status-danger">{micErrorMessage}</p> : null}
        {error ? <p className="text-xs text-status-danger">{error}</p> : null}
      </div>
    </SetupStepCard>
  );
}

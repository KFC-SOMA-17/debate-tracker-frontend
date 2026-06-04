import { getRecordingStatusBadgePresentation } from "@/features/audioCapture/lib/recordingStatusBadge";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { ClockIcon, RadioIcon } from "@/shared/ui/icons";
import { useDebateSessionLayout } from "./DebateSessionLayoutContext";

export function DebateSessionHeaderTrailing() {
  const {
    phase,
    elapsedLabel = "00:00",
    recordingStatus,
    openStartDebateModal,
    openEndDebateModal,
  } = useDebateSessionLayout();

  if (phase === "idle") {
    return (
      <>
        <Badge variant="status" tone="muted" leftIcon={<ClockIcon className="size-3.5" aria-hidden />}>
          토론 대기 중
        </Badge>
        <Button type="button" variant="primary" size="md" onClick={openStartDebateModal}>
          토론 시작
        </Button>
      </>
    );
  }

  if (phase === "active") {
    const recordingBadge = getRecordingStatusBadgePresentation(recordingStatus);

    return (
      <>
        <Badge variant="status" tone="info">
          토론 진행 중
        </Badge>
        <Badge variant="status" tone="muted" leftIcon={<ClockIcon className="size-3.5" aria-hidden />}>
          {elapsedLabel}
        </Badge>
        <Badge
          variant="status"
          tone={recordingBadge.tone}
          leftIcon={<RadioIcon className="size-3.5" aria-hidden />}
        >
          {recordingBadge.label}
        </Badge>
        <Button type="button" variant="danger" size="md" onClick={openEndDebateModal}>
          토론 종료
        </Button>
      </>
    );
  }

  return (
    <>
      <Badge variant="status" tone="muted">
        토론 종료
      </Badge>
      <span className="inline-flex items-center gap-1.5 text-sm text-text-secondary">
        <ClockIcon className="size-3.5 shrink-0" aria-hidden />
        {elapsedLabel}
      </span>
    </>
  );
}

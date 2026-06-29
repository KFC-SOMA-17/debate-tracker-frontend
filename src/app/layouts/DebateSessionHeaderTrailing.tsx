import { getRecordingStatusBadgePresentation } from "@/features/audioCapture/lib/recordingStatusBadge";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { ClockIcon, RadioIcon } from "@/shared/ui/icons";
import { IconSlot } from "@/shared/ui/icons/IconSlot";
import { theme } from "@/styles/theme";
import { useDebateSessionLayout } from "./DebateSessionLayoutContext";
import { ElapsedTime } from "./DebateSessionHeaderTrailing.styles";

export function DebateSessionHeaderTrailing() {
  const {
    phase,
    elapsedLabel = "00:00",
    recordingStatus,
    openEndDebateModal,
  } = useDebateSessionLayout();

  if (phase === "active") {
    const recordingBadge = getRecordingStatusBadgePresentation(recordingStatus);

    return (
      <>
        <Badge variant="status" tone="info">
          토론 진행 중
        </Badge>
        <Badge
          variant="status"
          tone="muted"
          leftIcon={
            <IconSlot $size={theme.sizes.icon3_5}>
              <ClockIcon aria-hidden />
            </IconSlot>
          }
        >
          {elapsedLabel}
        </Badge>
        <Badge
          variant="status"
          tone={recordingBadge.tone}
          leftIcon={
            <IconSlot $size={theme.sizes.icon3_5}>
              <RadioIcon aria-hidden />
            </IconSlot>
          }
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
      <ElapsedTime>
        <IconSlot $size={theme.sizes.icon3_5}>
          <ClockIcon aria-hidden />
        </IconSlot>
        {elapsedLabel}
      </ElapsedTime>
    </>
  );
}

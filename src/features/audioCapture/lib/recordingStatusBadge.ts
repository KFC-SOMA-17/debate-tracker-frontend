import type { BadgeTone } from "@/shared/ui/badge";
import type { RecordingStatus } from "../types/audioCapture";

export type RecordingStatusBadgePresentation = {
  label: string;
  tone: BadgeTone;
};

/**
 * 캡처 훅의 RecordingStatus를 헤더 Badge 라벨·톤으로 변환한다.
 */
export function getRecordingStatusBadgePresentation(
  status: RecordingStatus,
): RecordingStatusBadgePresentation {
  switch (status) {
    case "capturing":
      return { label: "녹음 정상", tone: "success" };
    case "requesting":
      return { label: "마이크 연결 중", tone: "info" };
    case "paused":
      return { label: "녹음 일시정지", tone: "warning" };
    case "denied":
      return { label: "마이크 권한 없음", tone: "danger" };
    case "error":
      return { label: "녹음 오류", tone: "danger" };
    case "idle":
    default:
      return { label: "녹음 준비 중", tone: "muted" };
  }
}

import type { SttConnectionStatus } from "../hooks/useSttWebSocket";
import type { SttErrorData } from "../types/sttMessages";

export type TranscriptConnectionPresentation = {
  badgeLabel: string;
  badgeTone: "info" | "success" | "warning" | "danger" | "muted";
  bannerTitle: string;
  bannerDescription: string;
  bannerTone: "warning" | "danger";
};

export function getTranscriptConnectionPresentation(
  sttStatus: SttConnectionStatus,
  phase: "active" | "ended",
  lastError: SttErrorData | null,
): TranscriptConnectionPresentation | null {
  if (phase === "ended" || sttStatus === "ended") {
    return {
      badgeLabel: "토론 종료",
      badgeTone: "muted",
      bannerTitle: "",
      bannerDescription: "",
      bannerTone: "warning",
    };
  }

  switch (sttStatus) {
    case "connecting":
    case "ready":
      return {
        badgeLabel: "STT 연결 중",
        badgeTone: "info",
        bannerTitle: "",
        bannerDescription: "",
        bannerTone: "warning",
      };
    case "disconnected":
      return {
        badgeLabel: "네트워크 단절",
        badgeTone: "warning",
        bannerTitle: "네트워크 연결이 끊어졌습니다",
        bannerDescription: "연결을 복구하는 중입니다. 발화는 잠시 기록되지 않을 수 있습니다.",
        bannerTone: "warning",
      };
    case "reconnecting":
      return {
        badgeLabel: "재연결 중",
        badgeTone: "warning",
        bannerTitle: "속기록 서버에 재연결 중입니다",
        bannerDescription: "네트워크 상태를 확인해 주세요. 연결이 복구되면 속기록이 이어집니다.",
        bannerTone: "warning",
      };
    case "recording":
      return {
        badgeLabel: "실시간 수신",
        badgeTone: "success",
        bannerTitle: "",
        bannerDescription: "",
        bannerTone: "warning",
      };
    case "stopping":
      return {
        badgeLabel: "종료 처리 중",
        badgeTone: "warning",
        bannerTitle: "",
        bannerDescription: "",
        bannerTone: "warning",
      };
    case "error":
      return {
        badgeLabel: "재연결 실패",
        badgeTone: "danger",
        bannerTitle: "속기록 서버 재연결에 실패했습니다",
        bannerDescription:
          lastError?.message ?? "STT 서버와 연결할 수 없습니다. 네트워크 상태를 확인한 뒤 다시 시도해 주세요.",
        bannerTone: "danger",
      };
    default:
      return null;
  }
}

export function shouldShowTranscriptConnectionBanner(
  sttStatus: SttConnectionStatus,
  phase: "active" | "ended",
): boolean {
  return (
    phase === "active" &&
    (sttStatus === "disconnected" || sttStatus === "reconnecting" || sttStatus === "error")
  );
}

import { isModifiedAtNewer } from "./agendaSummaryMerge";
import type { Agenda } from "../types/agendaSummary";

export function getLatestAgendaModifiedAt(agendas: Agenda[]): string | null {
  let latest: string | null = null;

  for (const agenda of agendas) {
    const timestamps = [
      agenda.modifiedAt,
      ...agenda.claims.flatMap(claim => [
        claim.modifiedAt,
        ...claim.evidences.map(evidence => evidence.modifiedAt),
      ]),
    ];

    for (const modifiedAt of timestamps) {
      if (latest == null || isModifiedAtNewer(modifiedAt, latest)) {
        latest = modifiedAt;
      }
    }
  }

  return latest;
}

export function formatAgendaSummaryUpdatedAt(modifiedAt: string): string {
  const date = new Date(modifiedAt);
  if (Number.isNaN(date.getTime())) {
    return "갱신 시각 미확인";
  }

  const timeLabel = date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${timeLabel} 갱신`;
}

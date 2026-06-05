import type { EvidenceType } from "../types/agendaSummary";

export function formatEvidenceTypeLabel(type?: EvidenceType): string {
  switch (type) {
    case "STATISTICS":
      return "통계";
    case "EXAMPLE":
      return "사례";
    case "QUOTATION":
      return "인용";
    default:
      return "근거";
  }
}

import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/lib/cn";
import { formatEvidenceTypeLabel } from "../lib/formatEvidenceTypeLabel";
import type { ClaimStance, Evidence } from "../types/agendaSummary";

export type EvidenceListItemProps = {
  evidence: Evidence;
  stance: ClaimStance;
  className?: string;
};

export function EvidenceListItem({ evidence, stance, className }: EvidenceListItemProps) {
  const tone = stance === "PROS" ? "info" : "danger";

  return (
    <div className={cn("flex gap-2", className)}>
      <Badge variant="evidence" tone={tone} className="shrink-0">
        {formatEvidenceTypeLabel(evidence.type)}
      </Badge>
      <p className="min-w-0 flex-1 text-sm leading-relaxed text-text-secondary">{evidence.content}</p>
    </div>
  );
}

import { formatEvidenceTypeLabel } from "../lib/formatEvidenceTypeLabel";
import type { ClaimStance, Evidence } from "../types/agendaSummary";
import { Content, EvidenceBadge, Root } from "./EvidenceListItem.styles";

export type EvidenceListItemProps = {
  evidence: Evidence;
  stance: ClaimStance;
  className?: string;
};

export function EvidenceListItem({ evidence, stance, className }: EvidenceListItemProps) {
  const tone = stance === "PROS" ? "pros" : "danger";

  return (
    <Root className={className}>
      <EvidenceBadge variant="evidence" tone={tone}>
        {formatEvidenceTypeLabel(evidence.type)}
      </EvidenceBadge>
      <Content>{evidence.content}</Content>
    </Root>
  );
}

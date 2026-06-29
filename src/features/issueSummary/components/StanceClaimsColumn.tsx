import type { Claim, ClaimStance } from "../types/agendaSummary";
import { ClaimEvidenceAccordion } from "./ClaimEvidenceAccordion";
import { Column, Heading } from "./StanceClaimsColumn.styles";

export type StanceClaimsColumnProps = {
  stance: ClaimStance;
  claims: Claim[];
  className?: string;
};

export function StanceClaimsColumn({ stance, claims, className }: StanceClaimsColumnProps) {
  const label = stance === "PROS" ? "찬성 측" : "반대 측";

  return (
    <Column className={className} $stance={stance}>
      <Heading $stance={stance}>{label}</Heading>
      <ClaimEvidenceAccordion claims={claims} stance={stance} />
    </Column>
  );
}

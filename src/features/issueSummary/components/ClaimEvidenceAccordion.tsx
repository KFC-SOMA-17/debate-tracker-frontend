import { Accordion } from "@/shared/ui/accordion";
import type { Claim, ClaimStance } from "../types/agendaSummary";
import { EvidenceListItem } from "./EvidenceListItem";

export type ClaimEvidenceAccordionProps = {
  claims: Claim[];
  stance: ClaimStance;
};

export function ClaimEvidenceAccordion({ claims, stance }: ClaimEvidenceAccordionProps) {
  if (claims.length === 0) {
    return <p className="text-center text-xs text-text-muted">아직 주장이 없습니다.</p>;
  }

  const items = claims.map(claim => ({
    id: String(claim.claimId),
    title: claim.content?.trim() || "주장",
    defaultOpen: true,
    children: (
      <div className="flex flex-col gap-2">
        {claim.evidences.length === 0 ? (
          <p className="text-xs text-text-muted">근거가 아직 없습니다.</p>
        ) : (
          claim.evidences.map(evidence => (
            <EvidenceListItem key={evidence.evidenceId} evidence={evidence} stance={stance} />
          ))
        )}
      </div>
    ),
  }));

  return <Accordion key={items.map(item => item.id).join("-")} items={items} allowMultiple />;
}

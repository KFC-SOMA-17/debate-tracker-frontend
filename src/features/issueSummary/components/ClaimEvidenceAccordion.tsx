import { Accordion } from "@/shared/ui/accordion";
import type { Claim, ClaimStance } from "../types/agendaSummary";
import { EvidenceListItem } from "./EvidenceListItem";
import { EmptyText, EvidenceList, NoEvidenceText } from "./ClaimEvidenceAccordion.styles";

export type ClaimEvidenceAccordionProps = {
  claims: Claim[];
  stance: ClaimStance;
};

export function ClaimEvidenceAccordion({ claims, stance }: ClaimEvidenceAccordionProps) {
  if (claims.length === 0) {
    return <EmptyText>아직 주장이 없습니다.</EmptyText>;
  }

  const items = claims.map(claim => ({
    id: String(claim.claimId),
    title: claim.content?.trim() || "주장",
    defaultOpen: true,
    children: (
      <EvidenceList>
        {claim.evidences.length === 0 ? (
          <NoEvidenceText>근거가 아직 없습니다.</NoEvidenceText>
        ) : (
          claim.evidences.map(evidence => (
            <EvidenceListItem key={evidence.evidenceId} evidence={evidence} stance={stance} />
          ))
        )}
      </EvidenceList>
    ),
  }));

  return <Accordion key={items.map(item => item.id).join("-")} items={items} allowMultiple />;
}

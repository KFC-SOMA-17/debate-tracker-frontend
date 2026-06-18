import type { Agenda } from "../types/agendaSummary";
import { StanceClaimsColumn } from "./StanceClaimsColumn";
import { ClaimsGrid, Root, TitlePill } from "./AgendaSummaryView.styles";

export type AgendaSummaryViewProps = {
  agenda: Agenda;
  className?: string;
};

export function AgendaSummaryView({ agenda, className }: AgendaSummaryViewProps) {
  const prosClaims = agenda.claims.filter(claim => claim.stance === "PROS");
  const consClaims = agenda.claims.filter(claim => claim.stance === "CONS");
  const title = agenda.content?.trim() || "쟁점";

  return (
    <Root className={className}>
      <TitlePill>{title}</TitlePill>

      <ClaimsGrid>
        <StanceClaimsColumn stance="PROS" claims={prosClaims} />
        <StanceClaimsColumn stance="CONS" claims={consClaims} />
      </ClaimsGrid>
    </Root>
  );
}

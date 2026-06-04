import { cn } from "@/shared/lib/cn";
import type { Agenda } from "../types/agendaSummary";
import { StanceClaimsColumn } from "./StanceClaimsColumn";

export type AgendaSummaryViewProps = {
  agenda: Agenda;
  className?: string;
};

export function AgendaSummaryView({ agenda, className }: AgendaSummaryViewProps) {
  const prosClaims = agenda.claims.filter(claim => claim.stance === "PROS");
  const consClaims = agenda.claims.filter(claim => claim.stance === "CONS");
  const title = agenda.content?.trim() || "쟁점";

  return (
    <div className={cn("flex w-full flex-col items-center gap-4", className)}>
      <div className="rounded-full bg-text-primary px-4 py-1 text-sm font-medium text-text-inverse">{title}</div>

      <div className="grid w-full grid-cols-2 border-t border-border-default/50">
        <StanceClaimsColumn stance="PROS" claims={prosClaims} />
        <StanceClaimsColumn stance="CONS" claims={consClaims} className="border-l border-border-default/50" />
      </div>
    </div>
  );
}

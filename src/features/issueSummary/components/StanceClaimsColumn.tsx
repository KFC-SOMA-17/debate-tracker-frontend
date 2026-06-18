import { cn } from "@/shared/lib/cn";
import type { Claim, ClaimStance } from "../types/agendaSummary";
import { ClaimEvidenceAccordion } from "./ClaimEvidenceAccordion";

export type StanceClaimsColumnProps = {
  stance: ClaimStance;
  claims: Claim[];
  className?: string;
};

export function StanceClaimsColumn({ stance, claims, className }: StanceClaimsColumnProps) {
  const label = stance === "PROS" ? "찬성 측" : "반대 측";

  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-4 py-4",
        stance === "PROS" ? "pr-6" : "pl-6",
        className,
      )}
    >
      <h3
        className={cn(
          "text-center text-sm font-bold",
          stance === "PROS" ? "text-stance-pros" : "text-status-danger",
        )}
      >
        {label}
      </h3>
      <ClaimEvidenceAccordion claims={claims} stance={stance} />
    </div>
  );
}

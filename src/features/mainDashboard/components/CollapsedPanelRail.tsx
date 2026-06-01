import { ChevronRightIcon } from "@/shared/ui/icons";
import { cn } from "@/shared/lib/cn";

export type CollapsedPanelRailProps = {
  label: string;
  onExpand: () => void;
  /** collapse strip이 왼쪽 패널이면 펼치기 chevron은 오른쪽(>) */
  expandDirection?: "left" | "right";
};

export function CollapsedPanelRail({ label, onExpand, expandDirection = "right" }: CollapsedPanelRailProps) {
  return (
    <div className="flex h-full w-full items-center justify-center border-r border-border-default bg-bg-muted/30">
      <button
        type="button"
        onClick={onExpand}
        className={cn(
          "flex h-[6.375rem] w-full max-w-[2.65rem] flex-col items-center justify-center gap-2 rounded-lg",
          "bg-bg-default shadow-sm transition-colors",
          "hover:bg-bg-subtle",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
        )}
        aria-label={`${label} 패널 펼치기`}
      >
        <ChevronRightIcon
          className={cn("size-5 shrink-0 text-text-secondary", expandDirection === "left" && "rotate-180")}
          aria-hidden
        />
        <span className="text-xs font-medium text-text-secondary [writing-mode:horizontal-tb]">{label}</span>
      </button>
    </div>
  );
}

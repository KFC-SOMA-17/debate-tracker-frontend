import { cn } from "@/shared/lib/cn";

export type SplitResizeGripProps = {
  className?: string;
};

/** Split bar 중앙 stripe — resize affordance */
export function SplitResizeGrip({ className }: SplitResizeGripProps) {
  return (
    <div
      className={cn(
        "pointer-events-none flex items-center justify-center gap-0.5",
        "rounded-md border border-border-default bg-bg-muted px-1 py-3 shadow-sm",
        className
      )}
      aria-hidden
    >
      <span className="h-4 w-px rounded-full bg-border-strong" />
      <span className="h-4 w-px rounded-full bg-border-strong" />
    </div>
  );
}

import { EmptyState } from "@/shared/ui/feedback";
import { LightbulbIcon, MessageSquareIcon } from "@/shared/ui/icons";
import { cn } from "@/shared/lib/cn";
import { ISSUE_SUMMARY_PANEL_IDLE_EMPTY, TRANSCRIPT_PANEL_IDLE_EMPTY } from "../constants/panelIdleEmpty";

export type MainDashboardPanelIdleEmptyProps = {
  panel: "transcript" | "issueSummary";
  className?: string;
};

const PANEL_CONFIG = {
  transcript: {
    ...TRANSCRIPT_PANEL_IDLE_EMPTY,
    icon: MessageSquareIcon,
  },
  issueSummary: {
    ...ISSUE_SUMMARY_PANEL_IDLE_EMPTY,
    icon: LightbulbIcon,
  },
} as const;

export function MainDashboardPanelIdleEmpty({ panel, className }: MainDashboardPanelIdleEmptyProps) {
  const { title, description, icon: Icon } = PANEL_CONFIG[panel];

  return (
    <div className={cn("flex min-h-0 flex-1 items-center justify-center overflow-auto p-6 select-none", className)}>
      <EmptyState
        className="w-full max-w-md"
        icon={<Icon className="size-12" aria-hidden />}
        title={title}
        description={description}
      />
    </div>
  );
}

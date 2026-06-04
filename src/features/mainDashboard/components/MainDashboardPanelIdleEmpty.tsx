import { EmptyState } from "@/shared/ui/feedback";
import { LightbulbIcon, MessageSquareIcon } from "@/shared/ui/icons";
import { cn } from "@/shared/lib/cn";
import {
  ISSUE_SUMMARY_PANEL_ACTIVE_EMPTY,
  ISSUE_SUMMARY_PANEL_IDLE_EMPTY,
  TRANSCRIPT_PANEL_ACTIVE_EMPTY,
  TRANSCRIPT_PANEL_IDLE_EMPTY,
} from "../constants/panelIdleEmpty";

export type MainDashboardPanelVariant = "idle" | "active" | "ended";

export type MainDashboardPanelIdleEmptyProps = {
  panel: "transcript" | "issueSummary";
  variant?: MainDashboardPanelVariant;
  className?: string;
};

const PANEL_CONFIG = {
  transcript: {
    idle: TRANSCRIPT_PANEL_IDLE_EMPTY,
    active: TRANSCRIPT_PANEL_ACTIVE_EMPTY,
    icon: MessageSquareIcon,
  },
  issueSummary: {
    idle: ISSUE_SUMMARY_PANEL_IDLE_EMPTY,
    active: ISSUE_SUMMARY_PANEL_ACTIVE_EMPTY,
    icon: LightbulbIcon,
  },
} as const;

function resolveEmptyContentVariant(variant: MainDashboardPanelVariant): "idle" | "active" {
  return variant === "idle" ? "idle" : "active";
}

export function MainDashboardPanelIdleEmpty({ panel, variant = "idle", className }: MainDashboardPanelIdleEmptyProps) {
  const config = PANEL_CONFIG[panel];
  const { title, description } = config[resolveEmptyContentVariant(variant)];
  const Icon = config.icon;

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

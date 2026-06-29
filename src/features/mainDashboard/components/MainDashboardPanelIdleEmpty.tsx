import { EmptyState } from "@/shared/ui/feedback";
import { LightbulbIcon, MessageSquareIcon } from "@/shared/ui/icons";
import { theme } from "@/styles/theme";
import {
  ISSUE_SUMMARY_PANEL_ACTIVE_EMPTY,
  ISSUE_SUMMARY_PANEL_IDLE_EMPTY,
} from "@/features/issueSummary/constants/panelEmpty";
import { TRANSCRIPT_PANEL_ACTIVE_EMPTY, TRANSCRIPT_PANEL_IDLE_EMPTY } from "../constants/panelIdleEmpty";
import { EmptyStateWrapper, IconSlot, Root } from "./MainDashboardPanelIdleEmpty.styles";

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
    <Root className={className}>
      <EmptyStateWrapper>
        <EmptyState
          icon={
            <IconSlot $size={theme.sizes.icon12}>
              <Icon aria-hidden />
            </IconSlot>
          }
          title={title}
          description={description}
        />
      </EmptyStateWrapper>
    </Root>
  );
}

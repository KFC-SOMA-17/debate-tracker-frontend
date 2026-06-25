import { useMemo, useState } from "react";
import { useMatch } from "react-router-dom";
import { DEBATE_SESSION_MATCH } from "@/app/router";
import type { DebateSessionPhase } from "@/app/layouts/DebateSessionLayoutContext";
import { ISSUE_SUMMARY_PANEL_ACTIVE_EMPTY } from "@/features/issueSummary/constants/panelEmpty";
import { EmptyState, LoadingState } from "@/shared/ui/feedback";
import { Badge } from "@/shared/ui/badge";
import { NetworkIcon } from "@/shared/ui/icons";
import { theme } from "@/styles/theme";
import { formatAgendaSummaryUpdatedAt } from "../lib/formatAgendaSummaryUpdatedAt";
import { useAgendaSummaryPolling, type AgendaSummaryPollingStatus } from "../hooks/useAgendaSummaryPolling";
import { AgendaSummaryView } from "./AgendaSummaryView";
import { AgendaTabsSection } from "./AgendaTabsSection";
import {
  EmptyIconSlot,
  Header,
  PlaceholderCenter,
  Root,
  ScrollBody,
  Title,
  UpdatedAt,
} from "./IssueSummaryPanel.styles";

export type IssueSummaryPanelProps = {
  phase: DebateSessionPhase;
  className?: string;
};

type HeaderMeta =
  | { kind: "badge"; label: string; tone: "info" | "success" | "warning" | "danger" | "muted" }
  | { kind: "updatedAt"; label: string };

function headerMeta(
  phase: DebateSessionPhase,
  status: AgendaSummaryPollingStatus,
  agendaCount: number,
  lastUpdatedAt: string | null,
): HeaderMeta | null {
  if (phase === "ended") {
    if (agendaCount === 0) {
      return { kind: "badge", label: "토론 종료", tone: "muted" };
    }
    if (lastUpdatedAt) {
      return { kind: "updatedAt", label: formatAgendaSummaryUpdatedAt(lastUpdatedAt) };
    }
    return { kind: "badge", label: "토론 종료", tone: "muted" };
  }

  switch (status) {
    case "loading":
      return { kind: "badge", label: "쟁점 분석 중", tone: "info" };
    case "error":
      return { kind: "badge", label: "갱신 실패", tone: "danger" };
    case "polling":
      if (agendaCount === 0) {
        return { kind: "badge", label: "생성 중", tone: "info" };
      }
      if (lastUpdatedAt) {
        return { kind: "updatedAt", label: formatAgendaSummaryUpdatedAt(lastUpdatedAt) };
      }
      return null;
    default:
      return null;
  }
}

export function IssueSummaryPanel({ phase, className }: IssueSummaryPanelProps) {
  const debateMatch = useMatch(DEBATE_SESSION_MATCH);
  const debateId = debateMatch?.params.debateId;

  const { agendas, lastUpdatedAt, status, error } = useAgendaSummaryPolling({
    debateId,
    phase,
    resetWhenDisabled: false,
  });

  const agendaIds = useMemo(() => agendas.map(agenda => String(agenda.agendaId)), [agendas]);
  const [selectedAgendaId, setSelectedAgendaId] = useState<string | null>(null);

  const activeAgendaId = useMemo(() => {
    if (agendaIds.length === 0) {
      return null;
    }
    if (selectedAgendaId != null && agendaIds.includes(selectedAgendaId)) {
      return selectedAgendaId;
    }
    return agendaIds[0] ?? null;
  }, [agendaIds, selectedAgendaId]);

  const activeAgenda = useMemo(() => {
    if (activeAgendaId == null) {
      return null;
    }
    return agendas.find(agenda => String(agenda.agendaId) === activeAgendaId) ?? null;
  }, [agendas, activeAgendaId]);

  const meta = headerMeta(phase, status, agendas.length, lastUpdatedAt);
  const showLoading = status === "loading";
  const showError = status === "error" && agendas.length === 0;
  const showEmpty = !showLoading && !showError && agendas.length === 0;
  const showContent = agendas.length > 0 && activeAgenda != null && activeAgendaId != null;

  return (
    <Root className={className}>
      <Header>
        <Title>쟁점별 요약</Title>
        {meta?.kind === "badge" ? (
          <Badge variant="status" tone={meta.tone}>
            {meta.label}
          </Badge>
        ) : null}
        {meta?.kind === "updatedAt" ? <UpdatedAt>{meta.label}</UpdatedAt> : null}
      </Header>

      {showContent ? (
        <AgendaTabsSection
          agendas={agendas}
          activeId={activeAgendaId}
          onActiveIdChange={setSelectedAgendaId}
        />
      ) : null}

      <ScrollBody>
        {showLoading ? (
          <PlaceholderCenter>
            <LoadingState title="쟁점 분석 중" description="발화 내용을 분석하고 있습니다..." />
          </PlaceholderCenter>
        ) : null}

        {showError ? (
          <PlaceholderCenter>
            <EmptyState
              title="쟁점 요약을 불러오지 못했습니다"
              description={error?.message ?? "잠시 후 다시 시도해 주세요."}
            />
          </PlaceholderCenter>
        ) : null}

        {showEmpty ? (
          <PlaceholderCenter>
            <EmptyState
              icon={
                <EmptyIconSlot $size={theme.sizes.icon10}>
                  <NetworkIcon aria-hidden />
                </EmptyIconSlot>
              }
              title={ISSUE_SUMMARY_PANEL_ACTIVE_EMPTY.title}
              description={ISSUE_SUMMARY_PANEL_ACTIVE_EMPTY.description}
            />
          </PlaceholderCenter>
        ) : null}

        {showContent ? <AgendaSummaryView agenda={activeAgenda} /> : null}
      </ScrollBody>
    </Root>
  );
}

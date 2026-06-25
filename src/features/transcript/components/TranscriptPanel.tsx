import type { DebateSessionPhase } from "@/app/layouts/DebateSessionLayoutContext";
import { EmptyState, LoadingState } from "@/shared/ui/feedback";
import { Badge } from "@/shared/ui/badge";
import { MessageSquareIcon } from "@/shared/ui/icons";
import { theme } from "@/styles/theme";
import { useMemo } from "react";
import { groupSegmentsBySpeaker } from "../lib/groupSegmentsBySpeaker";
import {
  getTranscriptConnectionPresentation,
  shouldShowTranscriptConnectionBanner,
} from "../lib/transcriptConnectionPresentation";
import { useTranscriptPanelScroll } from "../hooks/useTranscriptPanelScroll";
import type { SttConnectionStatus } from "../hooks/useSttWebSocket";
import type { SttErrorData, TranscriptionSegment } from "../types/sttMessages";
import { TranscriptNewUtterancesButton } from "./TranscriptNewUtterancesButton";
import { TranscriptUtteranceCard } from "./TranscriptUtteranceCard";
import {
  ConnectionBanner,
  ConnectionBannerDescription,
  ConnectionBannerTitle,
  ContentArea,
  EmptyIconSlot,
  FloatingButtonWrapper,
  Header,
  NewUtterancesButtonSlot,
  PlaceholderCenter,
  Root,
  ScrollList,
  Title,
  UtteranceList,
} from "./TranscriptPanel.styles";

export type TranscriptPanelProps = {
  phase: DebateSessionPhase;
  segments: TranscriptionSegment[];
  sttStatus: SttConnectionStatus;
  lastError: SttErrorData | null;
  className?: string;
};

export function TranscriptPanel({ phase, segments, sttStatus, lastError, className }: TranscriptPanelProps) {
  const presentation = getTranscriptConnectionPresentation(sttStatus, phase, lastError);
  const showConnectionBanner = shouldShowTranscriptConnectionBanner(sttStatus, phase);
  const isConnecting = sttStatus === "connecting" || sttStatus === "ready";
  const showLoading = isConnecting && segments.length === 0;
  const showEmpty =
    !showLoading && segments.length === 0 && sttStatus !== "error" && phase === "active";
  const showError = sttStatus === "error" && segments.length === 0;
  const showPlaceholder = showLoading || showEmpty || showError;

  const utteranceGroups = useMemo(() => groupSegmentsBySpeaker(segments), [segments]);

  const contentRevision = useMemo(
    () => segments.map(segment => `${segment.id}:${segment.content}`).join("|"),
    [segments],
  );

  const { listRef, showNewUtterancesButton, handleScroll, scrollToBottom } = useTranscriptPanelScroll({
    itemCount: segments.length,
    contentRevision,
    enabled: !showPlaceholder,
  });

  return (
    <Root className={className}>
      <Header>
        <Title>실시간 속기록</Title>
        {presentation ? (
          <Badge variant="status" tone={presentation.badgeTone}>
            {presentation.badgeLabel}
          </Badge>
        ) : null}
      </Header>

      <ContentArea>
        {showConnectionBanner && presentation ? (
          <ConnectionBanner $tone={presentation.bannerTone} role="status" aria-live="polite">
            <ConnectionBannerTitle>{presentation.bannerTitle}</ConnectionBannerTitle>
            <ConnectionBannerDescription>{presentation.bannerDescription}</ConnectionBannerDescription>
          </ConnectionBanner>
        ) : null}

        <ScrollList ref={listRef} onScroll={handleScroll}>
          {showPlaceholder ? (
            <PlaceholderCenter>
              {showLoading ? (
                <LoadingState
                  title="속기록 연결 중"
                  description="STT 서버와 연결하고 있습니다..."
                />
              ) : null}
              {showError ? (
                <EmptyState
                  title="속기록 연결 실패"
                  description={lastError?.message ?? "STT 서버와 연결할 수 없습니다."}
                />
              ) : null}
              {showEmpty ? (
                <EmptyState
                  icon={
                    <EmptyIconSlot $size={theme.sizes.icon10}>
                      <MessageSquareIcon aria-hidden />
                    </EmptyIconSlot>
                  }
                  title="발화 대기 중"
                  description="토론이 시작되면 발화 내용이 실시간으로 표시됩니다."
                />
              ) : null}
            </PlaceholderCenter>
          ) : (
            <UtteranceList>
              {utteranceGroups.map(group => (
                <li key={group.id}>
                  <TranscriptUtteranceCard group={group} />
                </li>
              ))}
            </UtteranceList>
          )}
        </ScrollList>

        {showNewUtterancesButton && !showPlaceholder ? (
          <FloatingButtonWrapper>
            <NewUtterancesButtonSlot>
              <TranscriptNewUtterancesButton onClick={scrollToBottom} />
            </NewUtterancesButtonSlot>
          </FloatingButtonWrapper>
        ) : null}
      </ContentArea>
    </Root>
  );
}

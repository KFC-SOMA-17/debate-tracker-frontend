import type { SpeakerUtteranceGroup } from "../lib/groupSegmentsBySpeaker";
import { formatElapsedTime } from "../lib/formatElapsedTime";
import { Badge } from "@/shared/ui/badge";
import { Article, Content, Header, Time } from "./TranscriptUtteranceCard.styles";

export type TranscriptUtteranceCardProps = {
  group: SpeakerUtteranceGroup;
  className?: string;
};

export function TranscriptUtteranceCard({ group, className }: TranscriptUtteranceCardProps) {
  return (
    <Article className={className} aria-label={`${group.speaker} 발화`}>
      <Header>
        <Time dateTime={`PT${group.startAt}S`}>{formatElapsedTime(group.startAt)}</Time>
        <Badge variant="speaker" tone="muted">
          {group.speaker}
        </Badge>
      </Header>
      <Content>{group.content}</Content>
    </Article>
  );
}

import type { SpeakerUtteranceGroup } from "../lib/groupSegmentsBySpeaker";
import { formatElapsedTime } from "../lib/formatElapsedTime";
import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/lib/cn";

export type TranscriptUtteranceCardProps = {
  group: SpeakerUtteranceGroup;
  className?: string;
};

export function TranscriptUtteranceCard({ group, className }: TranscriptUtteranceCardProps) {
  return (
    <article
      className={cn("rounded-lg border border-border-default bg-bg-subtle px-4 py-3", className)}
      aria-label={`${group.speaker} 발화`}
    >
      <header className="mb-2 flex items-center gap-3">
        <time className="shrink-0 text-xs text-text-secondary" dateTime={`PT${group.startAt}S`}>
          {formatElapsedTime(group.startAt)}
        </time>
        <Badge variant="speaker" tone="muted">
          {group.speaker}
        </Badge>
      </header>
      <p className="text-sm leading-relaxed text-text-primary">{group.content}</p>
    </article>
  );
}

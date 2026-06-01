import { cn } from "@/shared/lib/cn";
import { DEBATE_TOPIC_MODAL_DESCRIPTION } from "../constants/debateTopic";

export type DebateTopicBannerProps = {
  /** 설정된 토론 주제. 없으면 placeholder 표시 */
  topic?: string | null;
  className?: string;
};

export function DebateTopicBanner({ topic, className }: DebateTopicBannerProps) {
  const hasTopic = Boolean(topic?.trim());
  const displayText = hasTopic ? topic!.trim() : DEBATE_TOPIC_MODAL_DESCRIPTION;

  return (
    <div
      className={cn(
        "mb-6 flex shrink-0 items-center justify-center gap-2 rounded-xl border border-accent-primary/20 bg-accent-primary/5 px-6 py-4",
        className
      )}
    >
      <span className="text-xs font-medium text-accent-primary">토론 주제</span>
      <span className={cn("text-base font-semibold", hasTopic ? "text-text-primary" : "text-text-secondary")}>
        {displayText}
      </span>
    </div>
  );
}

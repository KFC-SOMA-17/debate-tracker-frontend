import { DEBATE_TOPIC_MODAL_DESCRIPTION } from "../constants/debateTopic";
import { BannerBadge, BannerRoot, BannerTopic } from "./DebateTopicBanner.styles";

export type DebateTopicBannerProps = {
  /** 설정된 토론 주제. 없으면 placeholder 표시 */
  topic?: string | null;
  className?: string;
};

export function DebateTopicBanner({ topic, className }: DebateTopicBannerProps) {
  const hasTopic = Boolean(topic?.trim());
  const displayText = hasTopic ? topic!.trim() : DEBATE_TOPIC_MODAL_DESCRIPTION;

  return (
    <BannerRoot className={className}>
      <BannerBadge>토론 주제</BannerBadge>
      <BannerTopic $hasTopic={hasTopic}>{displayText}</BannerTopic>
    </BannerRoot>
  );
}

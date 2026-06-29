import type { TranscriptionSegment } from "../types/sttMessages";

export type SpeakerUtteranceGroup = {
  /** 그룹 대표 id (첫 segment id) */
  id: string;
  speaker: string;
  startAt: number;
  endAt: number;
  content: string;
};

export function groupSegmentsBySpeaker(segments: TranscriptionSegment[]): SpeakerUtteranceGroup[] {
  const groups: SpeakerUtteranceGroup[] = [];

  for (const segment of segments) {
    const last = groups[groups.length - 1];
    if (last?.speaker === segment.speaker) {
      last.endAt = segment.endAt;
      last.content = [last.content, segment.content].filter(Boolean).join(" ");
      continue;
    }

    groups.push({
      id: segment.id,
      speaker: segment.speaker,
      startAt: segment.startAt,
      endAt: segment.endAt,
      content: segment.content,
    });
  }

  return groups;
}

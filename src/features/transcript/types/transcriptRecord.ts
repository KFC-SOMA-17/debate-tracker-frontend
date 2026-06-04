import type { TranscriptionSegment } from "./sttMessages";

export type TranscriptSegmentsById = Record<string, TranscriptionSegment>;

export type TranscriptRecordState = {
  byId: TranscriptSegmentsById;
  order: string[];
};

export const initialTranscriptRecordState: TranscriptRecordState = {
  byId: {},
  order: [],
};

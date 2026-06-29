import type { TranscriptionSegment } from "../types/sttMessages";
import { initialTranscriptRecordState, type TranscriptRecordState } from "../types/transcriptRecord";

export type TranscriptRecordAction =
  | { type: "CLEAR" }
  | { type: "APPEND_TRANSCRIPTION"; segment: TranscriptionSegment }
  | { type: "UPSERT_REFINED"; segments: TranscriptionSegment[] };

export function transcriptRecordReducer(
  state: TranscriptRecordState,
  action: TranscriptRecordAction
): TranscriptRecordState {
  switch (action.type) {
    case "CLEAR":
      return initialTranscriptRecordState;
    case "APPEND_TRANSCRIPTION": {
      if (state.byId[action.segment.id]) {
        return state;
      }
      return {
        byId: { ...state.byId, [action.segment.id]: action.segment },
        order: [...state.order, action.segment.id],
      };
    }
    case "UPSERT_REFINED": {
      let nextById = state.byId;
      for (const segment of action.segments) {
        if (!state.byId[segment.id]) {
          continue;
        }
        nextById = { ...nextById, [segment.id]: segment };
      }
      return { ...state, byId: nextById };
    }
    default:
      return state;
  }
}

export function selectOrderedSegments(state: TranscriptRecordState): TranscriptionSegment[] {
  return state.order.map(id => state.byId[id]).filter((segment): segment is TranscriptionSegment => segment != null);
}

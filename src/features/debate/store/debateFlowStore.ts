import { create } from "zustand";

type DebateFlowState = {
  activeDebateId: string | null;
  activeDebateTopic: string | null;
  isSessionEnded: boolean;
  setActiveDebate: (debateId: string, topic?: string) => void;
  markSessionEnded: () => void;
};

export const useDebateFlowStore = create<DebateFlowState>(set => ({
  activeDebateId: null,
  activeDebateTopic: null,
  isSessionEnded: false,
  setActiveDebate: (debateId, topic) =>
    set(state => ({
      activeDebateId: debateId,
      activeDebateTopic:
        topic !== undefined ? (topic.trim() ? topic.trim() : null) : state.activeDebateTopic,
      isSessionEnded: false,
    })),
  markSessionEnded: () => set({ isSessionEnded: true }),
}));

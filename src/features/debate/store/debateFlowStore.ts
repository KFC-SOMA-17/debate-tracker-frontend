import { create } from "zustand";

type DebateFlowState = {
  activeDebateId: string | null;
  isSessionEnded: boolean;
  setActiveDebate: (debateId: string) => void;
  markSessionEnded: () => void;
};

export const useDebateFlowStore = create<DebateFlowState>(set => ({
  activeDebateId: null,
  isSessionEnded: false,
  setActiveDebate: debateId => set({ activeDebateId: debateId, isSessionEnded: false }),
  markSessionEnded: () => set({ isSessionEnded: true }),
}));

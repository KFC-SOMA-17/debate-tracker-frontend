import { create } from "zustand";

type UiState = {
  splitRatio: number;
  selectedIssueId: string | null;
  isMindmapOpen: boolean;
  activeSpeakerTab: string | null;
  setSplitRatio: (splitRatio: number) => void;
  setSelectedIssueId: (issueId: string | null) => void;
  setMindmapOpen: (open: boolean) => void;
  setActiveSpeakerTab: (tab: string | null) => void;
};

export const useUiStore = create<UiState>(set => ({
  splitRatio: 0.5,
  selectedIssueId: null,
  isMindmapOpen: false,
  activeSpeakerTab: null,
  setSplitRatio: splitRatio => set({ splitRatio }),
  setSelectedIssueId: selectedIssueId => set({ selectedIssueId }),
  setMindmapOpen: isMindmapOpen => set({ isMindmapOpen }),
  setActiveSpeakerTab: activeSpeakerTab => set({ activeSpeakerTab }),
}));

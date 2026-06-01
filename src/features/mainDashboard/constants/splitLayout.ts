import type { Layout } from "react-resizable-panels";

/** 메인 대시보드 split — 실측 후 숫자만 조정 */
export const SPLIT_PANEL_IDS = {
  transcript: "transcript",
  issueSummary: "issueSummary",
} as const;

export const SPLIT_GROUP_ID = "mainDashboardSplit";

/** 기본 split 비율 4:6 (좌:속기록, 우:쟁점 요약) */
export const SPLIT_DEFAULT_LAYOUT = {
  [SPLIT_PANEL_IDS.transcript]: 40,
  [SPLIT_PANEL_IDS.issueSummary]: 60,
} as const;

/**
 * collapse 트리거: 패널 너비가 Group 전체 너비의 이 비율(%) 미만이 되면 접힘.
 * react-resizable-panels `minSize`는 부모 Group 대비 값.
 */
export const SPLIT_COLLAPSE_THRESHOLD = "20%";

export const SPLIT_COLLAPSED_RAIL_PX = 52;

export function createDefaultSplitLayout(): Layout {
  return {
    [SPLIT_PANEL_IDS.transcript]: SPLIT_DEFAULT_LAYOUT[SPLIT_PANEL_IDS.transcript],
    [SPLIT_PANEL_IDS.issueSummary]: SPLIT_DEFAULT_LAYOUT[SPLIT_PANEL_IDS.issueSummary],
  };
}

export function getDefaultSplitRatio(): number {
  return SPLIT_DEFAULT_LAYOUT[SPLIT_PANEL_IDS.transcript] / 100;
}

export const DEBATE_NAV_IDS = {
  mainDashboard: "main-dashboard",
  teamAnalysis: "team-analysis",
  personalAnalysis: "personal-analysis",
} as const;

export type DebateNavId = (typeof DEBATE_NAV_IDS)[keyof typeof DEBATE_NAV_IDS];

/**
 * TODO: 분석 세션은 추후 토론 세션 상태에 따라 disabled 여부 결정
 */
export const DEBATE_NAV_ITEMS = [
  { id: DEBATE_NAV_IDS.mainDashboard, label: "메인 대시보드", disabled: false },
  { id: DEBATE_NAV_IDS.teamAnalysis, label: "팀별 분석", disabled: true },
  { id: DEBATE_NAV_IDS.personalAnalysis, label: "개인별 분석", disabled: true },
] as const;

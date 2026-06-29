import type { DebateSessionPhase } from "./DebateSessionLayoutContext";

export const DEBATE_NAV_IDS = {
  mainDashboard: "main-dashboard",
  teamAnalysis: "team-analysis",
  personalAnalysis: "personal-analysis",
} as const;

export type DebateNavId = (typeof DEBATE_NAV_IDS)[keyof typeof DEBATE_NAV_IDS];

export const DEBATE_NAV_ITEMS = (phase: DebateSessionPhase) => [
  { id: DEBATE_NAV_IDS.mainDashboard, label: "메인 대시보드", disabled: false },
  { id: DEBATE_NAV_IDS.teamAnalysis, label: "팀별 분석", disabled: phase !== "ended" },
  { id: DEBATE_NAV_IDS.personalAnalysis, label: "개인별 분석", disabled: phase !== "ended" },
];

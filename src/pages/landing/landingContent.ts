export interface LandingProblemItem {
  icon: string;
  title: string;
  description: string;
}

export const LANDING_PROBLEM_ITEMS: LandingProblemItem[] = [
  {
    icon: "📋",
    title: "체계적인 기록 부재",
    description:
      "토론 중 발화 내용을 동시에 기록하기 어렵고, 끝나면 어떤 주장이 오갔는지 기억에만 의존해야 합니다.",
  },
  {
    icon: "🔍",
    title: "논리 흐름 분석 불가",
    description:
      "어떤 쟁점이 핵심이었는지, 각 팀의 논리가 어떻게 전개되었는지 사후에 파악하기가 매우 어렵습니다.",
  },
  {
    icon: "💬",
    title: "구체적 피드백 부재",
    description:
      '범용 AI는 토론 맥락을 이해하지 못해 "더 논리적으로 말하세요" 수준의 모호한 피드백만 제공합니다.',
  },
];

export const LANDING_COMPARISON_ROWS: { feature: string; debateTracker: boolean; generalAi: boolean }[] = [
  { feature: "토론 구조화 기록", debateTracker: true, generalAi: false },
  { feature: "음성 실시간 분석", debateTracker: true, generalAi: false },
  { feature: "논리 흐름 추적", debateTracker: true, generalAi: false },
  { feature: "편향 감지", debateTracker: true, generalAi: false },
  { feature: "구체적 피드백", debateTracker: true, generalAi: false },
  { feature: "일반 텍스트 요약", debateTracker: true, generalAi: true },
];

export const LANDING_HERO_STATS = [
  { label: "실시간", description: "STT 음성 인식", tone: "primary" as const },
  { label: "AI 분석", description: "쟁점 자동 추출", tone: "accent" as const },
  { label: "즉각", description: "맞춤 피드백 제공", tone: "danger" as const },
];

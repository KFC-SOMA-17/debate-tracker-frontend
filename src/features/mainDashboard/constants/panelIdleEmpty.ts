export const TRANSCRIPT_PANEL_IDLE_EMPTY = {
  title: "토론 대기 중",
  description:
    "토론이 시작되면 발화 내용이 실시간으로 표시됩니다.\n우측 상단의 '토론 시작' 버튼을 눌러 토론을 시작하세요.",
} as const;

export const ISSUE_SUMMARY_PANEL_IDLE_EMPTY = {
  title: "쟁점별 요약 대기 중",
  description: "토론이 진행되면 발화 내용을 분석하여\n주요 쟁점과 찬반 주장이 자동으로 추출됩니다.",
} as const;

export const TRANSCRIPT_PANEL_ACTIVE_EMPTY = {
  title: "실시간 속기록",
  description: "STT 연동 후 발화 내용이 이 영역에 실시간으로 표시됩니다.",
} as const;

export const ISSUE_SUMMARY_PANEL_ACTIVE_EMPTY = {
  title: "쟁점별 요약",
  description: "토론이 진행되면 쟁점·주장·근거가 자동으로 구조화되어 표시됩니다.",
} as const;

import {
  LandingBarChartIcon,
  LandingMicIcon,
  LandingNetworkIcon,
} from "@/shared/ui/icons/landing";
import { LandingCardGrid, LandingFeatureCard, LandingSectionHeader } from "./LandingShared";

const FEATURE_ITEMS = [
  {
    icon: <LandingMicIcon className="size-5" aria-hidden />,
    title: "실시간 음성 속기록",
    description:
      "STT 기반 음성 인식으로 토론 발화를 실시간 자동 기록합니다. 발화자별, 시간순으로 정리된 속기록을 즉시 확인하세요.",
  },
  {
    icon: <LandingNetworkIcon className="size-5" aria-hidden />,
    title: "쟁점 자동 요약",
    description:
      "AI가 토론 내용을 분석해 핵심 쟁점을 실시간으로 추출하고, 찬반 주장의 논리 구조를 트리 형태로 시각화합니다.",
  },
  {
    icon: <LandingBarChartIcon className="size-5" aria-hidden />,
    title: "종합 분석 리포트",
    description:
      "토론 종료 후 팀별·개인별 발화 통계, 논리 강도, 반박 빈도를 분석한 맞춤형 피드백 리포트를 자동 생성합니다.",
  },
] as const;

export function LandingFeaturesSection() {
  return (
    <section className="bg-bg-subtle px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <LandingSectionHeader
          label="Features"
          title="핵심 기능"
          description="토론의 시작부터 끝까지 — 세 가지 핵심 기능으로 완성됩니다."
        />
        <LandingCardGrid>
          {FEATURE_ITEMS.map((item) => (
            <LandingFeatureCard key={item.title} {...item} />
          ))}
        </LandingCardGrid>
      </div>
    </section>
  );
}

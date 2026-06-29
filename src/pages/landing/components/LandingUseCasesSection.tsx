import { IconSlot } from "@/shared/ui/icons/IconSlot";
import {
  LandingBarChartIcon,
  LandingGlobeIcon,
  LandingUsersIcon,
} from "@/shared/ui/icons/landing";
import { theme } from "@/styles/theme";
import { LandingCardGrid, LandingFeatureCard } from "./LandingShared";
import { UseCasesInner, UseCasesSection, UseCasesTitle } from "./LandingUseCasesSection.styles";

const USE_CASE_ITEMS = [
  {
    icon: (
      <IconSlot $size={theme.sizes.icon5}>
        <LandingUsersIcon aria-hidden />
      </IconSlot>
    ),
    title: "팀 토론 연습",
    description:
      "찬반 팀이 나뉘어 주제를 놓고 토론할 때, 발화 기록과 논리 분석을 통해 팀 전략을 개선합니다.",
  },
  {
    icon: (
      <IconSlot $size={theme.sizes.icon5}>
        <LandingGlobeIcon aria-hidden />
      </IconSlot>
    ),
    title: "수업·세미나",
    description:
      "강의실이나 세미나에서 학생들의 토론 참여도를 실시간으로 추적하고 공정한 피드백을 제공합니다.",
  },
  {
    icon: (
      <IconSlot $size={theme.sizes.icon5}>
        <LandingBarChartIcon aria-hidden />
      </IconSlot>
    ),
    title: "개인 역량 향상",
    description:
      "발화 빈도, 논리 강도, 반박 능력 지표를 통해 본인의 토론 약점을 파악하고 집중적으로 개선합니다.",
  },
] as const;

export function LandingUseCasesSection() {
  return (
    <UseCasesSection>
      <UseCasesInner>
        <UseCasesTitle>이런 상황에서 사용하세요</UseCasesTitle>
        <LandingCardGrid>
          {USE_CASE_ITEMS.map((item) => (
            <LandingFeatureCard key={item.title} {...item} />
          ))}
        </LandingCardGrid>
      </UseCasesInner>
    </UseCasesSection>
  );
}

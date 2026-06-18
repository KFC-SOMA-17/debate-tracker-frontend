import { ArrowRightIcon } from "@/shared/ui/icons";
import { IconSlot } from "@/shared/ui/icons/IconSlot";
import { theme } from "@/styles/theme";
import { LANDING_HERO_STATS } from "../landingContent";
import { LandingHeroCtaButton } from "./LandingShared.styles";
import {
  HeroBadge,
  HeroBadgeDot,
  HeroBadgeText,
  HeroBlob,
  HeroCtaWrapper,
  HeroDescription,
  HeroInner,
  HeroSection,
  HeroStatDescription,
  HeroStatItem,
  HeroStatLabel,
  HeroStatsGrid,
  HeroStatsSection,
  HeroTitle,
  HeroTitleAccent,
} from "./LandingHeroSection.styles";

interface LandingHeroSectionProps {
  onStartDebate: () => void;
}

export function LandingHeroSection({ onStartDebate }: LandingHeroSectionProps) {
  return (
    <HeroSection>
      <HeroBlob $position="left" aria-hidden />
      <HeroBlob $position="right" aria-hidden />

      <HeroInner>
        <HeroBadge>
          <HeroBadgeDot aria-hidden />
          <HeroBadgeText>AI 기반 토론 실시간 분석 서비스</HeroBadgeText>
        </HeroBadge>

        <HeroTitle>
          토론의 모든 순간을
          <br />
          <HeroTitleAccent>기록하고 분석합니다</HeroTitleAccent>
        </HeroTitle>

        <HeroDescription>
          실시간 음성 속기록부터 쟁점 요약, 개인 피드백까지 — Debate Tracker는 토론의 전 과정을 AI로 분석해
          당신의 논리력을 한 단계 끌어올립니다.
        </HeroDescription>

        <HeroCtaWrapper>
          <LandingHeroCtaButton
            type="button"
            variant="primary"
            size="lg"
            rightIcon={
              <IconSlot $size={theme.sizes.icon4}>
                <ArrowRightIcon aria-hidden />
              </IconSlot>
            }
            onClick={onStartDebate}
          >
            지금 바로 토론 시작하기
          </LandingHeroCtaButton>
        </HeroCtaWrapper>

        <HeroStatsSection>
          <HeroStatsGrid>
            {LANDING_HERO_STATS.map((stat) => (
              <HeroStatItem key={stat.label}>
                <HeroStatLabel $tone={stat.tone}>{stat.label}</HeroStatLabel>
                <HeroStatDescription>{stat.description}</HeroStatDescription>
              </HeroStatItem>
            ))}
          </HeroStatsGrid>
        </HeroStatsSection>
      </HeroInner>
    </HeroSection>
  );
}

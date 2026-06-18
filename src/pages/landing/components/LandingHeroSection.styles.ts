import styled from "@emotion/styled";
import { heroTitleAccent } from "@/styles/mixins";

export const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => `${theme.spacing[24]} ${theme.spacing[6]}`};
  background: ${({ theme }) => theme.colors.landing.heroGradient};
`;

export const HeroBlob = styled.div<{ $position: "left" | "right" }>`
  pointer-events: none;
  position: absolute;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.accent.primarySubtle};
  filter: blur(64px);

  ${({ $position }) =>
    $position === "left"
      ? `
    top: -8rem;
    left: -8rem;
    width: 24rem;
    height: 24rem;
  `
      : `
    top: 24rem;
    right: 0;
    width: 20rem;
    height: 20rem;
  `}
`;

export const HeroInner = styled.div`
  position: relative;
  margin: 0 auto;
  display: flex;
  max-width: 56rem;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.accent.primarySubtle};
  background-color: ${({ theme }) => theme.colors.accent.primaryMuted};
  padding: 0.375rem ${({ theme }) => theme.spacing[4]};
`;

export const HeroBadgeDot = styled.span`
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.accent.primary};
`;

export const HeroBadgeText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.accent.primary};
`;

export const HeroTitle = styled.h1`
  margin-top: ${({ theme }) => theme.spacing[4]};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes["5xl"]};
  line-height: ${({ theme }) => theme.colors.landing.heroTitleLineHeight};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const HeroTitleAccent = styled.span`
  ${heroTitleAccent}
`;

export const HeroDescription = styled.p`
  margin-top: ${({ theme }) => theme.spacing[6]};
  max-width: 42rem;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.colors.landing.heroBodyLineHeight};
  color: ${({ theme }) => theme.colors.text.muted};
`;

export const HeroCtaWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing[10]};
`;

export const HeroStatsSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing[16]};
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.border.subtle};
  padding-top: ${({ theme }) => theme.spacing[10]};
`;

export const HeroStatsGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[8]};

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const HeroStatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
`;

export const HeroStatLabel = styled.p<{ $tone: "primary" | "accent" | "danger" }>`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ $tone, theme }) => {
    if ($tone === "primary") return theme.colors.accent.secondary;
    if ($tone === "accent") return theme.colors.accent.primary;
    return theme.colors.status.danger;
  }};
`;

export const HeroStatDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
`;

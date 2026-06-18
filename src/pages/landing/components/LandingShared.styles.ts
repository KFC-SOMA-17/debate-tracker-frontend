import styled from "@emotion/styled";
import { Button } from "@/shared/ui/button";

export const LandingHeroCtaButton = styled(Button)`
  height: 3.5rem;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radii.landingCta};
  padding-left: ${({ theme }) => theme.spacing[8]};
  padding-right: ${({ theme }) => theme.spacing[8]};
  box-shadow: ${({ theme }) => theme.shadows.landingCta};
`;

export const SectionHeaderRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const SectionLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent.primary};
`;

export const SectionTitle = styled.h2<{ $hasLabel?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  line-height: 2.25rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};

  ${({ $hasLabel, theme }) => $hasLabel && `margin-top: ${theme.spacing[4]};`}
`;

export const SectionDescription = styled.p`
  margin-top: ${({ theme }) => theme.spacing[4]};
  max-width: 36rem;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.muted};
`;

export const InfoCard = styled.article<{ $variant: "muted" | "elevated" }>`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  padding: ${({ theme }) => theme.spacing[6]};

  ${({ $variant, theme }) =>
    $variant === "muted"
      ? `
    border: 1px solid ${theme.colors.border.subtle};
    background-color: ${theme.colors.bg.subtle};
  `
      : `
    border: 1px solid ${theme.colors.border.default};
    background-color: ${theme.colors.bg.elevated};
    box-shadow: ${theme.shadows.sm};
  `}
`;

export const InfoCardIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  line-height: 2.25rem;
`;

export const InfoCardTitle = styled.h3`
  margin-top: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const InfoCardDescription = styled.p`
  margin-top: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.muted};
`;

export const FeatureCard = styled.article`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.bg.elevated};
  padding: ${({ theme }) => theme.spacing[6]};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const FeatureIconBox = styled.div`
  display: flex;
  width: 2.75rem;
  height: 2.75rem;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.landingCta};
  background-color: ${({ theme }) => theme.colors.accent.primarySubtle};
  color: ${({ theme }) => theme.colors.accent.primary};
`;

export const FeatureTitle = styled.h3`
  margin-top: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const FeatureDescription = styled.p`
  margin-top: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.muted};
`;

export const CardGrid = styled.div`
  margin-top: 3.5rem;
  display: grid;
  gap: ${({ theme }) => theme.spacing[6]};

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

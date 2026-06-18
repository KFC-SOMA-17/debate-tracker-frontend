import type { ReactNode } from "react";
import {
  CardGrid,
  FeatureCard,
  FeatureDescription,
  FeatureIconBox,
  FeatureTitle,
  InfoCard,
  InfoCardDescription,
  InfoCardIcon,
  InfoCardTitle,
  SectionDescription,
  SectionHeaderRoot,
  SectionLabel,
  SectionTitle,
} from "./LandingShared.styles";

interface LandingSectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
}

export function LandingSectionHeader({ label, title, description, className }: LandingSectionHeaderProps) {
  return (
    <SectionHeaderRoot className={className}>
      {label ? <SectionLabel>{label}</SectionLabel> : null}
      <SectionTitle $hasLabel={Boolean(label)}>{title}</SectionTitle>
      {description ? <SectionDescription>{description}</SectionDescription> : null}
    </SectionHeaderRoot>
  );
}

interface LandingInfoCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  variant?: "muted" | "elevated";
}

export function LandingInfoCard({ icon, title, description, variant = "elevated" }: LandingInfoCardProps) {
  return (
    <InfoCard $variant={variant}>
      <InfoCardIcon>{icon}</InfoCardIcon>
      <InfoCardTitle>{title}</InfoCardTitle>
      <InfoCardDescription>{description}</InfoCardDescription>
    </InfoCard>
  );
}

interface LandingFeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function LandingFeatureCard({ icon, title, description }: LandingFeatureCardProps) {
  return (
    <FeatureCard>
      <FeatureIconBox>{icon}</FeatureIconBox>
      <FeatureTitle>{title}</FeatureTitle>
      <FeatureDescription>{description}</FeatureDescription>
    </FeatureCard>
  );
}

interface LandingCardGridProps {
  children: ReactNode;
  className?: string;
}

export function LandingCardGrid({ children, className }: LandingCardGridProps) {
  return <CardGrid className={className}>{children}</CardGrid>;
}

import { ArrowRightIcon, LogoIcon } from "@/shared/ui/icons";
import { IconSlot } from "@/shared/ui/icons/IconSlot";
import { theme } from "@/styles/theme";
import { LandingHeroCtaButton } from "./LandingShared.styles";
import { CtaButtonWrapper, CtaDescription, CtaInner, CtaSection, CtaTitle } from "./LandingCtaSection.styles";

interface LandingCtaSectionProps {
  onStartDebate: () => void;
}

export function LandingCtaSection({ onStartDebate }: LandingCtaSectionProps) {
  return (
    <CtaSection>
      <CtaInner>
        <IconSlot $size={theme.sizes.icon16}>
          <LogoIcon aria-hidden />
        </IconSlot>
        <CtaTitle>지금 바로 첫 토론을 시작해보세요</CtaTitle>
        <CtaDescription>주제를 입력하는 것만으로 충분합니다. 나머지는 Debate Tracker가 해결합니다.</CtaDescription>
        <CtaButtonWrapper>
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
            토론 시작하기
          </LandingHeroCtaButton>
        </CtaButtonWrapper>
      </CtaInner>
    </CtaSection>
  );
}

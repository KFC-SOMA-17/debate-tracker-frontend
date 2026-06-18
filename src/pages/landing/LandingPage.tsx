import { useNavigate } from "react-router-dom";
import { DEBATE_ROUTES } from "@/app/router";
import { useActiveDebateRedirect } from "@/features/debate/hooks/useActiveDebateRedirect";
import { Button } from "@/shared/ui/button";
import { AppHeader, HeaderBrand } from "@/shared/ui/header";
import { IconSlot } from "@/shared/ui/icons/IconSlot";
import { LandingArrowRightIcon } from "@/shared/ui/icons/landing";
import { theme } from "@/styles/theme";
import { LandingComparisonSection } from "./components/LandingComparisonSection";
import { LandingCtaSection } from "./components/LandingCtaSection";
import { LandingFeaturesSection } from "./components/LandingFeaturesSection";
import { LandingFooter } from "./components/LandingFooter";
import { LandingHeroSection } from "./components/LandingHeroSection";
import { LandingProblemSection } from "./components/LandingProblemSection";
import { LandingUseCasesSection } from "./components/LandingUseCasesSection";
import { MainContent, PageRoot } from "./LandingPage.styles";

export function LandingPage() {
  const navigate = useNavigate();
  useActiveDebateRedirect();

  const goToSetup = () => navigate(DEBATE_ROUTES.setup);

  return (
    <PageRoot>
      <AppHeader
        brand={<HeaderBrand />}
        trailing={
          <Button
            type="button"
            variant="primary"
            size="md"
            rightIcon={
              <IconSlot $size={theme.sizes.icon3_5}>
                <LandingArrowRightIcon aria-hidden />
              </IconSlot>
            }
            onClick={goToSetup}
          >
            토론 시작
          </Button>
        }
      />
      <MainContent>
        <LandingHeroSection onStartDebate={goToSetup} />
        <LandingProblemSection />
        <LandingFeaturesSection />
        <LandingComparisonSection />
        <LandingUseCasesSection />
        <LandingCtaSection onStartDebate={goToSetup} />
        <LandingFooter />
      </MainContent>
    </PageRoot>
  );
}

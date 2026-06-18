import { useNavigate } from "react-router-dom";
import { DEBATE_ROUTES } from "@/app/router";
import { useActiveDebateRedirect } from "@/features/debate/hooks/useActiveDebateRedirect";
import { Button } from "@/shared/ui/button";
import { AppHeader, HeaderBrand } from "@/shared/ui/header";
import { LandingArrowRightIcon } from "@/shared/ui/icons/landing";
import { LandingComparisonSection } from "./components/LandingComparisonSection";
import { LandingCtaSection } from "./components/LandingCtaSection";
import { LandingFeaturesSection } from "./components/LandingFeaturesSection";
import { LandingFooter } from "./components/LandingFooter";
import { LandingHeroSection } from "./components/LandingHeroSection";
import { LandingProblemSection } from "./components/LandingProblemSection";
import { LandingUseCasesSection } from "./components/LandingUseCasesSection";

export function LandingPage() {
  const navigate = useNavigate();
  useActiveDebateRedirect();

  const goToSetup = () => navigate(DEBATE_ROUTES.setup);

  return (
    <div className="flex h-screen max-h-screen flex-col overflow-hidden bg-bg-default">
      <AppHeader
        brand={<HeaderBrand />}
        trailing={
          <Button
            type="button"
            variant="primary"
            size="md"
            className="cursor-pointer"
            rightIcon={<LandingArrowRightIcon className="size-3.5" aria-hidden />}
            onClick={goToSetup}
          >
            토론 시작
          </Button>
        }
      />
      <main className="min-h-0 flex-1 overflow-y-auto scrollbar-hidden">
        <LandingHeroSection onStartDebate={goToSetup} />
        <LandingProblemSection />
        <LandingFeaturesSection />
        <LandingComparisonSection />
        <LandingUseCasesSection />
        <LandingCtaSection onStartDebate={goToSetup} />
        <LandingFooter />
      </main>
    </div>
  );
}

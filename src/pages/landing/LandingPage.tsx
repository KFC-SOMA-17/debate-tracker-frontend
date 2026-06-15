import { useNavigate } from "react-router-dom";
import { DEBATE_ROUTES } from "@/app/router";
import { useActiveDebateRedirect } from "@/features/debate/hooks/useActiveDebateRedirect";
import { Button } from "@/shared/ui/button";
import { AppHeader, HeaderBrand } from "@/shared/ui/header";

export function LandingPage() {
  const navigate = useNavigate();
  useActiveDebateRedirect();

  return (
    <div className="flex h-screen max-h-screen flex-col overflow-hidden bg-bg-subtle">
      <AppHeader brand={<HeaderBrand />} />
      <main className="flex min-h-0 flex-1 items-center justify-center">
        <Button type="button" variant="primary" size="md" onClick={() => navigate(DEBATE_ROUTES.setup)}>
          토론 시작
        </Button>
      </main>
    </div>
  );
}

import { useState } from "react";
import { DebateSessionLayout } from "@/app/layouts/DebateSessionLayout";
import type { DebateSessionPhase } from "@/app/layouts/DebateSessionLayoutContext";
import { MainDashboardPagePlaceholder } from "@/pages/main-dashboard/MainDashboardPagePlaceholder";

export default function App() {
  const [phase, setPhase] = useState<DebateSessionPhase>("idle");

  return (
    <DebateSessionLayout
      phase={phase}
      topic={phase !== "idle" ? "나의 토론 주제" : undefined}
      elapsedLabel="24:18"
      onStartDebate={() => setPhase("active")}
      onEndDebate={() => setPhase("ended")}
    >
      <MainDashboardPagePlaceholder />
    </DebateSessionLayout>
  );
}

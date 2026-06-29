import { createBrowserRouter, Navigate } from "react-router-dom";
import { DebateSessionLayout } from "@/app/layouts/DebateSessionLayout";
import { DebateSetupPage } from "@/pages/debateSetup/DebateSetupPage";
import { LandingPage } from "@/pages/landing/LandingPage";
import { MainDashboardPage } from "@/pages/mainDashboard/MainDashboardPage";

export const DEBATE_ROUTES = {
  home: "/",
  setup: "/setup",
  session: (debateId: string) => `/debates/${debateId}`,
} as const;

export const DEBATE_SESSION_MATCH = "/debates/:debateId" as const;

export const router = createBrowserRouter([
  { path: DEBATE_ROUTES.home, element: <LandingPage /> },
  { path: DEBATE_ROUTES.setup, element: <DebateSetupPage /> },
  {
    path: DEBATE_SESSION_MATCH,
    element: <DebateSessionLayout />,
    children: [{ index: true, element: <MainDashboardPage /> }],
  },
  { path: "*", element: <Navigate to={DEBATE_ROUTES.home} replace /> },
]);

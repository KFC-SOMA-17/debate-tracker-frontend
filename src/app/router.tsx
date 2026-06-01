import { createBrowserRouter, Navigate } from "react-router-dom";
import { DebateSessionLayout } from "@/app/layouts/DebateSessionLayout";
import { MainDashboardPage } from "@/pages/mainDashboard/MainDashboardPage";

export const DEBATE_ROUTES = {
  home: "/",
  session: (debateId: string) => `/debates/${debateId}`,
} as const;

export const DEBATE_SESSION_MATCH = "/debates/:debateId" as const;

export const router = createBrowserRouter([
  {
    path: DEBATE_ROUTES.home,
    element: <DebateSessionLayout />,
    children: [
      { index: true, element: <MainDashboardPage /> },
      { path: "debates/:debateId", element: <MainDashboardPage /> },
    ],
  },
  { path: "*", element: <Navigate to={DEBATE_ROUTES.home} replace /> },
]);

import { DebateTopicBanner } from "@/features/mainDashboard/components/DebateTopicBanner";
import { MainDashboardSplitView } from "@/features/mainDashboard/components/MainDashboardSplitView";
import { useDebateSessionLayout } from "@/app/layouts/DebateSessionLayoutContext";
import {
  PageDescription,
  PageHeader,
  PageRoot,
  PageTitle,
  SplitPanelContainer,
  SplitViewWrapper,
} from "./MainDashboardPage.styles";

export function MainDashboardPage() {
  const { debateTopic } = useDebateSessionLayout();

  return (
    <PageRoot>
      <PageHeader>
        <PageTitle>메인 대시보드</PageTitle>
        <PageDescription>실시간 속기록과 쟁점별 요약을 함께 확인합니다.</PageDescription>
      </PageHeader>

      <DebateTopicBanner topic={debateTopic} />

      <SplitPanelContainer>
        <SplitViewWrapper>
          <MainDashboardSplitView />
        </SplitViewWrapper>
      </SplitPanelContainer>
    </PageRoot>
  );
}

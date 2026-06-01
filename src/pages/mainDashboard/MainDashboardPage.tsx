import { DebateTopicBanner } from "@/features/mainDashboard/components/DebateTopicBanner";
import { MainDashboardSplitView } from "@/features/mainDashboard/components/MainDashboardSplitView";
import { useDebateSessionLayout } from "@/app/layouts/DebateSessionLayoutContext";

export function MainDashboardPage() {
  const { debateTopic } = useDebateSessionLayout();

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-8 py-6">
      <div className="mb-6 flex shrink-0 flex-col gap-1">
        <h1 className="text-xl font-medium text-text-primary">메인 대시보드</h1>
        <p className="text-sm text-text-secondary">실시간 속기록과 쟁점별 요약을 함께 확인합니다.</p>
      </div>

      <DebateTopicBanner topic={debateTopic} />

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border-default bg-bg-default p-px shadow-sm">
        <MainDashboardSplitView className="h-full min-h-128" />
      </div>
    </div>
  );
}

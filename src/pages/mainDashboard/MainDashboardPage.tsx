import { useParams } from "react-router-dom";

/**
 * 메인 대시보드 페이지. 4단계에서 split view·모달·mock 데이터로 확장.
 */
export function MainDashboardPage() {
  const { debateId } = useParams<{ debateId?: string }>();

  return (
    <div className="flex flex-1 flex-col overflow-auto px-8 py-6">
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-xl font-medium text-text-primary">메인 대시보드</h1>
        <p className="text-sm text-text-secondary">실시간 속기록과 쟁점별 요약을 함께 확인합니다.</p>
      </div>
      {debateId ? (
        <p className="text-sm text-text-muted">
          토론 세션 ID: <code className="font-code text-text-secondary">{debateId}</code> (mock — API 연동 전)
        </p>
      ) : (
        <p className="text-sm text-text-muted">본문(토론 주제 배너·split view)은 이후 단계에서 구현합니다.</p>
      )}
    </div>
  );
}

import { useActiveDebateRedirect } from "@/features/debate/hooks/useActiveDebateRedirect";
import { useDebateSetup } from "@/features/debateSetup/hooks/useDebateSetup";
import { DEBATE_TOPIC_PLACEHOLDER } from "@/features/mainDashboard/constants/debateTopic";
import { Button } from "@/shared/ui/button";
import { AppHeader, HeaderBrand } from "@/shared/ui/header";
import { Input } from "@/shared/ui/input";

export function DebateSetupPage() {
  useActiveDebateRedirect();

  const { topicInput, setTopicInput, canSubmit, isSubmitting, error, cancel, confirmStartDebate } = useDebateSetup();

  return (
    <div className="flex h-screen max-h-screen flex-col overflow-hidden bg-bg-subtle">
      <AppHeader brand={<HeaderBrand />} />
      <main className="flex min-h-0 flex-1 flex-col items-center justify-center px-8 py-6">
        <div className="w-full max-w-md rounded-xl border border-border-default bg-bg-elevated p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-1">
            <h1 className="text-lg font-medium text-text-primary">토론 주제 입력</h1>
            <p className="text-sm text-text-secondary">토론을 시작하기 전에 주제를 입력해주세요</p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="debate-topic-input" className="text-sm font-medium text-text-primary">
              토론 주제
            </label>
            <Input
              id="debate-topic-input"
              value={topicInput}
              onChange={event => setTopicInput(event.target.value)}
              placeholder={DEBATE_TOPIC_PLACEHOLDER}
              disabled={isSubmitting}
            />
            <p className="text-xs text-text-secondary">찬성과 반대 의견이 나뉠 수 있는 명확한 주제를 입력하세요</p>
            {error ? <p className="text-xs text-status-danger">{error}</p> : null}
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button type="button" variant="secondary" disabled={isSubmitting} onClick={cancel}>
              취소
            </Button>
            <Button type="button" disabled={!canSubmit} onClick={() => void confirmStartDebate()}>
              {isSubmitting ? "시작 중..." : "토론 시작"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

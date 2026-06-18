import { SETUP_TOPIC_PLACEHOLDER } from "@/features/debateSetup/constants/setupSteps";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { SetupStepCard } from "./SetupStepCard";

interface SetupTopicStepProps {
  topicInput: string;
  onTopicInputChange: (value: string) => void;
  canGoNext: boolean;
  isSubmitting: boolean;
  error: string | null;
  onCancel: () => void;
  onNext: () => void;
}

export function SetupTopicStep({
  topicInput,
  onTopicInputChange,
  canGoNext,
  isSubmitting,
  error,
  onCancel,
  onNext,
}: SetupTopicStepProps) {
  return (
    <SetupStepCard
      header={
        <div className="flex flex-col gap-1.5">
          <h1 className="text-xl font-bold text-text-primary">토론 주제를 입력해주세요</h1>
          <p className="text-sm text-text-muted">
            찬성과 반대 의견이 명확히 나뉘는 주제일수록 더 풍부한 분석이 가능합니다.
          </p>
        </div>
      }
      footer={
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" className="cursor-pointer" disabled={isSubmitting} onClick={onCancel}>
            취소
          </Button>
          <Button
            type="button"
            className="cursor-pointer"
            disabled={!canGoNext}
            onClick={onNext}
          >
            다음
          </Button>
        </div>
      }
    >
      <div className="px-8 py-6">
        <label htmlFor="debate-topic-input" className="text-sm font-medium text-text-primary">
          토론 주제
        </label>
        <Input
          id="debate-topic-input"
          value={topicInput}
          onChange={event => onTopicInputChange(event.target.value)}
          placeholder={SETUP_TOPIC_PLACEHOLDER}
          disabled={isSubmitting}
          className="mt-2 h-[3.375rem] rounded-[0.875rem] text-base"
        />
        {error ? <p className="mt-2 text-xs text-status-danger">{error}</p> : null}
      </div>
    </SetupStepCard>
  );
}

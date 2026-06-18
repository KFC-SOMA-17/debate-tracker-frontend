import { SETUP_TOPIC_PLACEHOLDER } from "@/features/debateSetup/constants/setupSteps";
import { SetupStepCard } from "./SetupStepCard";
import {
  ActionButton,
  Description,
  ErrorText,
  FieldLabel,
  FooterActions,
  FormSection,
  HeaderBlock,
  Title,
  TopicInput,
} from "./SetupTopicStep.styles";

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
        <HeaderBlock>
          <Title>토론 주제를 입력해주세요</Title>
          <Description>찬성과 반대 의견이 명확히 나뉘는 주제일수록 더 풍부한 분석이 가능합니다.</Description>
        </HeaderBlock>
      }
      footer={
        <FooterActions>
          <ActionButton type="button" variant="secondary" disabled={isSubmitting} onClick={onCancel}>
            취소
          </ActionButton>
          <ActionButton type="button" disabled={!canGoNext} onClick={onNext}>
            다음
          </ActionButton>
        </FooterActions>
      }
    >
      <FormSection>
        <FieldLabel htmlFor="debate-topic-input">토론 주제</FieldLabel>
        <TopicInput
          id="debate-topic-input"
          value={topicInput}
          onChange={event => onTopicInputChange(event.target.value)}
          placeholder={SETUP_TOPIC_PLACEHOLDER}
          disabled={isSubmitting}
        />
        {error ? <ErrorText>{error}</ErrorText> : null}
      </FormSection>
    </SetupStepCard>
  );
}

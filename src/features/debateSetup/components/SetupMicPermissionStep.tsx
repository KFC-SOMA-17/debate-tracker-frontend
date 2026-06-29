import type { MicPermissionState } from "@/features/audioCapture/types/audioCapture";
import { SetupMicLargeIcon, SetupMicSmallIcon, SetupPlaySmallIcon } from "@/shared/ui/icons/setup";
import { theme } from "@/styles/theme";
import { SetupStepCard } from "./SetupStepCard";
import {
  ActionButton,
  Content,
  Description,
  ErrorText,
  FooterBar,
  GuideText,
  HeaderBlock,
  MicGrantButton,
  MicIconCircle,
  MicIconSlot,
  SmallIconSlot,
  SuccessText,
  Title,
} from "./SetupMicPermissionStep.styles";

interface SetupMicPermissionStepProps {
  micPermission: MicPermissionState;
  micErrorMessage: string | null;
  isRequestingMic: boolean;
  canStartDebate: boolean;
  isSubmitting: boolean;
  error: string | null;
  onPrevious: () => void;
  onRequestMicPermission: () => void;
  onStartDebate: () => void;
}

export function SetupMicPermissionStep({
  micPermission,
  micErrorMessage,
  isRequestingMic,
  canStartDebate,
  isSubmitting,
  error,
  onPrevious,
  onRequestMicPermission,
  onStartDebate,
}: SetupMicPermissionStepProps) {
  const showMicAction = micPermission !== "granted";

  return (
    <SetupStepCard
      header={
        <HeaderBlock>
          <Title>마이크 권한을 허용해주세요</Title>
          <Description>음성 인식을 위해 마이크 접근 권한이 필요합니다.</Description>
        </HeaderBlock>
      }
      footer={
        <FooterBar>
          <ActionButton type="button" variant="secondary" disabled={isSubmitting} onClick={onPrevious}>
            이전
          </ActionButton>
          <ActionButton
            type="button"
            disabled={!canStartDebate}
            loading={isSubmitting}
            rightIcon={
              !isSubmitting ? (
                <SmallIconSlot $size={theme.sizes.icon4}>
                  <SetupPlaySmallIcon aria-hidden />
                </SmallIconSlot>
              ) : undefined
            }
            onClick={() => void onStartDebate()}
          >
            {isSubmitting ? "시작 중..." : "토론 시작"}
          </ActionButton>
        </FooterBar>
      }
    >
      <Content>
        <MicIconCircle>
          <MicIconSlot $size="2.25rem">
            <SetupMicLargeIcon aria-hidden />
          </MicIconSlot>
        </MicIconCircle>
        <GuideText>
          브라우저의 마이크 권한 허용 후에
          <br />
          아래 버튼을 눌러주세요.
        </GuideText>
        {showMicAction ? (
          <MicGrantButton
            type="button"
            variant="secondary"
            loading={isRequestingMic}
            leftIcon={
              !isRequestingMic ? (
                <SmallIconSlot $size={theme.sizes.icon4}>
                  <SetupMicSmallIcon aria-hidden />
                </SmallIconSlot>
              ) : undefined
            }
            onClick={() => void onRequestMicPermission()}
          >
            권한을 허용했습니다
          </MicGrantButton>
        ) : (
          <SuccessText>마이크 권한이 허용되었습니다.</SuccessText>
        )}
        {micErrorMessage ? <ErrorText>{micErrorMessage}</ErrorText> : null}
        {error ? <ErrorText>{error}</ErrorText> : null}
      </Content>
    </SetupStepCard>
  );
}

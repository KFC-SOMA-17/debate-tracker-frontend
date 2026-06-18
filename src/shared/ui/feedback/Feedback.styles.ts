import styled from "@emotion/styled";

export const FeedbackRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing[12]} ${theme.spacing[6]}`};
  text-align: center;
`;

export const FeedbackIconSlot = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text.muted};
`;

export const FeedbackTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const FeedbackDescription = styled.p`
  margin-top: ${({ theme }) => theme.spacing[2]};
  max-width: 28rem;
  white-space: pre-line;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const FeedbackAction = styled.div`
  margin-top: ${({ theme }) => theme.spacing[4]};
`;

export const ErrorIconSlot = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.status.danger};
`;

export const ErrorTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ErrorDescription = styled.p`
  margin-top: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const LoadingSpinner = styled.span`
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  width: ${({ theme }) => theme.sizes.icon12};
  height: ${({ theme }) => theme.sizes.icon12};
  animation: feedback-spin 1s linear infinite;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.border.default};
  border-top-color: ${({ theme }) => theme.colors.accent.primary};

  @keyframes feedback-spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const LoadingDescription = styled.p`
  margin-top: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

import styled from "@emotion/styled";
import { Button } from "@/shared/ui/button";
import { IconSlot } from "@/shared/ui/icons/IconSlot";

export const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
`;

export const FooterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => theme.spacing[10]} ${({ theme }) => theme.spacing[8]};
  text-align: center;
`;

export const MicIconCircle = styled.div`
  display: flex;
  width: ${({ theme }) => theme.spacing[20]};
  height: ${({ theme }) => theme.spacing[20]};
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.accent.primaryMuted};
`;

export const MicIconSlot = styled(IconSlot)`
  color: inherit;
`;

export const GuideText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.bodySm};
  color: ${({ theme }) => theme.colors.text.muted};
`;

export const MicGrantButton = styled(Button)`
  cursor: pointer;
  border-color: ${({ theme }) => theme.colors.accent.primary};
  color: ${({ theme }) => theme.colors.accent.primary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent.primaryMuted};
  }
`;

export const SuccessText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.status.success};
`;

export const ErrorText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.status.danger};
`;

export const ActionButton = styled(Button)`
  cursor: pointer;
`;

export const SmallIconSlot = styled(IconSlot)`
  color: inherit;
`;

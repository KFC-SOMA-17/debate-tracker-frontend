import styled from "@emotion/styled";
import { IconSlot } from "@/shared/ui/icons/IconSlot";
import { hideScrollbar } from "@/styles/mixins";

export const Root = styled.div`
  display: flex;
  height: 100%;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  height: 52px;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[2]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
  padding-left: ${({ theme }) => theme.spacing[6]};
  padding-right: ${({ theme }) => theme.spacing[6]};
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ContentArea = styled.div`
  position: relative;
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
`;

export const ConnectionBanner = styled.div<{ $tone: "warning" | "danger" }>`
  flex-shrink: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme, $tone }) =>
    $tone === "danger" ? theme.colors.status.dangerSubtle : theme.colors.status.warningSubtle};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
`;

export const ConnectionBannerTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ConnectionBannerDescription = styled.p`
  margin-top: ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ScrollList = styled.div`
  min-height: 0;
  flex: 1;
  overflow-y: auto;
  ${hideScrollbar}
`;

export const PlaceholderCenter = styled.div`
  display: flex;
  height: 100%;
  min-height: 0;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[4]};
`;

export const UtteranceList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[4]};
`;

export const FloatingButtonWrapper = styled.div`
  pointer-events: none;
  position: absolute;
  inset-inline: 0;
  bottom: ${({ theme }) => theme.spacing[4]};
  z-index: 10;
  display: flex;
  justify-content: center;
  padding-left: ${({ theme }) => theme.spacing[4]};
  padding-right: ${({ theme }) => theme.spacing[4]};
`;

export const NewUtterancesButtonSlot = styled.div`
  pointer-events: auto;
`;

export const EmptyIconSlot = styled(IconSlot)`
  color: inherit;
`;

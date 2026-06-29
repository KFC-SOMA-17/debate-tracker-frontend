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

export const UpdatedAt = styled.span`
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ScrollBody = styled.div`
  min-height: 0;
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing[6]};
  ${hideScrollbar}
`;

export const PlaceholderCenter = styled.div`
  display: flex;
  height: 100%;
  min-height: 0;
  align-items: center;
  justify-content: center;
`;

export const EmptyIconSlot = styled(IconSlot)`
  color: inherit;
`;

import styled from "@emotion/styled";
import { IconSlot } from "@/shared/ui/icons/IconSlot";

export const Root = styled.div`
  display: flex;
  height: 100%;
  min-height: 0;
  flex: 1;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing[6]};
  user-select: none;
`;

export const EmptyStateWrapper = styled.div`
  width: 100%;
  max-width: 28rem;
`;

export { IconSlot };

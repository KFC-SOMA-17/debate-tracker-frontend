import styled from "@emotion/styled";
import { Badge } from "@/shared/ui/badge";

export const Root = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const EvidenceBadge = styled(Badge)`
  flex-shrink: 0;
`;

export const Content = styled.p`
  min-width: 0;
  flex: 1;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

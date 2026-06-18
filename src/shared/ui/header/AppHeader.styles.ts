import styled from "@emotion/styled";

export const AppHeaderRoot = styled.header`
  display: flex;
  height: 4.5rem;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.bg.default};
  padding: 0 ${({ theme }) => theme.spacing[8]};
`;

export const AppHeaderBrandSlot = styled.div`
  display: flex;
  min-width: 0;
  flex-shrink: 0;
  align-items: center;
`;

export const AppHeaderTrailingSlot = styled.div`
  display: flex;
  min-width: 0;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing[3]};
`;

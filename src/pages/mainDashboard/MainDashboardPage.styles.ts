import styled from "@emotion/styled";

export const PageRoot = styled.div`
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  padding: ${({ theme }) => `${theme.spacing[6]} ${theme.spacing[8]}`};
`;

export const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`;

export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const PageDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const SplitPanelContainer = styled.div`
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.bg.default};
  padding: 1px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const SplitViewWrapper = styled.div`
  min-height: 0;
  flex: 1;
`;

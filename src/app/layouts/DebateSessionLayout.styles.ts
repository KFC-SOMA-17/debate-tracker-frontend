import styled from "@emotion/styled";

export const LayoutRoot = styled.div`
  display: flex;
  height: 100vh;
  max-height: 100vh;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.bg.subtle};
`;

export const MainContent = styled.main`
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
`;

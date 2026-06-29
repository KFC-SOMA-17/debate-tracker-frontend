import styled from "@emotion/styled";
import { hideScrollbar } from "@/styles/mixins";

export const PageRoot = styled.div`
  display: flex;
  height: 100vh;
  max-height: 100vh;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.bg.default};
`;

export const MainContent = styled.main`
  min-height: 0;
  flex: 1;
  overflow-y: auto;
  ${hideScrollbar}
`;

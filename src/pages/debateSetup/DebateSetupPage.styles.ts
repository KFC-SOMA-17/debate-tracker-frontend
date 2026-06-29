import styled from "@emotion/styled";
import { hideScrollbar } from "@/styles/mixins";

export const PageRoot = styled.div`
  display: flex;
  height: 100vh;
  max-height: 100vh;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.bg.subtle};
`;

export const MainContent = styled.main`
  min-height: 0;
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => `${theme.spacing[16]} ${theme.spacing[6]} ${theme.spacing[12]}`};
  ${hideScrollbar}
`;

export const ContentInner = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 36rem;
`;

export const StepContent = styled.div`
  margin-top: ${({ theme }) => theme.spacing[8]};
`;

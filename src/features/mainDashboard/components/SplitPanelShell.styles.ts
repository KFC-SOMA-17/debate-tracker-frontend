import styled from "@emotion/styled";
import { Panel } from "react-resizable-panels";

export const SplitPanel = styled(Panel)`
  min-height: 0;
  min-width: 0;
`;

export const ShellRoot = styled.div`
  display: flex;
  height: 100%;
  min-height: 0;
  min-width: 0;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.bg.default};
`;

export const ShellRegion = styled.div`
  display: flex;
  min-height: 0;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
`;

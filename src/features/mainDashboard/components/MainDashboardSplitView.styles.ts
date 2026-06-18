import styled from "@emotion/styled";
import { Group, Separator } from "react-resizable-panels";
import { focusRing } from "@/styles/mixins";

export const SplitGroup = styled(Group)`
  display: flex;
  height: 100%;
  min-height: 0;
  min-width: 0;
  flex: 1;
`;

export const SplitPanelHandle = styled(Separator)`
  position: relative;
  z-index: 1;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.sizes.splitHandle};
  cursor: col-resize;
  background-color: transparent;
  transition: background-color 150ms ease;

  &::before {
    position: absolute;
    inset: 0;
    width: 1px;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.colors.border.default};
    content: "";
    transition: background-color 150ms ease;
  }

  &:hover::before,
  &:active::before {
    background-color: ${({ theme }) => theme.colors.border.strong};
  }

  ${focusRing}
`;

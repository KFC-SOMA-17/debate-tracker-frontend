import styled from "@emotion/styled";
import { Tabs } from "@/shared/ui/tab";

export const StyledTabs = styled(Tabs)`
  width: 100%;
  flex-shrink: 0;

  [role="tablist"] {
    height: 44px;
    align-items: stretch;
  }

  button[role="tab"] {
    display: flex;
    height: 100%;
    align-items: center;
  }
`;

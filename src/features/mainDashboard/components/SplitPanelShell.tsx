import { useState, type ReactNode } from "react";
import { usePanelRef } from "react-resizable-panels";
import { SPLIT_COLLAPSE_THRESHOLD, SPLIT_COLLAPSED_RAIL_PX } from "../constants/splitLayout";
import { CollapsedPanelRail } from "./CollapsedPanelRail";
import { ShellRegion, ShellRoot, SplitPanel } from "./SplitPanelShell.styles";

export type SplitPanelShellProps = {
  id: string;
  defaultSize: number;
  ariaLabel: string;
  railLabel: string;
  expandDirection?: "left" | "right";
  onRestoreLayout: () => void;
  children?: ReactNode;
};

export function SplitPanelShell({
  id,
  defaultSize,
  ariaLabel,
  railLabel,
  expandDirection = "right",
  onRestoreLayout,
  children,
}: SplitPanelShellProps) {
  const panelRef = usePanelRef();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleRestoreLayout = () => {
    onRestoreLayout();
    setIsCollapsed(false);
  };

  return (
    <SplitPanel
      id={id}
      panelRef={panelRef}
      defaultSize={defaultSize}
      minSize={SPLIT_COLLAPSE_THRESHOLD}
      collapsible
      collapsedSize={SPLIT_COLLAPSED_RAIL_PX}
      onResize={() => {
        setIsCollapsed(panelRef.current?.isCollapsed() ?? false);
      }}
    >
      <ShellRoot>
        {isCollapsed ? (
          <CollapsedPanelRail label={railLabel} expandDirection={expandDirection} onExpand={handleRestoreLayout} />
        ) : (
          <ShellRegion aria-label={ariaLabel} role="region">
            {children}
          </ShellRegion>
        )}
      </ShellRoot>
    </SplitPanel>
  );
}

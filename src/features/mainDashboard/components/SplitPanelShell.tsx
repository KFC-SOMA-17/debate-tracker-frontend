import { useState, type ReactNode } from "react";
import { Panel, usePanelRef } from "react-resizable-panels";
import { SPLIT_COLLAPSE_THRESHOLD, SPLIT_COLLAPSED_RAIL_PX } from "../constants/splitLayout";
import { CollapsedPanelRail } from "./CollapsedPanelRail";

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
    <Panel
      id={id}
      panelRef={panelRef}
      defaultSize={defaultSize}
      minSize={SPLIT_COLLAPSE_THRESHOLD}
      collapsible
      collapsedSize={SPLIT_COLLAPSED_RAIL_PX}
      className="min-h-0 min-w-0"
      onResize={() => {
        setIsCollapsed(panelRef.current?.isCollapsed() ?? false);
      }}
    >
      <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden bg-bg-default">
        {isCollapsed ? (
          <CollapsedPanelRail label={railLabel} expandDirection={expandDirection} onExpand={handleRestoreLayout} />
        ) : (
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden" aria-label={ariaLabel} role="region">
            {children}
          </div>
        )}
      </div>
    </Panel>
  );
}

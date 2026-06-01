import { useCallback } from "react";
import { Group, Separator, useGroupRef } from "react-resizable-panels";
import { useDebateSessionLayout } from "@/app/layouts/DebateSessionLayoutContext";
import { useUiStore } from "@/shared/store/uiStore";
import { cn } from "@/shared/lib/cn";
import { MainDashboardPanelIdleEmpty } from "./MainDashboardPanelIdleEmpty";
import {
  createDefaultSplitLayout,
  getDefaultSplitRatio,
  SPLIT_DEFAULT_LAYOUT,
  SPLIT_GROUP_ID,
  SPLIT_PANEL_IDS,
} from "../constants/splitLayout";
import { SplitPanelShell } from "./SplitPanelShell";
import { SplitResizeGrip } from "./SplitResizeGrip";

export type MainDashboardSplitViewProps = {
  className?: string;
};

export function MainDashboardSplitView({ className }: MainDashboardSplitViewProps) {
  const { phase } = useDebateSessionLayout();
  const groupRef = useGroupRef();
  const setSplitRatio = useUiStore(state => state.setSplitRatio);
  const showIdleEmpty = phase === "idle";

  const applyDefaultLayout = useCallback(() => {
    groupRef.current?.setLayout(createDefaultSplitLayout());
    setSplitRatio(getDefaultSplitRatio());
  }, [groupRef, setSplitRatio]);

  return (
    <Group
      id={SPLIT_GROUP_ID}
      groupRef={groupRef}
      orientation="horizontal"
      className={cn("flex min-h-0 min-w-0 flex-1", className)}
      defaultLayout={createDefaultSplitLayout()}
      onLayoutChanged={layout => {
        const left = layout[SPLIT_PANEL_IDS.transcript];
        if (left != null) {
          setSplitRatio(left / 100);
        }
      }}
    >
      <SplitPanelShell
        id={SPLIT_PANEL_IDS.transcript}
        defaultSize={SPLIT_DEFAULT_LAYOUT[SPLIT_PANEL_IDS.transcript]}
        ariaLabel="실시간 속기록"
        railLabel="속기록"
        expandDirection="right"
        onRestoreLayout={applyDefaultLayout}
      >
        {showIdleEmpty ? <MainDashboardPanelIdleEmpty panel="transcript" /> : null}
      </SplitPanelShell>
      <Separator className="split-panel-handle" disableDoubleClick onDoubleClick={applyDefaultLayout}>
        <SplitResizeGrip />
      </Separator>
      <SplitPanelShell
        id={SPLIT_PANEL_IDS.issueSummary}
        defaultSize={SPLIT_DEFAULT_LAYOUT[SPLIT_PANEL_IDS.issueSummary]}
        ariaLabel="쟁점별 요약"
        railLabel="쟁점별 요약"
        expandDirection="left"
        onRestoreLayout={applyDefaultLayout}
      >
        {showIdleEmpty ? <MainDashboardPanelIdleEmpty panel="issueSummary" /> : null}
      </SplitPanelShell>
    </Group>
  );
}

import { useCallback } from "react";
import { useGroupRef } from "react-resizable-panels";
import { useDebateSessionLayout } from "@/app/layouts/DebateSessionLayoutContext";
import { IssueSummaryPanel } from "@/features/issueSummary/components/IssueSummaryPanel";
import { TranscriptPanel } from "@/features/transcript/components/TranscriptPanel";
import { useUiStore } from "@/shared/store/uiStore";
import {
  createDefaultSplitLayout,
  getDefaultSplitRatio,
  SPLIT_DEFAULT_LAYOUT,
  SPLIT_GROUP_ID,
  SPLIT_PANEL_IDS,
} from "../constants/splitLayout";
import { SplitGroup, SplitPanelHandle } from "./MainDashboardSplitView.styles";
import { SplitPanelShell } from "./SplitPanelShell";
import { SplitResizeGrip } from "./SplitResizeGrip";

export type MainDashboardSplitViewProps = {
  className?: string;
};

export function MainDashboardSplitView({ className }: MainDashboardSplitViewProps) {
  const { phase, transcriptSegments, sttStatus, lastSttError } = useDebateSessionLayout();
  const groupRef = useGroupRef();
  const setSplitRatio = useUiStore(state => state.setSplitRatio);

  const applyDefaultLayout = useCallback(() => {
    groupRef.current?.setLayout(createDefaultSplitLayout());
    setSplitRatio(getDefaultSplitRatio());
  }, [groupRef, setSplitRatio]);

  return (
    <SplitGroup
      id={SPLIT_GROUP_ID}
      groupRef={groupRef}
      orientation="horizontal"
      className={className}
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
        <TranscriptPanel
          phase={phase}
          segments={transcriptSegments}
          sttStatus={sttStatus}
          lastError={lastSttError}
        />
      </SplitPanelShell>
      <SplitPanelHandle disableDoubleClick onDoubleClick={applyDefaultLayout}>
        <SplitResizeGrip />
      </SplitPanelHandle>
      <SplitPanelShell
        id={SPLIT_PANEL_IDS.issueSummary}
        defaultSize={SPLIT_DEFAULT_LAYOUT[SPLIT_PANEL_IDS.issueSummary]}
        ariaLabel="쟁점별 요약"
        railLabel="쟁점별 요약"
        expandDirection="left"
        onRestoreLayout={applyDefaultLayout}
      >
        <IssueSummaryPanel phase={phase} />
      </SplitPanelShell>
    </SplitGroup>
  );
}

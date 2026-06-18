import { ChevronRightIcon } from "@/shared/ui/icons";
import { theme } from "@/styles/theme";
import { ChevronIconSlot, ExpandButton, RailLabel, RailRoot } from "./CollapsedPanelRail.styles";

export type CollapsedPanelRailProps = {
  label: string;
  onExpand: () => void;
  /** collapse strip이 왼쪽 패널이면 펼치기 chevron은 오른쪽(>) */
  expandDirection?: "left" | "right";
};

export function CollapsedPanelRail({ label, onExpand, expandDirection = "right" }: CollapsedPanelRailProps) {
  return (
    <RailRoot>
      <ExpandButton type="button" onClick={onExpand} aria-label={`${label} 패널 펼치기`}>
        <ChevronIconSlot $size={theme.sizes.icon5} $flip={expandDirection === "left"}>
          <ChevronRightIcon aria-hidden />
        </ChevronIconSlot>
        <RailLabel>{label}</RailLabel>
      </ExpandButton>
    </RailRoot>
  );
}

import { GripRoot, GripStripe } from "./SplitResizeGrip.styles";

export type SplitResizeGripProps = {
  className?: string;
};

/** Split bar 중앙 stripe — resize affordance */
export function SplitResizeGrip({ className }: SplitResizeGripProps) {
  return (
    <GripRoot className={className} aria-hidden>
      <GripStripe />
      <GripStripe />
    </GripRoot>
  );
}

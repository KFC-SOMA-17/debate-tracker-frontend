import { LogoIcon } from "@/shared/ui/icons";
import { IconSlot } from "@/shared/ui/icons/IconSlot";
import {
  LandingCheckCircleFilledIcon,
  LandingXCircleFilledIcon,
} from "@/shared/ui/icons/landing";
import { theme } from "@/styles/theme";
import { LANDING_COMPARISON_ROWS } from "../landingContent";
import { LandingSectionHeader } from "./LandingShared";
import {
  ComparisonCell,
  ComparisonFeature,
  ComparisonHeader,
  ComparisonHeaderBrand,
  ComparisonHeaderGeneric,
  ComparisonHeaderLabel,
  ComparisonInner,
  ComparisonRow,
  ComparisonSection,
  ComparisonTable,
} from "./LandingComparisonSection.styles";

export function LandingComparisonSection() {
  return (
    <ComparisonSection>
      <ComparisonInner>
        <LandingSectionHeader
          label="Why Debate Tracker"
          title="범용 AI와 무엇이 다른가요?"
          description="GPT 등 범용 AI는 토론 맥락을 이해하지 못합니다. Debate Tracker는 토론 전용으로 설계된 분석 엔진입니다."
        />

        <ComparisonTable>
          <ComparisonHeader>
            <ComparisonHeaderLabel>기능</ComparisonHeaderLabel>
            <ComparisonHeaderBrand>
              <IconSlot $size={theme.spacing[6]}>
                <LogoIcon aria-hidden />
              </IconSlot>
              Debate Tracker
            </ComparisonHeaderBrand>
            <ComparisonHeaderGeneric>범용 AI (GPT 등)</ComparisonHeaderGeneric>
          </ComparisonHeader>

          {LANDING_COMPARISON_ROWS.map((row, index) => (
            <ComparisonRow
              key={row.feature}
              $hasBorder={index < LANDING_COMPARISON_ROWS.length - 1}
            >
              <ComparisonFeature>{row.feature}</ComparisonFeature>
              <ComparisonCell>
                {row.debateTracker ? (
                  <IconSlot $size={theme.sizes.icon5}>
                    <LandingCheckCircleFilledIcon aria-label="지원" />
                  </IconSlot>
                ) : (
                  <IconSlot $size={theme.sizes.icon5}>
                    <LandingXCircleFilledIcon aria-label="미지원" />
                  </IconSlot>
                )}
              </ComparisonCell>
              <ComparisonCell>
                {row.generalAi ? (
                  <IconSlot $size={theme.sizes.icon5}>
                    <LandingCheckCircleFilledIcon aria-label="지원" />
                  </IconSlot>
                ) : (
                  <IconSlot $size={theme.sizes.icon5}>
                    <LandingXCircleFilledIcon aria-label="미지원" />
                  </IconSlot>
                )}
              </ComparisonCell>
            </ComparisonRow>
          ))}
        </ComparisonTable>
      </ComparisonInner>
    </ComparisonSection>
  );
}

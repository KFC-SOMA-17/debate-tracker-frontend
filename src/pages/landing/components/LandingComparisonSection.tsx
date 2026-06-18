import { LogoIcon } from "@/shared/ui/icons";
import {
  LandingCheckCircleFilledIcon,
  LandingXCircleFilledIcon,
} from "@/shared/ui/icons/landing";
import { LANDING_COMPARISON_ROWS } from "../landingContent";
import { LandingSectionHeader } from "./LandingShared";

export function LandingComparisonSection() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <LandingSectionHeader
          label="Why Debate Tracker"
          title="범용 AI와 무엇이 다른가요?"
          description="GPT 등 범용 AI는 토론 맥락을 이해하지 못합니다. Debate Tracker는 토론 전용으로 설계된 분석 엔진입니다."
        />

        <div className="mt-14 overflow-hidden rounded-2xl border border-border-default bg-bg-elevated shadow-sm">
          <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-border-subtle bg-bg-subtle px-6 py-4 text-sm">
            <span className="font-medium text-text-muted">기능</span>
            <span className="flex items-center justify-center gap-2 font-semibold text-text-primary">
              <LogoIcon className="size-6 shrink-0" aria-hidden />
              Debate Tracker
            </span>
            <span className="text-center font-medium text-text-muted">범용 AI (GPT 등)</span>
          </div>

          {LANDING_COMPARISON_ROWS.map((row, index) => (
            <div
              key={row.feature}
              className={`grid grid-cols-[1fr_1fr_1fr] items-center px-6 py-3.5 text-sm ${
                index < LANDING_COMPARISON_ROWS.length - 1 ? "border-b border-border-subtle" : ""
              }`}
            >
              <span className="text-text-primary">{row.feature}</span>
              <span className="flex justify-center">
                {row.debateTracker ? (
                  <LandingCheckCircleFilledIcon className="size-5" aria-label="지원" />
                ) : (
                  <LandingXCircleFilledIcon className="size-5" aria-label="미지원" />
                )}
              </span>
              <span className="flex justify-center">
                {row.generalAi ? (
                  <LandingCheckCircleFilledIcon className="size-5" aria-label="지원" />
                ) : (
                  <LandingXCircleFilledIcon className="size-5" aria-label="미지원" />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

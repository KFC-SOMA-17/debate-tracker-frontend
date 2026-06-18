import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button";
import { ArrowRightIcon } from "@/shared/ui/icons";
import { LANDING_HERO_STATS } from "../landingContent";

interface LandingHeroSectionProps {
  onStartDebate: () => void;
}

const statToneClasses = {
  primary: "text-accent-secondary",
  accent: "text-accent-primary",
  danger: "text-status-danger",
} as const;

export function LandingHeroSection({ onStartDebate }: LandingHeroSectionProps) {
  return (
    <section className="landing-hero-bg relative overflow-hidden px-6 py-24">
      <div
        className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-accent-primary-subtle blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-96 right-0 size-80 rounded-full bg-accent-primary-subtle blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-pill border border-accent-primary-subtle bg-accent-primary-muted px-4 py-1.5">
          <span className="size-1.5 rounded-full bg-accent-primary" aria-hidden />
          <span className="text-xs font-medium text-accent-primary">AI 기반 토론 실시간 분석 서비스</span>
        </div>

        <h1 className="mt-4 font-display text-5xl leading-[3.75rem] font-bold tracking-tight text-text-primary">
          토론의 모든 순간을
          <br />
          <span className="landing-hero-title-accent">기록하고 분석합니다</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-[1.625] text-text-muted">
          실시간 음성 속기록부터 쟁점 요약, 개인 피드백까지 — Debate Tracker는 토론의 전 과정을 AI로 분석해
          당신의 논리력을 한 단계 끌어올립니다.
        </p>

        <div className="mt-10">
          <Button
            type="button"
            variant="primary"
            size="lg"
            className="h-14 cursor-pointer rounded-[0.875rem] px-8 shadow-[0_10px_7.5px_color-mix(in_srgb,var(--color-accent-primary)_25%,transparent),0_4px_3px_color-mix(in_srgb,var(--color-accent-primary)_25%,transparent)]"
            rightIcon={<ArrowRightIcon className="size-4" aria-hidden />}
            onClick={onStartDebate}
          >
            지금 바로 토론 시작하기
          </Button>
        </div>

        <div className="mt-16 w-full border-t border-border-subtle pt-10">
          <div className="grid gap-8 sm:grid-cols-3">
            {LANDING_HERO_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <p className={cn("font-display text-2xl font-bold", statToneClasses[stat.tone])}>{stat.label}</p>
                <p className="text-sm text-text-muted">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

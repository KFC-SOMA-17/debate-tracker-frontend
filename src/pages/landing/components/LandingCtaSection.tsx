import { Button } from "@/shared/ui/button";
import { ArrowRightIcon, LogoIcon } from "@/shared/ui/icons";

interface LandingCtaSectionProps {
  onStartDebate: () => void;
}

export function LandingCtaSection({ onStartDebate }: LandingCtaSectionProps) {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <LogoIcon className="size-16 shrink-0" aria-hidden />
        <h2 className="mt-6 font-display text-[1.875rem] leading-9 font-bold text-text-primary">
          지금 바로 첫 토론을 시작해보세요
        </h2>
        <p className="mt-4 text-base text-text-muted">
          주제를 입력하는 것만으로 충분합니다. 나머지는 Debate Tracker가 해결합니다.
        </p>
        <Button
          type="button"
          variant="primary"
          size="lg"
          className="mt-8 h-14 cursor-pointer rounded-[0.875rem] px-8 shadow-[0_10px_7.5px_color-mix(in_srgb,var(--color-accent-primary)_25%,transparent),0_4px_3px_color-mix(in_srgb,var(--color-accent-primary)_25%,transparent)]"
          rightIcon={<ArrowRightIcon className="size-4" aria-hidden />}
          onClick={onStartDebate}
        >
          토론 준비하기
        </Button>
      </div>
    </section>
  );
}

import { LogoIcon } from "@/shared/ui/icons";

export function LandingFooter() {
  return (
    <footer className="border-t border-border-subtle px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <LogoIcon className="size-6 shrink-0" aria-hidden />
          <span className="font-display text-sm font-semibold text-text-primary">Debate Tracker</span>
        </div>
        <p className="text-sm text-text-muted">AI 기반 토론 실시간 요약·분석 서비스</p>
      </div>
    </footer>
  );
}

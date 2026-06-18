import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

interface SetupStepCardProps {
  header: ReactNode;
  children: ReactNode;
  footer: ReactNode;
  className?: string;
}

export function SetupStepCard({ header, children, footer, className }: SetupStepCardProps) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl border border-border-default bg-bg-elevated shadow-sm",
        className,
      )}
    >
      <header className="border-b border-border-subtle px-8 pt-6 pb-6">{header}</header>
      <div>{children}</div>
      <footer className="border-t border-border-subtle px-8 py-5">{footer}</footer>
    </article>
  );
}

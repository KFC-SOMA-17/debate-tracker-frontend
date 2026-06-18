import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

interface LandingSectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
}

export function LandingSectionHeader({ label, title, description, className }: LandingSectionHeaderProps) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      {label ? (
        <p className="text-sm font-semibold tracking-[0.1em] text-accent-primary uppercase">{label}</p>
      ) : null}
      <h2 className={cn("font-display text-[1.875rem] leading-9 font-bold text-text-primary", label && "mt-4")}>
        {title}
      </h2>
      {description ? <p className="mt-4 max-w-xl text-base text-text-muted">{description}</p> : null}
    </div>
  );
}

interface LandingInfoCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  variant?: "muted" | "elevated";
}

export function LandingInfoCard({ icon, title, description, variant = "elevated" }: LandingInfoCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col rounded-2xl border p-6",
        variant === "muted"
          ? "border-border-subtle bg-bg-subtle"
          : "border-border-default bg-bg-elevated shadow-sm",
      )}
    >
      <div className="text-[1.875rem] leading-9">{icon}</div>
      <h3 className="mt-4 text-base font-semibold text-text-primary">{title}</h3>
      <p className="mt-2 text-sm leading-[1.625] text-text-muted">{description}</p>
    </article>
  );
}

interface LandingFeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function LandingFeatureCard({ icon, title, description }: LandingFeatureCardProps) {
  return (
    <article className="flex flex-col rounded-2xl border border-border-default bg-bg-elevated p-6 shadow-sm">
      <div className="flex size-11 items-center justify-center rounded-[0.875rem] bg-accent-primary-subtle text-accent-primary">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-semibold text-text-primary">{title}</h3>
      <p className="mt-2 text-sm leading-[1.625] text-text-muted">{description}</p>
    </article>
  );
}

interface LandingCardGridProps {
  children: ReactNode;
  className?: string;
}

export function LandingCardGrid({ children, className }: LandingCardGridProps) {
  return <div className={cn("mt-14 grid gap-6 md:grid-cols-3", className)}>{children}</div>;
}

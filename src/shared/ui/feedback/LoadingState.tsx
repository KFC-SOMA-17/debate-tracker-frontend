import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export interface LoadingStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  description?: ReactNode;
}

export function LoadingState({ title, description, className, ...props }: LoadingStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center px-6 py-12 text-center", className)} {...props}>
      <span
        className="mb-4 inline-block size-12 animate-spin rounded-full border-2 border-border-default border-t-accent-primary"
        aria-hidden
      />

      <p className="text-sm font-medium text-text-primary" aria-live="polite">
        {title}
      </p>
      {description ? <p className="mt-2 text-xs text-text-secondary">{description}</p> : null}
    </div>
  );
}

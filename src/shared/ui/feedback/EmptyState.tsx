import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action, className, ...props }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border-default bg-bg-subtle/50 px-6 py-12 text-center",
        className
      )}
      {...props}
    >
      {icon ? <div className="mb-4 text-text-muted">{icon}</div> : null}

      <h3 className="text-sm font-medium text-text-primary">{title}</h3>
      {description ? <p className="mt-2 max-w-md text-xs text-text-secondary">{description}</p> : null}

      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

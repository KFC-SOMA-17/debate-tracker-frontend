import type { HTMLAttributes, ReactNode } from "react";
import { AlertCircleIcon } from "@/shared/ui/icons";
import { cn } from "@/shared/lib/cn";

export interface ErrorStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

export function ErrorState({ title, description, action, className, ...props }: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center px-6 py-12 text-center", className)} {...props}>
      <AlertCircleIcon className="mb-4 size-12 text-status-danger" aria-hidden />

      <p className="text-sm font-medium text-text-primary">{title}</p>
      {description ? <p className="mt-2 text-xs text-text-secondary">{description}</p> : null}

      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export type BadgeVariant = "status" | "speaker" | "evidence" | "neutral";
export type BadgeTone = "default" | "success" | "warning" | "danger" | "info" | "muted";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  tone?: BadgeTone;
  leftIcon?: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  status: "rounded-pill px-3 py-1 text-xs font-medium",
  speaker: "rounded-md px-2 py-0.5 text-xs font-medium",
  evidence: "rounded-pill px-2.5 py-0.5 text-xs font-medium border",
  neutral: "rounded-pill px-2.5 py-0.5 text-xs font-medium",
};

const toneClasses: Record<BadgeTone, string> = {
  default: "bg-bg-muted text-text-primary",
  success: "bg-status-success-subtle text-status-success",
  warning: "bg-status-warning-subtle text-status-warning",
  danger: "bg-status-danger-subtle text-status-danger",
  info: "bg-status-info-subtle text-accent-primary",
  muted: "bg-status-muted-subtle text-text-primary",
};

export function Badge({ variant = "status", tone = "default", leftIcon, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-1", variantClasses[variant], toneClasses[tone], className)}
      {...props}
    >
      {leftIcon}
      {children}
    </span>
  );
}

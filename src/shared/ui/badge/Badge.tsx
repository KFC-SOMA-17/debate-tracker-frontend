import type { HTMLAttributes, ReactNode } from "react";
import { BadgeRoot } from "./Badge.styles";

export type BadgeVariant = "status" | "speaker" | "evidence" | "neutral";
export type BadgeTone = "default" | "success" | "warning" | "danger" | "info" | "pros" | "muted";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  tone?: BadgeTone;
  leftIcon?: ReactNode;
}

export function Badge({ variant = "status", tone = "default", leftIcon, className, children, ...props }: BadgeProps) {
  return (
    <BadgeRoot className={className} $variant={variant} $tone={tone} {...props}>
      {leftIcon}
      {children}
    </BadgeRoot>
  );
}

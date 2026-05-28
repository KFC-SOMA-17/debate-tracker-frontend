import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
  elevated?: boolean;
}

const paddingClasses: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export function Card({ padding = "md", elevated = true, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border-default",
        elevated ? "bg-bg-elevated" : "bg-bg-default",
        paddingClasses[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

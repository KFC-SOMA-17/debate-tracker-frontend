import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export interface QuoteBoxProps extends HTMLAttributes<HTMLQuoteElement> {
  cite?: string;
}

export function QuoteBox({ className, children, cite, ...props }: QuoteBoxProps) {
  return (
    <blockquote
      cite={cite}
      className={cn(
        "rounded-xl border border-border-subtle bg-bg-subtle px-5 py-4 text-sm leading-relaxed text-text-primary",
        className,
      )}
      {...props}
    >
      {children}
    </blockquote>
  );
}

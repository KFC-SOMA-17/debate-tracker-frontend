import type { HTMLAttributes } from "react";
import { QuoteBoxRoot } from "./QuoteBox.styles";

export interface QuoteBoxProps extends HTMLAttributes<HTMLQuoteElement> {
  cite?: string;
}

export function QuoteBox({ className, children, cite, ...props }: QuoteBoxProps) {
  return (
    <QuoteBoxRoot cite={cite} className={className} {...props}>
      {children}
    </QuoteBoxRoot>
  );
}

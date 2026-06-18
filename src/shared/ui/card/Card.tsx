import type { HTMLAttributes } from "react";
import { CardRoot } from "./Card.styles";

export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
  elevated?: boolean;
}

export function Card({ padding = "md", elevated = true, className, children, ...props }: CardProps) {
  return (
    <CardRoot className={className} $padding={padding} $elevated={elevated} {...props}>
      {children}
    </CardRoot>
  );
}

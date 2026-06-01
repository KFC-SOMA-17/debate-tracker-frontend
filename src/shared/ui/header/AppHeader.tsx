import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export interface AppHeaderProps extends HTMLAttributes<HTMLElement> {
  /** 왼쪽 영역 — 보통 `<HeaderBrand />` */
  brand: ReactNode;
  /** 오른쪽 영역 — 페이지/레이아웃에서 동적으로 주입 */
  trailing?: ReactNode;
}

export function AppHeader({ brand, trailing, className, ...props }: AppHeaderProps) {
  return (
    <header
      className={cn(
        "flex h-18 items-center justify-between border-b border-border-default bg-bg-default px-8",
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 shrink-0 items-center">{brand}</div>
      {trailing ? <div className="flex min-w-0 shrink-0 items-center justify-end gap-3">{trailing}</div> : null}
    </header>
  );
}

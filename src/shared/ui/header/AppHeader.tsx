import type { HTMLAttributes, ReactNode } from "react";
import { AppHeaderBrandSlot, AppHeaderRoot, AppHeaderTrailingSlot } from "./AppHeader.styles";

export interface AppHeaderProps extends HTMLAttributes<HTMLElement> {
  /** 왼쪽 영역 — 보통 `<HeaderBrand />` */
  brand: ReactNode;
  /** 오른쪽 영역 — 페이지/레이아웃에서 동적으로 주입 */
  trailing?: ReactNode;
}

export function AppHeader({ brand, trailing, className, ...props }: AppHeaderProps) {
  return (
    <AppHeaderRoot className={className} {...props}>
      <AppHeaderBrandSlot>{brand}</AppHeaderBrandSlot>
      {trailing ? <AppHeaderTrailingSlot>{trailing}</AppHeaderTrailingSlot> : null}
    </AppHeaderRoot>
  );
}

import type { HTMLAttributes } from "react";
import { LogoIcon } from "@/shared/ui/icons";
import { IconSlot } from "@/shared/ui/icons/IconSlot";
import { HeaderBrandLogoSlot, HeaderBrandName, HeaderBrandRoot } from "./HeaderBrand.styles";

export interface HeaderBrandProps extends HTMLAttributes<HTMLDivElement> {
  serviceName?: string;
}

export function HeaderBrand({ serviceName = "Debate Tracker", className, ...props }: HeaderBrandProps) {
  return (
    <HeaderBrandRoot className={className} {...props}>
      <HeaderBrandLogoSlot>
        <IconSlot $size="2.5rem">
          <LogoIcon aria-hidden />
        </IconSlot>
      </HeaderBrandLogoSlot>
      <HeaderBrandName>{serviceName}</HeaderBrandName>
    </HeaderBrandRoot>
  );
}

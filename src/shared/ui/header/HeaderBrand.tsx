import type { HTMLAttributes } from "react";
import { LogoIcon } from "@/shared/ui/icons";
import { cn } from "@/shared/lib/cn";

export interface HeaderBrandProps extends HTMLAttributes<HTMLDivElement> {
  serviceName?: string;
}

export function HeaderBrand({ serviceName = "Debate Tracker", className, ...props }: HeaderBrandProps) {
  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      <LogoIcon className="size-10 shrink-0" aria-hidden />
      <span className="font-display text-xl font-semibold leading-tight text-text-primary">{serviceName}</span>
    </div>
  );
}

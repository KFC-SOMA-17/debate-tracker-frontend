import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export type ModalFooterProps = HTMLAttributes<HTMLDivElement>;

export function ModalFooter({ className, children, ...props }: ModalFooterProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 flex-wrap items-center justify-end gap-3 border-t border-border-subtle px-6 py-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

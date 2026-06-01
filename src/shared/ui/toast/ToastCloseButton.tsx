import type { ButtonHTMLAttributes } from "react";
import { XIcon } from "@/shared/ui/icons";
import { cn } from "@/shared/lib/cn";

export type ToastCloseButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function ToastCloseButton({ className, ...props }: ToastCloseButtonProps) {
  return (
    <button
      type="button"
      aria-label="닫기"
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-text-secondary transition-colors",
        "hover:bg-bg-subtle hover:text-text-primary",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary",
        className
      )}
      {...props}
    >
      <XIcon className="size-4" aria-hidden />
    </button>
  );
}

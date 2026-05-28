import type { ButtonHTMLAttributes } from "react";
import { XIcon } from "@/shared/ui/icons";
import { cn } from "@/shared/lib/cn";
import { useModalContext } from "./modal-context";

export interface ModalCloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function ModalCloseButton({ className, onClick, ...props }: ModalCloseButtonProps) {
  const { onClose } = useModalContext();

  return (
    <button
      type="button"
      aria-label="닫기"
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          onClose();
        }
      }}
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-border-default bg-bg-default text-text-secondary transition-colors",
        "hover:bg-bg-subtle hover:text-text-primary",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary",
        className,
      )}
      {...props}
    >
      <XIcon className="size-4" aria-hidden />
    </button>
  );
}

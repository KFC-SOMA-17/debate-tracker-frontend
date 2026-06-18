import type { ButtonHTMLAttributes } from "react";
import { XIcon } from "@/shared/ui/icons";
import { IconSlot } from "@/shared/ui/icons/IconSlot";
import { ToastCloseButtonRoot } from "./Toast.styles";

export type ToastCloseButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function ToastCloseButton({ className, ...props }: ToastCloseButtonProps) {
  return (
    <ToastCloseButtonRoot type="button" aria-label="닫기" className={className} {...props}>
      <IconSlot $size="1rem">
        <XIcon aria-hidden />
      </IconSlot>
    </ToastCloseButtonRoot>
  );
}

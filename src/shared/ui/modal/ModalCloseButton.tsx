import type { ButtonHTMLAttributes } from "react";
import { XIcon } from "@/shared/ui/icons";
import { IconSlot } from "@/shared/ui/icons/IconSlot";
import { useModalContext } from "./useModalContext";
import { ModalCloseButtonRoot } from "./ModalComponents.styles";

export type ModalCloseButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function ModalCloseButton({ className, onClick, ...props }: ModalCloseButtonProps) {
  const { onClose } = useModalContext();

  return (
    <ModalCloseButtonRoot
      type="button"
      aria-label="닫기"
      className={className}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          onClose();
        }
      }}
      {...props}
    >
      <IconSlot $size="1rem">
        <XIcon aria-hidden />
      </IconSlot>
    </ModalCloseButtonRoot>
  );
}

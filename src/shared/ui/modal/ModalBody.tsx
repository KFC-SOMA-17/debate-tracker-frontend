import type { HTMLAttributes } from "react";
import { useModalContext } from "./useModalContext";
import { ModalBodyRoot } from "./ModalComponents.styles";

export type ModalBodyProps = HTMLAttributes<HTMLDivElement>;

export function ModalBody({ className, children, ...props }: ModalBodyProps) {
  const { size } = useModalContext();

  return (
    <ModalBodyRoot className={className} $fullscreen={size === "fullscreen"} {...props}>
      {children}
    </ModalBodyRoot>
  );
}

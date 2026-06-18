import type { HTMLAttributes } from "react";
import { ModalFooterRoot } from "./ModalComponents.styles";

export type ModalFooterProps = HTMLAttributes<HTMLDivElement>;

export function ModalFooter({ className, children, ...props }: ModalFooterProps) {
  return (
    <ModalFooterRoot className={className} {...props}>
      {children}
    </ModalFooterRoot>
  );
}

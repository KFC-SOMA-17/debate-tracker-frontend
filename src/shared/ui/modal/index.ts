import { ModalBody } from "./ModalBody";
import { ModalCloseButton } from "./ModalCloseButton";
import { ModalFooter } from "./ModalFooter";
import { ModalHeader } from "./ModalHeader";
import { ModalRoot } from "./ModalRoot";

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
  CloseButton: ModalCloseButton,
});

export type { ModalProps } from "./ModalRoot";
export { ModalRoot } from "./ModalRoot";
export { ModalHeader, type ModalHeaderProps } from "./ModalHeader";
export { ModalBody, type ModalBodyProps } from "./ModalBody";
export { ModalFooter, type ModalFooterProps } from "./ModalFooter";
export { ModalCloseButton, type ModalCloseButtonProps } from "./ModalCloseButton";
export { useModalContext } from "./useModalContext";
export type { ModalSize } from "./useModalContext";

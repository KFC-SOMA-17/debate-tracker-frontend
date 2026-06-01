import { createContext, useContext, type RefObject } from "react";

export type ModalSize = "dialog" | "fullscreen";

export interface ModalContextValue {
  size: ModalSize;
  onClose: () => void;
  titleId: string;
  descriptionId: string;
  panelRef: RefObject<HTMLDivElement | null>;
  registerHasDescription: (active: boolean) => void;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

export function useModalContext(): ModalContextValue {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal compound components must be used within Modal.");
  }
  return context;
}

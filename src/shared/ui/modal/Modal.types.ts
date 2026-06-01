import type { RefObject } from "react";

export type ModalSize = "dialog" | "fullscreen";

export interface ModalContextValue {
  size: ModalSize;
  onClose: () => void;
  titleId: string;
  descriptionId: string;
  panelRef: RefObject<HTMLDivElement | null>;
  registerHasDescription: (active: boolean) => void;
}

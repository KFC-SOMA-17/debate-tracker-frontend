import type { ReactNode } from "react";

export type ToastVariant = "default" | "success" | "error";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type ToastDuration = number | false;

export type ToastInput = {
  id?: string;
  content: ReactNode;
  variant?: ToastVariant;
  duration?: ToastDuration;
  position?: ToastPosition;
  dismissible?: boolean;
  onDismiss?: () => void;
};

export type ToastRecord = Required<Pick<ToastInput, "id" | "content">> &
  Pick<ToastInput, "onDismiss"> & {
    variant: ToastVariant;
    duration: ToastDuration;
    position: ToastPosition;
    dismissible: boolean;
  };

export type ToastContextValue = {
  toasts: ToastRecord[];
  toast: (input: ToastInput) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
};

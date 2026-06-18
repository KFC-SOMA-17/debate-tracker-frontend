import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { TOAST_POSITIONS } from "./Toast.constants";
import type { ToastRecord } from "./Toast.types";
import { ToastPositionRegion, ToastViewportRoot } from "./Toast.styles";

export interface ToastViewportProps {
  toasts: ToastRecord[];
  onDismiss: (id: string) => void;
}

export function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <ToastViewportRoot aria-live="polite" data-testid="toast-viewport">
      {TOAST_POSITIONS.map((position) => {
        const positionToasts = toasts.filter((toast) => toast.position === position);
        if (positionToasts.length === 0) {
          return null;
        }

        return (
          <ToastPositionRegion key={position} $position={position} data-position={position}>
            {positionToasts.map((toast) => (
              <Toast
                key={toast.id}
                variant={toast.variant}
                position={toast.position}
                duration={toast.duration}
                dismissible={toast.dismissible}
                onDismiss={() => onDismiss(toast.id)}
              >
                {toast.content}
              </Toast>
            ))}
          </ToastPositionRegion>
        );
      })}
    </ToastViewportRoot>,
    document.body,
  );
}

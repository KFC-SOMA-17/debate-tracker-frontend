import { createPortal } from "react-dom";
import { cn } from "@/shared/lib/cn";
import { Toast } from "./Toast";
import { TOAST_POSITIONS, type ToastPosition, type ToastRecord } from "./toast-context";

const positionRegionClasses: Record<ToastPosition, string> = {
  "top-left": "top-[5%] left-4 items-start",
  "top-center": "top-[5%] left-1/2 -translate-x-1/2 items-center",
  "top-right": "top-[5%] right-4 items-end",
  "bottom-left": "bottom-[5%] left-4 items-start",
  "bottom-center": "bottom-[5%] left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-[5%] right-4 items-end",
};

export interface ToastViewportProps {
  toasts: ToastRecord[];
  onDismiss: (id: string) => void;
}

export function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-toast" aria-live="polite" data-testid="toast-viewport">
      {TOAST_POSITIONS.map(position => {
        const positionToasts = toasts.filter(toast => toast.position === position);
        if (positionToasts.length === 0) {
          return null;
        }

        return (
          <div
            key={position}
            className={cn(
              "pointer-events-none absolute flex max-w-[calc(100vw-2rem)] flex-col gap-2",
              positionRegionClasses[position]
            )}
            data-position={position}
          >
            {positionToasts.map(toast => (
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
          </div>
        );
      })}
    </div>,
    document.body
  );
}

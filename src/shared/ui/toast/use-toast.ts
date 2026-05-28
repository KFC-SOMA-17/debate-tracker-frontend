import { useContext } from "react";
import { ToastContext } from "./toast-context";

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    if (import.meta.env.DEV) {
      console.warn("useToast must be used within ToastProvider.");
    }

    const noopToast = () => "";
    const noopDismiss = () => undefined;
    return {
      toasts: [],
      toast: noopToast,
      dismiss: noopDismiss,
      dismissAll: noopDismiss,
    };
  }

  return context;
}

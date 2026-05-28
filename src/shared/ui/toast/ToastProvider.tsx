// Toast 큐는 useState로 관리한다. 전이 종류·규칙이 늘어나면 useReducer로 분리하는 것을 검토한다.

import { useCallback, useMemo, useState, type ReactNode } from "react";
import { ToastViewport } from "./ToastViewport";
import {
  ToastContext,
  type ToastContextValue,
  type ToastInput,
  type ToastPosition,
  type ToastRecord,
} from "./toast-context";

let toastIdCounter = 0;

function createToastId() {
  toastIdCounter += 1;
  return `toast-${toastIdCounter}`;
}

function upsertToast(prev: ToastRecord[], nextToast: ToastRecord, maxVisible: number) {
  const withoutDuplicate = prev.filter((toast) => toast.id !== nextToast.id);
  const samePosition = withoutDuplicate.filter((toast) => toast.position === nextToast.position);
  const otherPositions = withoutDuplicate.filter((toast) => toast.position !== nextToast.position);

  const nextSamePosition = [...samePosition, nextToast];
  while (nextSamePosition.length > maxVisible) {
    const removed = nextSamePosition.shift();
    removed?.onDismiss?.();
  }

  return [...otherPositions, ...nextSamePosition];
}

export interface ToastProviderProps {
  children: ReactNode;
  defaultPosition?: ToastPosition;
  defaultDuration?: number;
  maxVisible?: number;
}

export function ToastProvider({
  children,
  defaultPosition = "top-center",
  defaultDuration = 3000,
  maxVisible = 3,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => {
      const target = prev.find((toast) => toast.id === id);
      target?.onDismiss?.();
      return prev.filter((toast) => toast.id !== id);
    });
  }, []);

  const dismissAll = useCallback(() => {
    setToasts((prev) => {
      prev.forEach((toast) => toast.onDismiss?.());
      return [];
    });
  }, []);

  const toast = useCallback(
    (input: ToastInput) => {
      const id = input.id ?? createToastId();
      const record: ToastRecord = {
        id,
        content: input.content,
        variant: input.variant ?? "default",
        duration: input.duration ?? defaultDuration,
        position: input.position ?? defaultPosition,
        dismissible: input.dismissible ?? true,
        onDismiss: input.onDismiss,
      };

      setToasts((prev) => upsertToast(prev, record, maxVisible));
      return id;
    },
    [defaultDuration, defaultPosition, maxVisible],
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      toasts,
      toast,
      dismiss,
      dismissAll,
    }),
    [toasts, toast, dismiss, dismissAll],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

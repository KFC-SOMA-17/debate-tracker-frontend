import { useEffect, useRef } from "react";
import type { ToastDuration } from "./Toast.types";

type UseToastTimerOptions = {
  duration: ToastDuration;
  onDismiss: () => void;
  paused: boolean;
};

export function useToastTimer({ duration, onDismiss, paused }: UseToastTimerOptions) {
  const remainingRef = useRef<number | null>(duration === false ? null : duration);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startedAtRef = useRef<number | null>(null);
  const onDismissRef = useRef(onDismiss);

  useEffect(() => {
    onDismissRef.current = onDismiss;
  }, [onDismiss]);

  useEffect(() => {
    if (duration === false) {
      return;
    }

    remainingRef.current = duration;

    const clearTimer = () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      startedAtRef.current = null;
    };

    const schedule = () => {
      clearTimer();
      if (remainingRef.current === null || remainingRef.current <= 0) {
        onDismissRef.current();
        return;
      }

      startedAtRef.current = Date.now();
      timeoutRef.current = setTimeout(() => {
        onDismissRef.current();
      }, remainingRef.current);
    };

    if (paused) {
      if (startedAtRef.current !== null && remainingRef.current !== null) {
        remainingRef.current -= Date.now() - startedAtRef.current;
      }
      clearTimer();
      return clearTimer;
    }

    schedule();
    return clearTimer;
  }, [duration, paused]);
}

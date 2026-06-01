import { useState, type HTMLAttributes, type ReactNode } from "react";
import { AlertCircleIcon, CheckCircleIcon } from "@/shared/ui/icons";
import { cn } from "@/shared/lib/cn";
import { ToastCloseButton } from "./ToastCloseButton";
import { useToastTimer } from "./useToastTimer";
import type { ToastDuration, ToastPosition, ToastVariant } from "./toast-context";

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: ToastVariant;
  position: ToastPosition;
  duration: ToastDuration;
  dismissible?: boolean;
  onDismiss: () => void;
  children: ReactNode;
}

const variantClasses: Record<ToastVariant, string> = {
  default: "border-l-border-strong",
  success: "border-l-status-success",
  error: "border-l-status-danger",
};

const variantIcons: Record<ToastVariant, ReactNode | null> = {
  default: null,
  success: <CheckCircleIcon className="size-5 shrink-0 text-status-success" aria-hidden />,
  error: <AlertCircleIcon className="size-5 shrink-0 text-status-danger" aria-hidden />,
};

export function Toast({
  variant = "default",
  position,
  duration,
  dismissible = true,
  onDismiss,
  children,
  className,
  ...props
}: ToastProps) {
  const [paused, setPaused] = useState(false);
  const isError = variant === "error";

  useToastTimer({
    duration,
    onDismiss,
    paused,
  });

  return (
    <div
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      data-position={position}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
      className={cn(
        "pointer-events-auto flex items-center w-full min-w-[280px] max-w-[min(420px,calc(100vw-2rem))] gap-3",
        "rounded-lg border border-border-default border-l-4 bg-bg-elevated p-4 shadow-lg",
        "text-sm text-text-primary",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {variantIcons[variant]}
      <div className="min-w-0 flex-1">{children}</div>
      {dismissible ? <ToastCloseButton onClick={onDismiss} /> : null}
    </div>
  );
}

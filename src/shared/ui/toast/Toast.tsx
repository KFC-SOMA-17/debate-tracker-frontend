import { useState, type HTMLAttributes, type ReactNode } from "react";
import { AlertCircleIcon, CheckCircleIcon } from "@/shared/ui/icons";
import { IconSlot } from "@/shared/ui/icons/IconSlot";
import { ToastCloseButton } from "./ToastCloseButton";
import { useToastTimer } from "./useToastTimer";
import type { ToastDuration, ToastPosition, ToastVariant } from "./Toast.types";
import { ToastContent, ToastIconSlot, ToastRoot } from "./Toast.styles";

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: ToastVariant;
  position: ToastPosition;
  duration: ToastDuration;
  dismissible?: boolean;
  onDismiss: () => void;
  children: ReactNode;
}

const variantIcons: Record<ToastVariant, ReactNode | null> = {
  default: null,
  success: (
    <ToastIconSlot $variant="success">
      <IconSlot $size="1.25rem">
        <CheckCircleIcon aria-hidden />
      </IconSlot>
    </ToastIconSlot>
  ),
  error: (
    <ToastIconSlot $variant="error">
      <IconSlot $size="1.25rem">
        <AlertCircleIcon aria-hidden />
      </IconSlot>
    </ToastIconSlot>
  ),
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
    <ToastRoot
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      data-position={position}
      className={className}
      $variant={variant}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
      {...props}
    >
      {variantIcons[variant]}
      <ToastContent>{children}</ToastContent>
      {dismissible ? <ToastCloseButton onClick={onDismiss} /> : null}
    </ToastRoot>
  );
}

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "danger" | "fab";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const baseClasses =
  "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary disabled:pointer-events-none";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-primary text-text-inverse hover:brightness-95 active:brightness-90 disabled:opacity-50",
  secondary:
    "bg-bg-default text-text-primary border border-border-default hover:bg-bg-subtle active:bg-bg-muted disabled:opacity-50",
  danger:
    "bg-status-danger text-text-inverse hover:brightness-95 active:brightness-90 disabled:opacity-50",
  fab: "bg-accent-primary text-text-inverse shadow-md hover:brightness-95 active:brightness-90 disabled:opacity-50 rounded-pill",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-7 gap-1.5 px-3 text-sm rounded-xl",
  md: "h-9 gap-2 px-4 text-sm rounded-xl",
  lg: "h-12 gap-2 px-5 text-base rounded-xl",
};

const fabSizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 gap-2 px-4 text-sm",
  md: "h-11 gap-2.5 px-6 text-sm",
  lg: "h-12 gap-3 px-8 text-base",
};

function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent",
        className,
      )}
      aria-hidden="true"
    />
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    leftIcon,
    rightIcon,
    className,
    children,
    disabled,
    type = "button",
    ...props
  },
  ref,
) {
  const isFab = variant === "fab";
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(
        baseClasses,
        variantClasses[variant],
        isFab ? fabSizeClasses[size] : sizeClasses[size],
        className,
      )}
      {...props}
    >
      {loading ? <Spinner /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
});

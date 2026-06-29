import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { ButtonRoot, Spinner } from "./Button.styles";

export type ButtonVariant = "primary" | "secondary" | "danger" | "fab";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
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
    <ButtonRoot
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={className}
      $variant={variant}
      $size={size}
      $isFab={isFab}
      {...props}
    >
      {loading ? <Spinner /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </ButtonRoot>
  );
});

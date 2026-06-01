import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  label?: string;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  { pressed = false, onPressedChange, label, className, disabled, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={pressed}
      aria-label={label}
      disabled={disabled}
      onClick={() => onPressedChange?.(!pressed)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-pill border border-border-default transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary",
        pressed ? "bg-accent-primary" : "bg-bg-muted",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "inline-block size-4 rounded-full bg-bg-default shadow transition-transform",
          pressed ? "translate-x-5" : "translate-x-1",
        )}
      />
    </button>
  );
});

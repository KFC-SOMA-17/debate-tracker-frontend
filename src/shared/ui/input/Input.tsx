import { forwardRef, type InputHTMLAttributes } from "react";
import { SearchIcon } from "@/shared/ui/icons";
import { cn } from "@/shared/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  withSearchIcon?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, error, withSearchIcon, disabled, ...props },
  ref,
) {
  return (
    <div className={cn("relative w-full", disabled && "opacity-50")}>
      {withSearchIcon ? (
        <SearchIcon
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-muted"
          aria-hidden
        />
      ) : null}
      <input
        ref={ref}
        disabled={disabled}
        aria-invalid={error || undefined}
        className={cn(
          "h-10 w-full rounded-xl border border-border-default bg-bg-default px-3 text-sm text-text-primary placeholder:text-text-muted",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary",
          withSearchIcon && "pl-9",
          error && "border-status-danger",
          className,
        )}
        {...props}
      />
    </div>
  );
});

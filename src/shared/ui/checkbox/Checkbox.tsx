import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, label, id, disabled, ...props },
  ref,
) {
  const inputId = id ?? (typeof label === "string" ? label : undefined);

  return (
    <label
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 text-sm text-text-primary",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        disabled={disabled}
        className="size-4 rounded border-border-default text-accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
        {...props}
      />
      {label ? <span>{label}</span> : null}
    </label>
  );
});

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { ToggleRoot, ToggleThumb } from "./Toggle.styles";

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
    <ToggleRoot
      ref={ref}
      type="button"
      role="switch"
      aria-checked={pressed}
      aria-label={label}
      disabled={disabled}
      className={className}
      $pressed={pressed}
      $disabled={disabled}
      onClick={() => onPressedChange?.(!pressed)}
      {...props}
    >
      <ToggleThumb $pressed={pressed} />
    </ToggleRoot>
  );
});

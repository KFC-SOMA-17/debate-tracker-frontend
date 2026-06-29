import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { CheckboxInput, CheckboxLabel, CheckboxText } from "./Checkbox.styles";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, label, id, disabled, ...props },
  ref,
) {
  const inputId = id ?? (typeof label === "string" ? label : undefined);

  return (
    <CheckboxLabel className={className} $disabled={disabled}>
      <CheckboxInput ref={ref} id={inputId} type="checkbox" disabled={disabled} {...props} />
      {label ? <CheckboxText>{label}</CheckboxText> : null}
    </CheckboxLabel>
  );
});

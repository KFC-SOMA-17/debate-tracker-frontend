import { forwardRef, type InputHTMLAttributes } from "react";
import { SearchIcon } from "@/shared/ui/icons";
import { IconSlot } from "@/shared/ui/icons/IconSlot";
import { InputField, InputWrapper, SearchIconSlot } from "./Input.styles";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  withSearchIcon?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, error, withSearchIcon, disabled, ...props },
  ref,
) {
  return (
    <InputWrapper $disabled={disabled}>
      {withSearchIcon ? (
        <SearchIconSlot>
          <IconSlot $size="1rem">
            <SearchIcon aria-hidden />
          </IconSlot>
        </SearchIconSlot>
      ) : null}
      <InputField
        ref={ref}
        disabled={disabled}
        aria-invalid={error || undefined}
        className={className}
        $error={error}
        $withSearchIcon={withSearchIcon}
        {...props}
      />
    </InputWrapper>
  );
});

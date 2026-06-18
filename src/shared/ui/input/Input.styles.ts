import styled from "@emotion/styled";
import { focusRing } from "@/styles/mixins";

export const InputWrapper = styled.div<{ $disabled?: boolean }>`
  position: relative;
  width: 100%;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

export const SearchIconSlot = styled.span`
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: ${({ theme }) => theme.spacing[3]};
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.text.muted};
`;

export const InputField = styled.input<{
  $error?: boolean;
  $withSearchIcon?: boolean;
}>`
  height: 2.5rem;
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid
    ${({ theme, $error }) => ($error ? theme.colors.status.danger : theme.colors.border.default)};
  background-color: ${({ theme }) => theme.colors.bg.default};
  padding: 0 ${({ theme }) => theme.spacing[3]};
  padding-left: ${({ theme, $withSearchIcon }) => ($withSearchIcon ? "2.25rem" : theme.spacing[3])};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.primary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }

  ${focusRing}
`;

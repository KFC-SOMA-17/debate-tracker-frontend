import styled from "@emotion/styled";
import { focusRing } from "@/styles/mixins";

export const ToggleRoot = styled.button<{ $pressed: boolean; $disabled?: boolean }>`
  position: relative;
  display: inline-flex;
  height: 1.5rem;
  width: 2.75rem;
  flex-shrink: 0;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  transition: background-color 150ms;
  background-color: ${({ theme, $pressed }) =>
    $pressed ? theme.colors.accent.primary : theme.colors.bg.muted};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  ${focusRing}
`;

export const ToggleThumb = styled.span<{ $pressed: boolean }>`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.bg.default};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: transform 150ms;
  transform: translateX(${({ $pressed }) => ($pressed ? "1.25rem" : "0.25rem")});
`;

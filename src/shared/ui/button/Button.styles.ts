import styled from "@emotion/styled";
import type { ButtonSize, ButtonVariant } from "./Button";
import { disabledState, focusRing, hoverBrightness } from "@/styles/mixins";

export const ButtonRoot = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $isFab: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme, $size, $isFab }) => ($size === "lg" && !$isFab ? theme.fontSizes.base : theme.fontSizes.sm)};
  transition:
    filter 150ms,
    background-color 150ms,
    color 150ms;
  border: none;
  ${focusRing}
  ${({ $size, $isFab, theme }) => {
    if ($isFab) {
      const heights = { sm: "2.25rem", md: "2.75rem", lg: "3rem" };
      const gaps = { sm: "0.5rem", md: "0.625rem", lg: "0.75rem" };
      const paddings = { sm: "0 1rem", md: "0 1.5rem", lg: "0 2rem" };
      return `
        height: ${heights[$size]};
        gap: ${gaps[$size]};
        padding: ${paddings[$size]};
      `;
    }
    const heights = { sm: "1.75rem", md: "2.25rem", lg: "3rem" };
    const gaps = { sm: "0.375rem", md: "0.5rem", lg: "0.5rem" };
    const paddings = { sm: "0 0.75rem", md: "0 1rem", lg: "0 1.25rem" };
    return `
      height: ${heights[$size]};
      gap: ${gaps[$size]};
      padding: ${paddings[$size]};
      border-radius: ${theme.radii.xl};
    `;
  }}

  ${({ $variant, theme }) =>
    $variant === "primary" &&
    `
    background-color: ${theme.colors.accent.primary};
    color: ${theme.colors.text.inverse};
  `}

  ${({ $variant, theme }) =>
    $variant === "secondary" &&
    `
    background-color: ${theme.colors.bg.default};
    color: ${theme.colors.text.primary};
    border: 1px solid ${theme.colors.border.default};
    &:hover { background-color: ${theme.colors.bg.subtle}; }
    &:active { background-color: ${theme.colors.bg.muted}; }
  `}

  ${({ $variant, theme }) =>
    $variant === "danger" &&
    `
    background-color: ${theme.colors.status.danger};
    color: ${theme.colors.text.inverse};
  `}

  ${({ $variant, theme }) =>
    $variant === "fab" &&
    `
    background-color: ${theme.colors.accent.primary};
    color: ${theme.colors.text.inverse};
    border-radius: ${theme.radii.pill};
    box-shadow: ${theme.shadows.md};
  `}

  ${({ $variant }) => ($variant === "primary" || $variant === "danger" || $variant === "fab") && hoverBrightness}
  ${({ $variant }) => ($variant === "primary" || $variant === "danger" || $variant === "fab") && disabledState}
  ${({ $variant }) => $variant === "secondary" && disabledState}
`;

export const Spinner = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  animation: button-spin 1s linear infinite;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-top-color: transparent;

  @keyframes button-spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

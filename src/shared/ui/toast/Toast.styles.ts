import styled from "@emotion/styled";
import type { ToastPosition, ToastVariant } from "./Toast.types";
import { focusRing } from "@/styles/mixins";

const variantBorderColors: Record<ToastVariant, (theme: import("@/styles/theme").AppTheme) => string> = {
  default: (theme) => theme.colors.border.strong,
  success: (theme) => theme.colors.status.success,
  error: (theme) => theme.colors.status.danger,
};

export const ToastRoot = styled.div<{ $variant: ToastVariant }>`
  pointer-events: auto;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 280px;
  max-width: min(420px, calc(100vw - 2rem));
  gap: ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-left-width: 4px;
  border-left-color: ${({ theme, $variant }) => variantBorderColors[$variant](theme)};
  background-color: ${({ theme }) => theme.colors.bg.elevated};
  padding: ${({ theme }) => theme.spacing[4]};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ToastIconSlot = styled.span<{ $variant: "success" | "error" }>`
  flex-shrink: 0;
  color: ${({ theme, $variant }) =>
    $variant === "success" ? theme.colors.status.success : theme.colors.status.danger};
`;

export const ToastContent = styled.div`
  min-width: 0;
  flex: 1;
`;

export const ToastCloseButtonRoot = styled.button`
  display: inline-flex;
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: background-color 150ms, color 150ms;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.subtle};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  ${focusRing}
`;

export const ToastViewportRoot = styled.div`
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.toast};
`;

const positionStyles: Record<ToastPosition, string> = {
  "top-left": "top: 5%; left: 1rem; align-items: flex-start;",
  "top-center": "top: 5%; left: 50%; transform: translateX(-50%); align-items: center;",
  "top-right": "top: 5%; right: 1rem; align-items: flex-end;",
  "bottom-left": "bottom: 5%; left: 1rem; align-items: flex-start;",
  "bottom-center": "bottom: 5%; left: 50%; transform: translateX(-50%); align-items: center;",
  "bottom-right": "bottom: 5%; right: 1rem; align-items: flex-end;",
};

export const ToastPositionRegion = styled.div<{ $position: ToastPosition }>`
  pointer-events: none;
  position: absolute;
  display: flex;
  max-width: calc(100vw - 2rem);
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  ${({ $position }) => positionStyles[$position]}
`;

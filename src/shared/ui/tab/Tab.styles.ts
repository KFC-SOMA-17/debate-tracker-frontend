import styled from "@emotion/styled";
import type { TabStyle } from "./Tab";
import { focusRing } from "@/styles/mixins";

export const TabsRoot = styled.div`
  width: 100%;
`;

export const TabList = styled.div<{ $tabStyle: TabStyle }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};

  ${({ $tabStyle, theme }) =>
    $tabStyle === "underline" &&
    `
    border-bottom: 1px solid ${theme.colors.border.default};
  `}

  ${({ $tabStyle, theme }) =>
    $tabStyle === "pill" &&
    `
    border-radius: ${theme.radii.xl};
    background-color: ${theme.colors.bg.muted};
    padding: ${theme.spacing[1]};
  `}
`;

export const TabButton = styled.button<{
  $tabStyle: TabStyle;
  $isActive: boolean;
  $disabled?: boolean;
}>`
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: color 150ms, background-color 150ms, border-color 150ms;
  border: none;
  background: none;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  ${focusRing}

  ${({ $tabStyle, $isActive, theme }) =>
    $tabStyle === "underline" &&
    `
    color: ${$isActive ? theme.colors.accent.primary : theme.colors.text.secondary};
    border-bottom: 2px solid ${$isActive ? theme.colors.accent.primary : "transparent"};
    margin-bottom: -1px;

    &:hover {
      color: ${theme.colors.text.primary};
    }
  `}

  ${({ $tabStyle, $isActive, theme }) =>
    $tabStyle === "pill" &&
    `
    color: ${$isActive ? theme.colors.text.primary : theme.colors.text.secondary};
    border-radius: ${theme.radii.lg};
    box-shadow: ${$isActive ? theme.shadows.sm : "none"};
    background-color: ${$isActive ? theme.colors.bg.default : "transparent"};

    &:hover {
      color: ${theme.colors.text.primary};
    }
  `}
`;

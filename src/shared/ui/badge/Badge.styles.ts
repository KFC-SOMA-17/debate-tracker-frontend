import styled from "@emotion/styled";
import type { BadgeTone, BadgeVariant } from "./Badge";

export const BadgeRoot = styled.span<{
  $variant: BadgeVariant;
  $tone: BadgeTone;
}>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.xs};

  ${({ $variant, theme }) => {
    switch ($variant) {
      case "status":
        return `
          border-radius: ${theme.radii.pill};
          padding: ${theme.spacing[1]} ${theme.spacing[3]};
        `;
      case "speaker":
        return `
          border-radius: ${theme.radii.md};
          padding: 0.125rem ${theme.spacing[2]};
        `;
      case "evidence":
        return `
          height: 1.25rem;
          min-height: 1.25rem;
          align-items: center;
          justify-content: center;
          border-radius: ${theme.radii.sm};
          padding: 0 ${theme.spacing[2]};
          line-height: 1;
          border: 1px solid transparent;
        `;
      case "neutral":
        return `
          border-radius: ${theme.radii.pill};
          padding: 0.125rem 0.625rem;
        `;
    }
  }}

  ${({ $tone, theme, $variant }) => {
    const border =
      $variant === "evidence" ? `border-color: ${theme.colors.border.default};` : "";
    switch ($tone) {
      case "default":
        return `
          background-color: ${theme.colors.bg.muted};
          color: ${theme.colors.text.primary};
          ${border}
        `;
      case "success":
        return `
          background-color: ${theme.colors.status.successSubtle};
          color: ${theme.colors.status.success};
          ${border}
        `;
      case "warning":
        return `
          background-color: ${theme.colors.status.warningSubtle};
          color: ${theme.colors.status.warning};
          ${border}
        `;
      case "danger":
        return `
          background-color: ${theme.colors.status.dangerSubtle};
          color: ${theme.colors.status.danger};
          ${border}
        `;
      case "info":
        return `
          background-color: ${theme.colors.status.infoSubtle};
          color: ${theme.colors.accent.secondary};
          ${border}
        `;
      case "pros":
        return `
          background-color: ${theme.colors.stance.prosSubtle};
          color: ${theme.colors.stance.pros};
          ${border}
        `;
      case "muted":
        return `
          background-color: ${theme.colors.status.mutedSubtle};
          color: ${theme.colors.text.primary};
          ${border}
        `;
    }
  }}
`;

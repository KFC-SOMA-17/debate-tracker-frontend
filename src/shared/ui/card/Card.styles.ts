import styled from "@emotion/styled";
import type { CardPadding } from "./Card";

const paddingMap: Record<CardPadding, string> = {
  none: "0",
  sm: "0.75rem",
  md: "1rem",
  lg: "1.5rem",
};

export const CardRoot = styled.div<{
  $padding: CardPadding;
  $elevated: boolean;
}>`
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme, $elevated }) =>
    $elevated ? theme.colors.bg.elevated : theme.colors.bg.default};
  padding: ${({ $padding }) => paddingMap[$padding]};
`;

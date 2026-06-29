import styled from "@emotion/styled";
import type { ClaimStance } from "../types/agendaSummary";

export const Column = styled.div<{ $stance: ClaimStance }>`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  padding-top: ${({ theme }) => theme.spacing[4]};
  padding-bottom: ${({ theme }) => theme.spacing[4]};
  padding-right: ${({ theme, $stance }) => ($stance === "PROS" ? theme.spacing[6] : 0)};
  padding-left: ${({ theme, $stance }) => ($stance === "CONS" ? theme.spacing[6] : 0)};
  border-left: ${({ theme, $stance }) =>
    $stance === "CONS"
      ? `1px solid color-mix(in srgb, ${theme.colors.border.default} 50%, transparent)`
      : "none"};
`;

export const Heading = styled.h3<{ $stance: ClaimStance }>`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme, $stance }) =>
    $stance === "PROS" ? theme.colors.stance.pros : theme.colors.status.danger};
`;

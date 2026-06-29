import styled from "@emotion/styled";
import { IconSlot } from "@/shared/ui/icons/IconSlot";
import { focusRing } from "@/styles/mixins";

export const RailRoot = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-right: 1px solid ${({ theme }) => theme.colors.border.default};
  background-color: color-mix(in srgb, ${({ theme }) => theme.colors.bg.muted} 30%, transparent);
`;

export const ExpandButton = styled.button`
  display: flex;
  height: 6.375rem;
  width: 100%;
  max-width: 2.65rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  border: none;
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.bg.default};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: background-color 150ms ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.subtle};
  }

  ${focusRing}
`;

export const ChevronIconSlot = styled(IconSlot)<{ $flip?: boolean }>`
  color: ${({ theme }) => theme.colors.text.secondary};
  transform: ${({ $flip }) => ($flip ? "rotate(180deg)" : "none")};
`;

export const RailLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  writing-mode: horizontal-tb;
`;

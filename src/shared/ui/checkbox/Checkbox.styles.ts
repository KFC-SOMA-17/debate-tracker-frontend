import styled from "@emotion/styled";
import { focusRing } from "@/styles/mixins";

export const CheckboxLabel = styled.label<{ $disabled?: boolean }>`
  display: inline-flex;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

export const CheckboxInput = styled.input`
  width: 1rem;
  height: 1rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  border-color: ${({ theme }) => theme.colors.border.default};
  color: ${({ theme }) => theme.colors.accent.primary};
  ${focusRing}
`;

export const CheckboxText = styled.span``;

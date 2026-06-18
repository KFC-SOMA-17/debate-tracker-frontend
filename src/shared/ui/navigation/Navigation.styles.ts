import styled from "@emotion/styled";
import { focusRing } from "@/styles/mixins";

export const NavigationRoot = styled.nav`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
`;

export const NavigationList = styled.ul`
  display: flex;
  gap: 0;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const NavigationItem = styled.li``;

export const NavigationButton = styled.button<{
  $isActive: boolean;
  $disabled?: boolean;
}>`
  position: relative;
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[6]}`};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: color 150ms;
  border: none;
  background: none;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.accent.primary : theme.colors.text.secondary};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  ${focusRing}

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const NavigationActiveIndicator = styled.span`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.accent.primary};
`;

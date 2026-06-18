import styled from "@emotion/styled";

export const GripRoot = styled.div`
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.125rem;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.bg.muted};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[1]};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const GripStripe = styled.span`
  height: ${({ theme }) => theme.spacing[4]};
  width: 1px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background-color: ${({ theme }) => theme.colors.border.strong};
`;

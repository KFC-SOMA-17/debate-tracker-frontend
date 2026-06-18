import styled from "@emotion/styled";

export const StepProgressRoot = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StepNodeRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const StepCircle = styled.div<{
  $status: "upcoming" | "current" | "completed";
}>`
  display: flex;
  width: 1.75rem;
  height: 1.75rem;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  ${({ $status, theme }) =>
    $status === "upcoming" &&
    `
    border: 2px solid ${theme.colors.border.default};
    background-color: ${theme.colors.bg.default};
    color: ${theme.colors.text.muted};
  `}

  ${({ $status, theme }) =>
    ($status === "current" || $status === "completed") &&
    `
    background-color: ${theme.colors.accent.primary};
    color: ${theme.colors.text.inverse};
  `}
`;

export const StepLabel = styled.span<{ $isActive: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  white-space: nowrap;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.accent.primary : theme.colors.text.muted};
`;

export const StepConnector = styled.div<{ $active: boolean }>`
  margin-bottom: 1.25rem;
  height: 1px;
  width: 5rem;
  flex-shrink: 0;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.accent.primary : theme.colors.border.default};
`;

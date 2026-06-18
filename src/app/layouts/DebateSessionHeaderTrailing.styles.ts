import styled from "@emotion/styled";

export const ElapsedTime = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

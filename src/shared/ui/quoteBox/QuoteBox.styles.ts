import styled from "@emotion/styled";

export const QuoteBoxRoot = styled.blockquote`
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.border.subtle};
  background-color: ${({ theme }) => theme.colors.bg.subtle};
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[5]}`};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.primary};
`;

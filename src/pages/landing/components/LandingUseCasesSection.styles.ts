import styled from "@emotion/styled";

export const UseCasesSection = styled.section`
  padding: ${({ theme }) => `${theme.spacing[20]} ${theme.spacing[6]}`};
  background: ${({ theme }) => theme.colors.landing.usecaseGradient};
`;

export const UseCasesInner = styled.div`
  margin: 0 auto;
  max-width: 64rem;
`;

export const UseCasesTitle = styled.h2`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  line-height: 2.25rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

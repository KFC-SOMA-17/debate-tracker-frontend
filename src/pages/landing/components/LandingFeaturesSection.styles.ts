import styled from "@emotion/styled";

export const FeaturesSection = styled.section`
  background-color: ${({ theme }) => theme.colors.bg.subtle};
  padding: ${({ theme }) => `${theme.spacing[20]} ${theme.spacing[6]}`};
`;

export const FeaturesInner = styled.div`
  margin: 0 auto;
  max-width: 64rem;
`;

import styled from "@emotion/styled";

export const CtaSection = styled.section`
  padding: ${({ theme }) => `${theme.spacing[24]} ${theme.spacing[6]}`};
`;

export const CtaInner = styled.div`
  margin: 0 auto;
  display: flex;
  max-width: 42rem;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const CtaTitle = styled.h2`
  margin-top: ${({ theme }) => theme.spacing[6]};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  line-height: 2.25rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const CtaDescription = styled.p`
  margin-top: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.muted};
`;

export const CtaButtonWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing[8]};
`;

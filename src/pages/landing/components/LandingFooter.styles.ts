import styled from "@emotion/styled";

export const FooterRoot = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border.subtle};
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[6]}`};
`;

export const FooterInner = styled.div`
  margin: 0 auto;
  display: flex;
  max-width: 72rem;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

export const FooterBrand = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const FooterBrandName = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const FooterTagline = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
`;

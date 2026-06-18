import styled from "@emotion/styled";

export const ComparisonSection = styled.section`
  padding: ${({ theme }) => `${theme.spacing[20]} ${theme.spacing[6]}`};
`;

export const ComparisonInner = styled.div`
  margin: 0 auto;
  max-width: 56rem;
`;

export const ComparisonTable = styled.div`
  margin-top: 3.5rem;
  overflow: hidden;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.bg.elevated};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const ComparisonHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.subtle};
  background-color: ${({ theme }) => theme.colors.bg.subtle};
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[6]}`};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const ComparisonHeaderLabel = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.muted};
`;

export const ComparisonHeaderBrand = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ComparisonHeaderGeneric = styled.span`
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.muted};
`;

export const ComparisonRow = styled.div<{ $hasBorder: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  padding: 0.875rem ${({ theme }) => theme.spacing[6]};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  ${({ $hasBorder, theme }) =>
    $hasBorder &&
    `
    border-bottom: 1px solid ${theme.colors.border.subtle};
  `}
`;

export const ComparisonFeature = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ComparisonCell = styled.span`
  display: flex;
  justify-content: center;
`;

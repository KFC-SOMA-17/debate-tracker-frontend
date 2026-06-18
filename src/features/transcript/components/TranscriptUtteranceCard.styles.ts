import styled from "@emotion/styled";

export const Article = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.bg.subtle};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
`;

export const Header = styled.header`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const Time = styled.time`
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Content = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.primary};
`;

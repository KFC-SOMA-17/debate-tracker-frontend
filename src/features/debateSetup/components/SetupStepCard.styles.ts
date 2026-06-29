import styled from "@emotion/styled";

export const Card = styled.article`
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.bg.elevated};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const Header = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.subtle};
  padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[8]}
    ${({ theme }) => theme.spacing[6]};
`;

export const Footer = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border.subtle};
  padding: ${({ theme }) => theme.spacing[5]} ${({ theme }) => theme.spacing[8]};
`;

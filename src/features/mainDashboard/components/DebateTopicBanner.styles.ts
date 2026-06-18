import styled from "@emotion/styled";

export const BannerRoot = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  border: 1px solid ${({ theme }) => theme.colors.accent.primarySubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  background-color: color-mix(in srgb, ${({ theme }) => theme.colors.accent.primary} 5%, transparent);
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
`;

export const BannerBadge = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.accent.primary};
`;

export const BannerTopic = styled.span<{ $hasTopic: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme, $hasTopic }) => ($hasTopic ? theme.colors.text.primary : theme.colors.text.secondary)};
`;

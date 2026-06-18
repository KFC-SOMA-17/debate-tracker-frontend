import styled from "@emotion/styled";

export const StoryRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const StoryRowEnd = styled(StoryRow)`
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const StoryColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

export const StoryFullscreenShell = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.bg.subtle};
`;

export const StoryMain = styled.main`
  padding: ${({ theme }) => theme.spacing[6]};
`;

export const StoryMainRow = styled(StoryMain)`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const StorySecondaryText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const StoryLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const StoryPlaceholder = styled.div`
  min-height: 0;
  flex: 1;
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px dashed ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.bg.subtle};
`;

export const StoryTimer = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

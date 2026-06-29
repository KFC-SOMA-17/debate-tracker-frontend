import styled from "@emotion/styled";
import { focusRing } from "@/styles/mixins";

export const ModalHeaderRoot = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.subtle};
  padding: ${({ theme }) => `${theme.spacing[5]} ${theme.spacing[6]}`};
`;

export const ModalHeaderContent = styled.div`
  min-width: 0;
  flex: 1;
`;

export const ModalHeaderTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ModalHeaderDescription = styled.p<{ $hasTitle: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ $hasTitle, theme }) => ($hasTitle ? theme.spacing[1] : 0)};
`;

export const ModalBodyRoot = styled.div<{ $fullscreen: boolean }>`
  min-height: 0;
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => `${theme.spacing[5]} ${theme.spacing[6]}`};

  ${({ $fullscreen }) =>
    $fullscreen &&
    `
    display: flex;
    flex-direction: column;
  `}
`;

export const ModalFooterRoot = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing[3]};
  border-top: 1px solid ${({ theme }) => theme.colors.border.subtle};
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[6]}`};
`;

export const ModalCloseButtonRoot = styled.button`
  display: inline-flex;
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.bg.default};
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: background-color 150ms, color 150ms;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.subtle};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  ${focusRing}
`;

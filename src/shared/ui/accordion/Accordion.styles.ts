import styled from "@emotion/styled";
import { focusRing } from "@/styles/mixins";

export const AccordionRoot = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const AccordionItemRoot = styled.div`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
`;

export const AccordionTrigger = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[3]};
  background-color: ${({ theme }) => theme.colors.bg.default};
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  text-align: left;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  cursor: pointer;
  ${focusRing}
`;

export const AccordionChevronSlot = styled.span<{ $isOpen: boolean }>`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.text.muted};
  transition: transform 150ms;
  transform: rotate(${({ $isOpen }) => ($isOpen ? "180deg" : "0deg")});
`;

export const AccordionPanel = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border.subtle};
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

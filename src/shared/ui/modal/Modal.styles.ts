import styled from "@emotion/styled";
import type { ModalSize } from "./Modal.types";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: color-mix(in srgb, ${({ theme }) => theme.colors.bg.inverse} 50%, transparent);
  padding: ${({ theme }) => theme.spacing[4]};
`;

export const ModalPanel = styled.div<{ $size: ModalSize }>`
  display: flex;
  max-height: calc(100vh - 2rem);
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.bg.elevated};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  outline: none;

  ${({ $size, theme }) =>
    $size === "dialog" &&
    `
    max-width: 32rem;
    border-radius: ${theme.radii.xl};
  `}

  ${({ $size, theme }) =>
    $size === "fullscreen" &&
    `
    height: calc(100vh - 2rem);
    max-width: calc(100vw - 2rem);
    border-radius: ${theme.radii.xl};
  `}
`;

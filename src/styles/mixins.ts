import { css } from "@emotion/react";
import { theme } from "./theme";

export const focusRing = css`
  &:focus-visible {
    outline: 2px solid ${theme.colors.accent.primary};
    outline-offset: 2px;
  }
`;

export const disabledState = css`
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;

export const hoverBrightness = css`
  &:hover {
    filter: brightness(0.95);
  }

  &:active {
    filter: brightness(0.9);
  }
`;

export const hideScrollbar = css`
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const heroTitleAccent = css`
  background: linear-gradient(
    90deg,
    ${theme.colors.accent.primary} 0%,
    ${theme.colors.accent.secondary} 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

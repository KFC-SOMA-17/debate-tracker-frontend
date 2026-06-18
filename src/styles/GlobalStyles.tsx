import { Global, css } from "@emotion/react";
import { theme } from "./theme";

const globalStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    height: 100%;
    overflow: hidden;
  }

  body {
    margin: 0;
    font-family: ${theme.fonts.body};
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.bg.default};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-family: ${theme.fonts.display};
    color: ${theme.colors.text.primary};
  }

  h1 {
    font-size: ${theme.fontSizes.titleLg};
    line-height: ${theme.lineHeights.titleLg};
  }

  h2 {
    font-size: ${theme.fontSizes.titleMd};
    line-height: ${theme.lineHeights.titleMd};
  }

  h3,
  h4,
  h5,
  h6 {
    font-size: ${theme.fontSizes.titleSm};
    line-height: ${theme.lineHeights.titleSm};
  }

  p,
  li {
    margin: 0;
    font-size: ${theme.fontSizes.bodyMd};
    line-height: ${theme.lineHeights.bodyMd};
  }

  small {
    font-size: ${theme.fontSizes.bodySm};
    line-height: ${theme.lineHeights.bodySm};
    color: ${theme.colors.text.secondary};
  }

  code,
  pre,
  kbd,
  samp {
    font-family: ${theme.fonts.code};
  }

  button {
    font: inherit;
    cursor: pointer;
  }
`;

export function GlobalStyles() {
  return <Global styles={globalStyles} />;
}

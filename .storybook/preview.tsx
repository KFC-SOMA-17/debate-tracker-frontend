import type { Preview } from "@storybook/react-vite";
import { ThemeProvider } from "@emotion/react";
import { GlobalStyles, theme } from "../src/styles";

const preview: Preview = {
  decorators: [
    Story => (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    backgrounds: {
      default: "default",
      values: [
        { name: "default", value: theme.colors.bg.default },
        { name: "subtle", value: theme.colors.bg.subtle },
      ],
    },
  },
  tags: ["autodocs"],
};

export default preview;

import type { Preview } from "@storybook/react-vite";
import "../src/index.css";

const preview: Preview = {
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
        { name: "default", value: "var(--color-bg-default)" },
        { name: "subtle", value: "var(--color-bg-subtle)" },
      ],
    },
  },
  tags: ["autodocs"],
};

export default preview;

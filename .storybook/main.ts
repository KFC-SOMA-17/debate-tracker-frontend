import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import type { StorybookConfig } from "@storybook/react-vite";
import svgr from "vite-plugin-svgr";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
  ],
  framework: "@storybook/react-vite",
  viteFinal: async (config) => {
    config.resolve ??= {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(rootDir, "../src"),
    };
    config.plugins = [...(config.plugins ?? []), svgr(), tailwindcss()];
    return config;
  },
};

export default config;

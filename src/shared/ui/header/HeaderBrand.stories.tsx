import type { Meta, StoryObj } from "@storybook/react-vite";
import { HeaderBrand } from "./HeaderBrand";

const meta = {
  title: "Shared/UI/HeaderBrand",
  component: HeaderBrand,
  tags: ["autodocs"],
} satisfies Meta<typeof HeaderBrand>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const meta = {
  title: "Shared/UI/Input",
  component: Input,
  tags: ["autodocs"],
  args: { placeholder: "검색..." },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Search: Story = {
  args: { withSearchIcon: true, placeholder: "발화 검색" },
};

export const Error: Story = {
  args: { error: true, defaultValue: "잘못된 입력" },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "비활성" },
};

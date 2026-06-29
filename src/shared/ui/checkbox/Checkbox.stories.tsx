import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Shared/UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "옵션 선택" },
};

export const Checked: Story = {
  args: { label: "선택됨", defaultChecked: true },
};

export const Disabled: Story = {
  args: { label: "비활성", disabled: true },
};

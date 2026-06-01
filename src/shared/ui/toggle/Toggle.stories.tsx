import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Toggle } from "./Toggle";

const meta = {
  title: "Shared/UI/Toggle",
  component: Toggle,
  tags: ["autodocs"],
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {
  args: { label: "알림", pressed: false },
};

export const On: Story = {
  args: { label: "알림", pressed: true },
};

export const Interactive: Story = {
  args: { label: "실시간 요약", pressed: false },
  render: function Render(args) {
    const [pressed, setPressed] = useState(args.pressed ?? false);
    return <Toggle {...args} pressed={pressed} onPressedChange={setPressed} />;
  },
};

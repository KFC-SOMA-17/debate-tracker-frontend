import type { Meta, StoryObj } from "@storybook/react-vite";
import { NetworkIcon } from "@/shared/ui/icons";
import { Button } from "./Button";

const meta = {
  title: "Shared/UI/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "버튼",
    variant: "primary",
    size: "md",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "fab"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: "Default", variant: "primary" },
};

export const PrimaryHover: Story = {
  args: { children: "Hover", variant: "primary", className: "brightness-95" },
};

export const PrimaryDisabled: Story = {
  args: { children: "Disabled", variant: "primary", disabled: true },
};

export const PrimaryLoading: Story = {
  args: { children: "Loading", variant: "primary", loading: true },
};

export const PrimarySizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Secondary: Story = {
  args: { children: "Default", variant: "secondary" },
};

export const SecondaryWithIcon: Story = {
  args: {
    children: "With Icon",
    variant: "secondary",
    leftIcon: <NetworkIcon className="size-4" aria-hidden />,
  },
};

export const Danger: Story = {
  args: { children: "토론 종료", variant: "danger" },
};

export const FloatingAction: Story = {
  args: {
    children: "실시간 주장 트리",
    variant: "fab",
    leftIcon: <NetworkIcon className="size-5" aria-hidden />,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="fab" leftIcon={<NetworkIcon className="size-5" aria-hidden />}>
        FAB
      </Button>
    </div>
  ),
};

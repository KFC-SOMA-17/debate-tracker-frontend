import type { Meta, StoryObj } from "@storybook/react-vite";
import { NetworkIcon } from "@/shared/ui/icons";
import { IconSlot } from "@/shared/ui/icons/IconSlot";
import { StoryColumn, StoryRowEnd } from "@/shared/ui/stories/StoryLayout.styles";
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
  args: { children: "Hover", variant: "primary" },
  parameters: { pseudo: { hover: true } },
};

export const PrimaryDisabled: Story = {
  args: { children: "Disabled", variant: "primary", disabled: true },
};

export const PrimaryLoading: Story = {
  args: { children: "Loading", variant: "primary", loading: true },
};

export const PrimarySizes: Story = {
  render: () => (
    <StoryRowEnd>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </StoryRowEnd>
  ),
};

export const Secondary: Story = {
  args: { children: "Default", variant: "secondary" },
};

export const SecondaryWithIcon: Story = {
  args: {
    children: "With Icon",
    variant: "secondary",
    leftIcon: (
      <IconSlot $size="1rem">
        <NetworkIcon aria-hidden />
      </IconSlot>
    ),
  },
};

export const Danger: Story = {
  args: { children: "토론 종료", variant: "danger" },
};

export const FloatingAction: Story = {
  args: {
    children: "실시간 주장 트리",
    variant: "fab",
    leftIcon: (
      <IconSlot $size="1.25rem">
        <NetworkIcon aria-hidden />
      </IconSlot>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <StoryColumn>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button
        variant="fab"
        leftIcon={
          <IconSlot $size="1.25rem">
            <NetworkIcon aria-hidden />
          </IconSlot>
        }
      >
        FAB
      </Button>
    </StoryColumn>
  ),
};

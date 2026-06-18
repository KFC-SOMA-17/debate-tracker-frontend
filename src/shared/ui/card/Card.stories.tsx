import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryColumn, StorySecondaryText } from "@/shared/ui/stories/StoryLayout.styles";
import { Card } from "./Card";

const meta = {
  title: "Shared/UI/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <StorySecondaryText>카드 프리미티브 — 도메인 콘텐츠는 children으로 전달합니다.</StorySecondaryText>
    ),
  },
};

export const PaddingVariants: Story = {
  render: () => (
    <StoryColumn>
      <Card padding="sm">Small padding</Card>
      <Card padding="md">Medium padding</Card>
      <Card padding="lg">Large padding</Card>
    </StoryColumn>
  ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
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
    children: <p className="text-sm text-text-secondary">카드 프리미티브 — 도메인 콘텐츠는 children으로 전달합니다.</p>,
  },
};

export const PaddingVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card padding="sm">Small padding</Card>
      <Card padding="md">Medium padding</Card>
      <Card padding="lg">Large padding</Card>
    </div>
  ),
};

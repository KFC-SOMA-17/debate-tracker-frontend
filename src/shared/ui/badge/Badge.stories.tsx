import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryRow } from "@/shared/ui/stories/StoryLayout.styles";
import { Badge } from "./Badge";

const meta = {
  title: "Shared/UI/Badge",
  component: Badge,
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Status: Story = {
  args: { variant: "status", tone: "info", children: "토론 진행 중" },
};

export const Speaker: Story = {
  args: { variant: "speaker", children: "발화자 A" },
};

export const Evidence: Story = {
  args: { variant: "evidence", tone: "muted", children: "통계" },
};

export const Tones: Story = {
  render: () => (
    <StoryRow>
      <Badge tone="default">Default</Badge>
      <Badge tone="success">Success</Badge>
      <Badge tone="warning">Warning</Badge>
      <Badge tone="danger">Danger</Badge>
      <Badge tone="info">Info</Badge>
      <Badge tone="muted">Muted</Badge>
    </StoryRow>
  ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Navigation } from "./Navigation";

const items = [
  { id: "dashboard", label: "메인 대시보드" },
  { id: "team", label: "팀별 분석" },
  { id: "personal", label: "개인별 분석", disabled: true },
];

const meta = {
  title: "Shared/UI/Navigation",
  component: Navigation,
  tags: ["autodocs"],
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ActiveDashboard: Story = {
  args: { items, activeId: "dashboard" },
};

export const ActiveTeam: Story = {
  args: { items, activeId: "team" },
};

export const Interactive: Story = {
  args: { items, activeId: "dashboard" },
  render: function Render(args) {
    const [activeId, setActiveId] = useState(args.activeId);
    return <Navigation {...args} activeId={activeId} onNavigate={setActiveId} />;
  },
};

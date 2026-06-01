import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Tabs } from "./Tab";

const issueTabs = [
  { id: "issue-1", label: "쟁점 1" },
  { id: "issue-2", label: "쟁점 2" },
  { id: "issue-3", label: "쟁점 3" },
];

const speakerTabs = [
  { id: "speaker-a", label: "발화자 A" },
  { id: "speaker-b", label: "발화자 B" },
];

const meta = {
  title: "Shared/UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IssueTab: Story = {
  args: { items: issueTabs, activeId: "issue-1", ariaLabel: "쟁점 탭" },
};

export const SpeakerTab: Story = {
  args: {
    items: speakerTabs,
    activeId: "speaker-a",
    tabStyle: "pill",
    ariaLabel: "발화자 탭",
  },
};

export const Interactive: Story = {
  args: { items: issueTabs, activeId: "issue-1", ariaLabel: "쟁점 탭" },
  render: function Render(args) {
    const [activeId, setActiveId] = useState(args.activeId);
    return <Tabs {...args} activeId={activeId} onValueChange={setActiveId} />;
  },
};

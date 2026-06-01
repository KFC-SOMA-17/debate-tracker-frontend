import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion } from "./Accordion";

const meta = {
  title: "Shared/UI/Accordion",
  component: Accordion,
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EvidenceAccordion: Story = {
  args: {
    items: [
      {
        id: "evidence-1",
        title: "근거 1 — 통계 자료",
        defaultOpen: true,
        children: <p>2024년 설문 조사에 따르면 응답자의 62%가 AI 창작물을 예술로 인식합니다.</p>,
      },
      {
        id: "evidence-2",
        title: "근거 2 — 전문가 의견",
        children: <p>미술 평론가 A는 창작 의도의 가시성을 핵심 기준으로 제시합니다.</p>,
      },
    ],
  },
};

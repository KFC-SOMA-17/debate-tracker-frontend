import type { Meta, StoryObj } from "@storybook/react-vite";
import { QuoteBox } from "./QuoteBox";

const meta = {
  title: "Shared/UI/QuoteBox",
  component: QuoteBox,
  tags: ["autodocs"],
} satisfies Meta<typeof QuoteBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children:
      '"AI 창작물은 인간의 의도를 확장하는 도구를 통해 만들어진 결과물이므로 예술로 볼 수 있습니다."',
  },
};

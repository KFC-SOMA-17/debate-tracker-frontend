import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/shared/ui/button";
import { FileTextIcon } from "@/shared/ui/icons";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { LoadingState } from "./LoadingState";

const meta = {
  title: "Shared/UI/Feedback",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  render: () => (
    <EmptyState
      icon={<FileTextIcon className="size-12" />}
      title="아직 발화 데이터가 없습니다"
      description="토론이 시작되면 실시간으로 표시됩니다"
    />
  ),
};

export const Loading: Story = {
  render: () => <LoadingState title="분석 생성 중" description="잠시만 기다려 주세요..." />,
};

export const Error: Story = {
  render: () => (
    <ErrorState
      title="STT 연결에 실패했습니다"
      description="마이크 권한을 확인해 주세요"
      action={<Button variant="secondary">다시 시도</Button>}
    />
  ),
};

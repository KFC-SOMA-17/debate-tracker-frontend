import { useState } from "react";
import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/shared/ui/button";
import { AppHeader, HeaderBrand } from "@/shared/ui/header";
import { Modal } from "@/shared/ui/modal";
import {
  StoryFullscreenShell,
  StoryMainRow,
  StoryRow,
  StorySecondaryText,
} from "@/shared/ui/stories/StoryLayout.styles";
import { TOAST_POSITIONS, ToastProvider, useToast, type ToastPosition, type ToastVariant } from "./index";

const withToastProvider: Decorator = (Story) => (
  <ToastProvider defaultPosition="top-center" defaultDuration={3000}>
    <Story />
  </ToastProvider>
);

function ToastDemo({
  variant,
  duration,
  position,
  content,
}: {
  variant?: ToastVariant;
  duration?: number | false;
  position?: ToastPosition;
  content?: string;
}) {
  const { toast } = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          variant,
          duration,
          position,
          content: content ?? "알림 메시지입니다.",
        })
      }
    >
      Toast 표시
    </Button>
  );
}

function VariantsDemo() {
  const { toast } = useToast();

  return (
    <StoryRow>
      <Button variant="secondary" onClick={() => toast({ content: "일반 알림입니다.", variant: "default" })}>
        Default
      </Button>
      <Button onClick={() => toast({ content: "저장되었습니다.", variant: "success" })}>Success</Button>
      <Button variant="danger" onClick={() => toast({ content: "요청에 실패했습니다.", variant: "error" })}>
        Error
      </Button>
    </StoryRow>
  );
}

function DurationDemo() {
  const { toast } = useToast();

  return (
    <StoryRow>
      <Button onClick={() => toast({ content: "3초 후 자동으로 닫힙니다.", variant: "success", duration: 3000 })}>
        3초 자동 닫힘
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast({ content: "닫기 버튼을 누를 때까지 유지됩니다.", variant: "error", duration: false })}
      >
        무기한
      </Button>
    </StoryRow>
  );
}

function PositionsDemo() {
  const { toast } = useToast();

  return (
    <StoryRow>
      {TOAST_POSITIONS.map((position) => (
        <Button
          key={position}
          variant="secondary"
          onClick={() => toast({ content: position, position, duration: false })}
        >
          {position}
        </Button>
      ))}
    </StoryRow>
  );
}

function StackingDemo() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        for (let index = 1; index <= 5; index += 1) {
          toast({ content: `스택 ${index}`, variant: "default", position: "top-center" });
        }
      }}
    >
      top-center에 5개 연속 표시 (max 3)
    </Button>
  );
}

function WithModalDemo() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  return (
    <StoryFullscreenShell>
      <AppHeader brand={<HeaderBrand />} trailing={null} />
      <StoryMainRow>
        <Button onClick={() => setOpen(true)}>모달 열기</Button>
        <Button
          variant="secondary"
          onClick={() => toast({ content: "모달 위에 표시되는 Toast입니다.", variant: "success" })}
        >
          Toast 표시
        </Button>
      </StoryMainRow>
      <Modal open={open} onOpenChange={setOpen} size="dialog">
        <Modal.Header title="토론 주제 입력" description="모달이 열린 상태에서도 Toast가 위에 보입니다." />
        <Modal.Body>
          <StorySecondaryText>Toast 버튼을 눌러 z-index 동작을 확인하세요.</StorySecondaryText>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </StoryFullscreenShell>
  );
}

const meta = {
  title: "Shared/UI/Toast",
  component: ToastDemo,
  tags: ["autodocs"],
  decorators: [withToastProvider],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ToastDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ToastDemo />,
};

export const Variants: Story = {
  render: () => <VariantsDemo />,
};

export const Duration: Story = {
  render: () => <DurationDemo />,
};

export const Positions: Story = {
  render: () => <PositionsDemo />,
};

export const Stacking: Story = {
  render: () => <StackingDemo />,
};

export const WithModal: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => <WithModalDemo />,
};

export const Success: Story = {
  render: () => <ToastDemo variant="success" content="저장되었습니다." />,
};

export const ErrorPersistent: Story = {
  render: () => <ToastDemo variant="error" duration={false} content="네트워크 오류가 발생했습니다." />,
};

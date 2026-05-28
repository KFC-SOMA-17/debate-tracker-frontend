import { useState, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { AppHeader, HeaderBrand } from "@/shared/ui/header";
import { Modal } from "./index";
import type { ModalSize } from "./modal-context";

function ModalStoryShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-subtle">
      <AppHeader brand={<HeaderBrand />} trailing={null} />
      <main className="p-6">{children}</main>
    </div>
  );
}

function DialogTopicInputDemo() {
  const [open, setOpen] = useState(false);

  return (
    <ModalStoryShell>
      <Button onClick={() => setOpen(true)}>모달 열기</Button>
      <Modal open={open} onOpenChange={setOpen} size="dialog">
        <Modal.Header
          title="토론 주제 입력"
          description="토론을 시작하기 전에 주제를 입력해 주세요."
        />
        <Modal.Body>
          <label className="flex flex-col gap-2 text-sm font-medium text-text-primary">
            토론 주제
            <Input placeholder="예: AI는 인간의 일자리를 대체해야 하는가?" />
          </label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button>토론 시작</Button>
        </Modal.Footer>
      </Modal>
    </ModalStoryShell>
  );
}

function DialogConfirmDemo() {
  const [open, setOpen] = useState(false);

  return (
    <ModalStoryShell>
      <Button onClick={() => setOpen(true)}>모달 열기</Button>
      <Modal open={open} onOpenChange={setOpen} size="dialog">
        <Modal.Header
          title="토론을 종료할까요?"
          description="종료 후에는 실시간 속기록이 더 이상 갱신되지 않습니다."
        />
        <Modal.Body>
          <p className="text-sm text-text-secondary">
            팀 분석·개인 분석 화면은 토론 종료 후에 이용할 수 있습니다.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            계속하기
          </Button>
          <Button variant="danger">토론 종료</Button>
        </Modal.Footer>
      </Modal>
    </ModalStoryShell>
  );
}

function FullscreenClaimTreeDemo() {
  const [open, setOpen] = useState(false);

  return (
    <ModalStoryShell>
      <Button onClick={() => setOpen(true)}>전체 화면 모달 열기</Button>
      <Modal open={open} onOpenChange={setOpen} size="fullscreen">
        <Modal.Header
          title="실시간 주장 트리"
          description="쟁점별 주장·근거 구조를 실시간으로 확인합니다."
        />
        <Modal.Body className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div
            className="min-h-0 flex-1 rounded-xl border border-dashed border-border-default bg-bg-subtle"
            aria-hidden
          />
        </Modal.Body>
      </Modal>
    </ModalStoryShell>
  );
}

interface PlaygroundModalProps {
  size: ModalSize;
  closeOnOverlayClick: boolean;
}

function PlaygroundModal({ size, closeOnOverlayClick }: PlaygroundModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <ModalStoryShell>
      <Button onClick={() => setOpen(true)}>Playground 열기</Button>
      <Modal open={open} onOpenChange={setOpen} size={size} closeOnOverlayClick={closeOnOverlayClick}>
        <Modal.Header title="모달 Playground" description="size·overlay 클릭 정책을 조절해 보세요." />
        <Modal.Body>
          <p className="text-sm text-text-secondary">본문 영역입니다.</p>
        </Modal.Body>
        {size === "dialog" ? (
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              닫기
            </Button>
          </Modal.Footer>
        ) : null}
      </Modal>
    </ModalStoryShell>
  );
}

const meta = {
  title: "Shared/UI/Modal",
  component: PlaygroundModal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        inline: false,
        height: "32rem",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["dialog", "fullscreen"] satisfies ModalSize[],
    },
    closeOnOverlayClick: { control: "boolean" },
  },
} satisfies Meta<typeof PlaygroundModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DialogTopicInput: Story = {
  args: { size: "dialog", closeOnOverlayClick: true },
  render: () => <DialogTopicInputDemo />,
};

export const DialogConfirm: Story = {
  args: { size: "dialog", closeOnOverlayClick: true },
  render: () => <DialogConfirmDemo />,
};

export const FullscreenClaimTree: Story = {
  args: { size: "fullscreen", closeOnOverlayClick: false },
  render: () => <FullscreenClaimTreeDemo />,
};

export const Playground: Story = {
  args: {
    size: "dialog",
    closeOnOverlayClick: true,
  },
};

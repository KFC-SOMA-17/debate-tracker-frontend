import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Modal } from "@/shared/ui/modal";
import { DEBATE_TOPIC_PLACEHOLDER } from "../constants/debateTopic";

export type StartDebateModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (topic: string) => void;
};

export function StartDebateModal({ open, onOpenChange, onConfirm }: StartDebateModalProps) {
  const [topicInput, setTopicInput] = useState<string>("");

  const canSubmit = Boolean(topicInput?.trim());

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleConfirm = () => {
    if (!canSubmit) {
      return;
    }
    onConfirm(topicInput);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} size="dialog">
      <Modal.Header title="토론 주제 입력" description="토론을 시작하기 전에 주제를 입력해주세요" />
      <Modal.Body>
        <div className="flex flex-col gap-2">
          <label htmlFor="debate-topic-input" className="text-sm font-medium text-text-primary">
            토론 주제
          </label>
          <Input
            id="debate-topic-input"
            value={topicInput}
            onChange={event => setTopicInput(event.target.value)}
            placeholder={DEBATE_TOPIC_PLACEHOLDER}
          />
          <p className="text-xs text-text-secondary">찬성과 반대 의견이 나뉠 수 있는 명확한 주제를 입력하세요</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" variant="secondary" onClick={handleClose}>
          취소
        </Button>
        <Button type="button" disabled={!canSubmit} onClick={handleConfirm}>
          토론 시작
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

import { Button } from "@/shared/ui/button";
import { Modal } from "@/shared/ui/modal";
import { BodyText } from "./EndDebateConfirmModal.styles";

export type EndDebateConfirmModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function EndDebateConfirmModal({ open, onOpenChange, onConfirm }: EndDebateConfirmModalProps) {
  const handleClose = () => {
    onOpenChange(false);
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} size="dialog">
      <Modal.Header title="토론을 종료할까요?" description="종료 후에는 실시간 속기록이 더 이상 갱신되지 않습니다." />
      <Modal.Body>
        <BodyText>팀 분석·개인 분석 화면은 토론 종료 후에 이용할 수 있습니다.</BodyText>
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" variant="secondary" onClick={handleClose}>
          계속하기
        </Button>
        <Button type="button" variant="danger" onClick={handleConfirm}>
          토론 종료
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

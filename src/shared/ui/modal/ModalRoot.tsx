import { useCallback, useId, useMemo, useRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ModalContext } from "./useModalContext";
import type { ModalSize } from "./Modal.types";
import { useBodyScrollLock, useEscapeToClose, useFocusTrap } from "./useModalEffects";
import { ModalOverlay, ModalPanel } from "./Modal.styles";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  children: ReactNode;
}

export function ModalRoot({
  open,
  onOpenChange,
  size = "dialog",
  closeOnOverlayClick,
  className,
  children,
  ...props
}: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [hasDescription, setHasDescription] = useState(false);

  const resolvedCloseOnOverlayClick = closeOnOverlayClick ?? size === "dialog";

  const onClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const registerHasDescription = useCallback((active: boolean) => {
    setHasDescription(active);
  }, []);

  const contextValue = useMemo(
    () => ({
      size,
      onClose,
      titleId,
      descriptionId,
      panelRef,
      registerHasDescription,
    }),
    [size, onClose, titleId, descriptionId, registerHasDescription],
  );

  useBodyScrollLock(open);
  useEscapeToClose(open, onClose);
  useFocusTrap(panelRef, open);

  if (!open) {
    return null;
  }

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && resolvedCloseOnOverlayClick) {
      onClose();
    }
  };

  return createPortal(
    <ModalContext.Provider value={contextValue}>
      <ModalOverlay onClick={handleOverlayClick} data-testid="modal-overlay">
        <ModalPanel
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={hasDescription ? descriptionId : undefined}
          tabIndex={-1}
          className={className}
          $size={size}
          onClick={(event) => event.stopPropagation()}
          {...props}
        >
          {children}
        </ModalPanel>
      </ModalOverlay>
    </ModalContext.Provider>,
    document.body,
  );
}

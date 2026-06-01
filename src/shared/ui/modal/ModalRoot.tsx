import { useCallback, useId, useMemo, useRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/shared/lib/cn";
import { ModalContext, type ModalSize } from "./useModalContext";
import { useBodyScrollLock, useEscapeToClose, useFocusTrap } from "./useModalEffects";

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
    [size, onClose, titleId, descriptionId, registerHasDescription]
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
      <div
        className="fixed inset-0 z-modal flex items-center justify-center bg-bg-inverse/50 p-4"
        onClick={handleOverlayClick}
        data-testid="modal-overlay"
      >
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={hasDescription ? descriptionId : undefined}
          tabIndex={-1}
          className={cn(
            "flex max-h-[calc(100vh-2rem)] w-full flex-col overflow-hidden border border-border-default bg-bg-elevated shadow-lg outline-none",
            size === "dialog" && "max-w-lg rounded-xl",
            size === "fullscreen" && "h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)] rounded-xl",
            className
          )}
          onClick={event => event.stopPropagation()}
          {...props}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    document.body
  );
}

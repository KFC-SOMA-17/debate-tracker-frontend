import { useEffect, type HTMLAttributes, type ReactNode } from "react";
import { ModalCloseButton } from "./ModalCloseButton";
import { useModalContext } from "./useModalContext";
import {
  ModalHeaderContent,
  ModalHeaderDescription,
  ModalHeaderRoot,
  ModalHeaderTitle,
} from "./ModalComponents.styles";

export interface ModalHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  showCloseButton?: boolean;
}

export function ModalHeader({
  title,
  description,
  showCloseButton = true,
  className,
  children,
  ...props
}: ModalHeaderProps) {
  const { titleId, descriptionId, registerHasDescription } = useModalContext();

  useEffect(() => {
    registerHasDescription(Boolean(description));
    return () => registerHasDescription(false);
  }, [description, registerHasDescription]);

  return (
    <ModalHeaderRoot className={className} {...props}>
      <ModalHeaderContent>
        {title ? <ModalHeaderTitle id={titleId}>{title}</ModalHeaderTitle> : null}
        {description ? (
          <ModalHeaderDescription id={descriptionId} $hasTitle={title != null}>
            {description}
          </ModalHeaderDescription>
        ) : null}
        {children}
      </ModalHeaderContent>
      {showCloseButton ? <ModalCloseButton /> : null}
    </ModalHeaderRoot>
  );
}

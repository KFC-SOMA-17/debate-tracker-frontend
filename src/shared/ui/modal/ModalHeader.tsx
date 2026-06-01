import { useEffect, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { ModalCloseButton } from "./ModalCloseButton";
import { useModalContext } from "./useModalContext";

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
    <div
      className={cn(
        "flex shrink-0 items-start justify-between gap-4 border-b border-border-subtle px-6 py-5",
        className
      )}
      {...props}
    >
      <div className="min-w-0 flex-1">
        {title ? (
          <h2 id={titleId} className="font-display text-lg font-semibold text-text-primary">
            {title}
          </h2>
        ) : null}
        {description ? (
          <p id={descriptionId} className={cn("text-sm text-text-secondary", title != null && "mt-1")}>
            {description}
          </p>
        ) : null}
        {children}
      </div>
      {showCloseButton ? <ModalCloseButton /> : null}
    </div>
  );
}

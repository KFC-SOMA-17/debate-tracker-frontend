import type { HTMLAttributes, ReactNode } from "react";
import { AlertCircleIcon } from "@/shared/ui/icons";
import { IconSlot } from "@/shared/ui/icons/IconSlot";
import {
  ErrorDescription,
  ErrorIconSlot,
  ErrorTitle,
  FeedbackAction,
  FeedbackRoot,
} from "./Feedback.styles";

export interface ErrorStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

export function ErrorState({ title, description, action, className, ...props }: ErrorStateProps) {
  return (
    <FeedbackRoot className={className} {...props}>
      <ErrorIconSlot>
        <IconSlot $size="3rem">
          <AlertCircleIcon aria-hidden />
        </IconSlot>
      </ErrorIconSlot>

      <ErrorTitle>{title}</ErrorTitle>
      {description ? <ErrorDescription>{description}</ErrorDescription> : null}

      {action ? <FeedbackAction>{action}</FeedbackAction> : null}
    </FeedbackRoot>
  );
}

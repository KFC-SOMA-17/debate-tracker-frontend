import type { HTMLAttributes, ReactNode } from "react";
import {
  FeedbackAction,
  FeedbackDescription,
  FeedbackIconSlot,
  FeedbackRoot,
  FeedbackTitle,
} from "./Feedback.styles";

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action, className, ...props }: EmptyStateProps) {
  return (
    <FeedbackRoot className={className} {...props}>
      {icon ? <FeedbackIconSlot>{icon}</FeedbackIconSlot> : null}

      <FeedbackTitle>{title}</FeedbackTitle>
      {description ? <FeedbackDescription>{description}</FeedbackDescription> : null}

      {action ? <FeedbackAction>{action}</FeedbackAction> : null}
    </FeedbackRoot>
  );
}

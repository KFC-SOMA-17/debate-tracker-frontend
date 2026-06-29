import type { HTMLAttributes, ReactNode } from "react";
import { FeedbackRoot, LoadingDescription, LoadingSpinner, LoadingTitle } from "./Feedback.styles";

export interface LoadingStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  description?: ReactNode;
}

export function LoadingState({ title, description, className, ...props }: LoadingStateProps) {
  return (
    <FeedbackRoot className={className} {...props}>
      <LoadingSpinner aria-hidden />

      <LoadingTitle aria-live="polite">{title}</LoadingTitle>
      {description ? <LoadingDescription>{description}</LoadingDescription> : null}
    </FeedbackRoot>
  );
}

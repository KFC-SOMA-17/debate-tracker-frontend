import { Fragment } from "react";
import { SetupCheckIcon } from "@/shared/ui/icons/setup";
import { IconSlot } from "@/shared/ui/icons/IconSlot";
import {
  StepCircle,
  StepConnector,
  StepLabel,
  StepNodeRoot,
  StepProgressRoot,
} from "./StepProgress.styles";

export type StepStatus = "upcoming" | "current" | "completed";

export type StepProgressItem = {
  id: string;
  label: string;
  status: StepStatus;
  stepNumber: number;
};

export interface StepProgressProps {
  steps: StepProgressItem[];
  className?: string;
}

function StepNode({ step }: { step: StepProgressItem }) {
  const isActive = step.status === "current" || step.status === "completed";

  return (
    <StepNodeRoot>
      <StepCircle $status={step.status} aria-current={step.status === "current" ? "step" : undefined}>
        {step.status === "completed" ? (
          <IconSlot $size="1rem">
            <SetupCheckIcon aria-hidden />
          </IconSlot>
        ) : (
          <span>{step.stepNumber}</span>
        )}
      </StepCircle>
      <StepLabel $isActive={isActive}>{step.label}</StepLabel>
    </StepNodeRoot>
  );
}

function StepConnectorLine({ active }: { active: boolean }) {
  return <StepConnector $active={active} aria-hidden />;
}

export function StepProgress({ steps, className }: StepProgressProps) {
  return (
    <StepProgressRoot className={className} aria-label="설정 진행 단계">
      {steps.map((step, index) => (
        <Fragment key={step.id}>
          <StepNode step={step} />
          {index < steps.length - 1 ? <StepConnectorLine active={step.status === "completed"} /> : null}
        </Fragment>
      ))}
    </StepProgressRoot>
  );
}

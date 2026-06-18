import { Fragment } from "react";
import { SetupCheckIcon } from "@/shared/ui/icons/setup";
import { cn } from "@/shared/lib/cn";

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
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "flex size-7 items-center justify-center rounded-full text-xs font-bold",
          step.status === "upcoming" && "border-2 border-border-default bg-bg-default text-text-muted",
          isActive && "bg-accent-primary text-text-inverse",
        )}
        aria-current={step.status === "current" ? "step" : undefined}
      >
        {step.status === "completed" ? (
          <SetupCheckIcon className="size-4" aria-hidden />
        ) : (
          <span>{step.stepNumber}</span>
        )}
      </div>
      <span
        className={cn(
          "text-xs font-medium whitespace-nowrap",
          isActive ? "text-accent-primary" : "text-text-muted",
        )}
      >
        {step.label}
      </span>
    </div>
  );
}

function StepConnector({ active }: { active: boolean }) {
  return (
    <div
      className={cn("mb-5 h-px w-20 shrink-0", active ? "bg-accent-primary" : "bg-border-default")}
      aria-hidden
    />
  );
}

export function StepProgress({ steps, className }: StepProgressProps) {
  return (
    <nav className={cn("flex items-center justify-center", className)} aria-label="설정 진행 단계">
      {steps.map((step, index) => (
        <Fragment key={step.id}>
          <StepNode step={step} />
          {index < steps.length - 1 ? <StepConnector active={step.status === "completed"} /> : null}
        </Fragment>
      ))}
    </nav>
  );
}

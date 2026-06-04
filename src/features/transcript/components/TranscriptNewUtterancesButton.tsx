import { Button } from "@/shared/ui/button";
import { ChevronDownIcon } from "@/shared/ui/icons";
import { cn } from "@/shared/lib/cn";

export type TranscriptNewUtterancesButtonProps = {
  onClick: () => void;
  className?: string;
};

export function TranscriptNewUtterancesButton({ onClick, className }: TranscriptNewUtterancesButtonProps) {
  return (
    <Button
      type="button"
      variant="secondary"
      size="md"
      className={cn("shadow-md", className)}
      leftIcon={<ChevronDownIcon className="size-4" aria-hidden />}
      onClick={onClick}
    >
      새 발화 보기
    </Button>
  );
}

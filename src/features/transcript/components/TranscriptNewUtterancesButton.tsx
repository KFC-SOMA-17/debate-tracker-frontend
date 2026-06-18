import { ChevronDownIcon } from "@/shared/ui/icons";
import { IconSlot } from "@/shared/ui/icons/IconSlot";
import { theme } from "@/styles/theme";
import { NewUtterancesButton } from "./TranscriptNewUtterancesButton.styles";

export type TranscriptNewUtterancesButtonProps = {
  onClick: () => void;
  className?: string;
};

export function TranscriptNewUtterancesButton({ onClick, className }: TranscriptNewUtterancesButtonProps) {
  return (
    <NewUtterancesButton
      type="button"
      variant="secondary"
      size="md"
      className={className}
      leftIcon={
        <IconSlot $size={theme.sizes.icon4}>
          <ChevronDownIcon aria-hidden />
        </IconSlot>
      }
      onClick={onClick}
    >
      새 발화 보기
    </NewUtterancesButton>
  );
}

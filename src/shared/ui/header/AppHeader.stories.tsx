import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { ClockIcon } from "@/shared/ui/icons";
import { AppHeader } from "./AppHeader";
import { HeaderBrand } from "./HeaderBrand";

const meta = {
  title: "Shared/UI/AppHeader",
  component: AppHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 페이지에서 brand / trailing 을 조합해 사용하는 기본 패턴 */
export const Default: Story = {
  args: {
    brand: <HeaderBrand />,
    trailing: <Badge variant="status" tone="muted">토론 대기 중</Badge>,
  },
};

export const DebateInProgress: Story = {
  args: {
    brand: <HeaderBrand />,
    trailing: (
      <>
        <Badge variant="status" tone="info">
          토론 진행 중
        </Badge>
        <span className="inline-flex items-center gap-1.5 text-sm text-text-secondary">
          <ClockIcon className="size-3.5" aria-hidden />
          24:18
        </span>
        <Button variant="danger" size="md">
          토론 종료
        </Button>
      </>
    ),
  },
};

export const BrandOnly: Story = {
  args: {
    brand: <HeaderBrand />,
  },
};

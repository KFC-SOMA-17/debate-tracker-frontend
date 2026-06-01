import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";
import { useModalContext } from "./useModalContext";

export type ModalBodyProps = HTMLAttributes<HTMLDivElement>;

export function ModalBody({ className, children, ...props }: ModalBodyProps) {
  const { size } = useModalContext();

  return (
    <div
      className={cn("min-h-0 flex-1 overflow-y-auto px-6 py-5", size === "fullscreen" && "flex flex-col", className)}
      {...props}
    >
      {children}
    </div>
  );
}

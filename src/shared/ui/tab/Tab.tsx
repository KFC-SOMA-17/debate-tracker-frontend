import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export type TabStyle = "underline" | "pill";

export interface TabItem {
  id: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  items: TabItem[];
  activeId: string;
  onValueChange?: (id: string) => void;
  tabStyle?: TabStyle;
  ariaLabel?: string;
}

export function Tabs({
  items,
  activeId,
  onValueChange,
  tabStyle = "underline",
  ariaLabel = "탭",
  className,
  ...props
}: TabsProps) {
  return (
    <div className={cn("w-full", className)} {...props}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className={cn(
          "flex gap-2",
          tabStyle === "underline" && "border-b border-border-default",
          tabStyle === "pill" && "rounded-xl bg-bg-muted p-1",
        )}
      >
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={item.disabled}
              onClick={() => !item.disabled && onValueChange?.(item.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary",
                tabStyle === "underline" &&
                  (isActive
                    ? "border-b-2 border-accent-primary text-accent-primary"
                    : "text-text-secondary hover:text-text-primary"),
                tabStyle === "pill" &&
                  (isActive
                    ? "rounded-lg bg-bg-default text-text-primary shadow-sm"
                    : "text-text-secondary hover:text-text-primary"),
                !item.disabled && "hover:cursor-pointer",
                item.disabled && "cursor-not-allowed opacity-50",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

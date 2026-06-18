import type { HTMLAttributes, ReactNode } from "react";
import { TabButton, TabList, TabsRoot } from "./Tab.styles";

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
    <TabsRoot className={className} {...props}>
      <TabList role="tablist" aria-label={ariaLabel} $tabStyle={tabStyle}>
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <TabButton
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={item.disabled}
              $tabStyle={tabStyle}
              $isActive={isActive}
              $disabled={item.disabled}
              onClick={() => !item.disabled && onValueChange?.(item.id)}
            >
              {item.label}
            </TabButton>
          );
        })}
      </TabList>
    </TabsRoot>
  );
}

import type { HTMLAttributes, ReactNode } from "react";
import {
  NavigationActiveIndicator,
  NavigationButton,
  NavigationItem,
  NavigationList,
  NavigationRoot,
} from "./Navigation.styles";

export interface NavigationItem {
  id: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface NavigationProps extends HTMLAttributes<HTMLElement> {
  items: NavigationItem[];
  activeId: string;
  onNavigate?: (id: string) => void;
}

export function Navigation({ items, activeId, onNavigate, className, ...props }: NavigationProps) {
  return (
    <NavigationRoot className={className} aria-label="앱 네비게이션" {...props}>
      <NavigationList>
        {items.map((item) => {
          const isActive = item.id === activeId;
          const isDisabled = item.disabled;

          return (
            <NavigationItem key={item.id}>
              <NavigationButton
                type="button"
                disabled={isDisabled}
                aria-current={isActive ? "page" : undefined}
                $isActive={isActive}
                $disabled={isDisabled}
                onClick={() => !isDisabled && onNavigate?.(item.id)}
              >
                {item.label}
                {isActive ? <NavigationActiveIndicator aria-hidden /> : null}
              </NavigationButton>
            </NavigationItem>
          );
        })}
      </NavigationList>
    </NavigationRoot>
  );
}

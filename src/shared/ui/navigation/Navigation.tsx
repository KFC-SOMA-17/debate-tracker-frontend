import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

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
    <nav className={cn("border-b border-border-default", className)} aria-label="앱 네비게이션" {...props}>
      <ul className="flex gap-0">
        {items.map((item) => {
          const isActive = item.id === activeId;
          const isDisabled = item.disabled;

          return (
            <li key={item.id}>
              <button
                type="button"
                disabled={isDisabled}
                aria-current={isActive ? "page" : undefined}
                onClick={() => !isDisabled && onNavigate?.(item.id)}
                className={cn(
                  "relative px-6 py-4 text-sm font-medium transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary",
                  isActive ? "text-accent-primary" : "text-text-secondary hover:text-text-primary",
                  !isDisabled && "hover:cursor-pointer",
                  isDisabled && "cursor-not-allowed opacity-50",
                )}
              >
                {item.label}
                {isActive ? (
                  <span className="absolute right-0 bottom-0 left-0 h-0.5 bg-accent-primary" aria-hidden />
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

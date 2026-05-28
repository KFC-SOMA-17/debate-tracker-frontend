import { useId, useState, type HTMLAttributes, type ReactNode } from "react";
import { ChevronDownIcon } from "@/shared/ui/icons";
import { cn } from "@/shared/lib/cn";

export interface AccordionItemProps {
  id: string;
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  items: AccordionItemProps[];
  allowMultiple?: boolean;
}

export function Accordion({ items, allowMultiple = false, className, ...props }: AccordionProps) {
  const baseId = useId();
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(items.filter((i) => i.defaultOpen).map((i) => i.id)),
  );

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        return next;
      }
      if (!allowMultiple) {
        next.clear();
      }
      next.add(id);
      return next;
    });
  };

  return (
    <div className={cn("flex w-full flex-col gap-2", className)} {...props}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        const triggerId = `${baseId}-${item.id}-trigger`;
        const panelId = `${baseId}-${item.id}-panel`;

        return (
          <div key={item.id} className="overflow-hidden rounded-xl border border-border-default">
            <button
              id={triggerId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between gap-3 bg-bg-default px-4 py-3 text-left text-sm font-medium text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
            >
              <span>{item.title}</span>
              <ChevronDownIcon
                className={cn("size-4 shrink-0 text-text-muted transition-transform", isOpen && "rotate-180")}
                aria-hidden
              />
            </button>
            {isOpen ? (
              <div id={panelId} role="region" aria-labelledby={triggerId} className="border-t border-border-subtle px-4 py-3 text-sm text-text-secondary">
                {item.children}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

import { useId, useState, type HTMLAttributes, type ReactNode } from "react";
import { ChevronDownIcon } from "@/shared/ui/icons";
import { IconSlot } from "@/shared/ui/icons/IconSlot";
import {
  AccordionChevronSlot,
  AccordionItemRoot,
  AccordionPanel,
  AccordionRoot,
  AccordionTrigger,
} from "./Accordion.styles";

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
    <AccordionRoot className={className} {...props}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        const triggerId = `${baseId}-${item.id}-trigger`;
        const panelId = `${baseId}-${item.id}-panel`;

        return (
          <AccordionItemRoot key={item.id}>
            <AccordionTrigger
              id={triggerId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(item.id)}
            >
              <span>{item.title}</span>
              <AccordionChevronSlot $isOpen={isOpen}>
                <IconSlot $size="1rem">
                  <ChevronDownIcon aria-hidden />
                </IconSlot>
              </AccordionChevronSlot>
            </AccordionTrigger>
            {isOpen ? (
              <AccordionPanel id={panelId} role="region" aria-labelledby={triggerId}>
                {item.children}
              </AccordionPanel>
            ) : null}
          </AccordionItemRoot>
        );
      })}
    </AccordionRoot>
  );
}

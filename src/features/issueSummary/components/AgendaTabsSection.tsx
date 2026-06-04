import { Tabs } from "@/shared/ui/tab";
import { truncateAgendaTabLabel } from "../lib/truncateAgendaTabLabel";
import type { Agenda } from "../types/agendaSummary";

export type AgendaTabsSectionProps = {
  agendas: Agenda[];
  activeId: string;
  onActiveIdChange: (id: string) => void;
};

export function AgendaTabsSection({ agendas, activeId, onActiveIdChange }: AgendaTabsSectionProps) {
  const items = agendas.map(agenda => ({
    id: String(agenda.agendaId),
    label: truncateAgendaTabLabel(agenda.content),
  }));

  return (
    <Tabs
      items={items}
      activeId={activeId}
      onValueChange={onActiveIdChange}
      tabStyle="underline"
      ariaLabel="쟁점 탭"
      className="w-full shrink-0 [&_[role=tablist]]:h-[44px] [&_[role=tablist]]:items-stretch [&_button[role=tab]]:flex [&_button[role=tab]]:h-full [&_button[role=tab]]:items-center"
    />
  );
}

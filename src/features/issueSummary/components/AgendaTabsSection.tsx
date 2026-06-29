import { truncateAgendaTabLabel } from "../lib/truncateAgendaTabLabel";
import type { Agenda } from "../types/agendaSummary";
import { StyledTabs } from "./AgendaTabsSection.styles";

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
    <StyledTabs
      items={items}
      activeId={activeId}
      onValueChange={onActiveIdChange}
      tabStyle="underline"
      ariaLabel="쟁점 탭"
    />
  );
}

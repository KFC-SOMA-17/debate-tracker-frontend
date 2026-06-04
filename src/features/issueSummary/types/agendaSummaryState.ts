import type { Agenda } from "./agendaSummary";

export type AgendasById = Record<number, Agenda>;

export type AgendaSummaryState = {
  agendasById: AgendasById;
  /** 최초 등장 순 */
  agendaOrder: number[];
};

export const initialAgendaSummaryState: AgendaSummaryState = {
  agendasById: {},
  agendaOrder: [],
};

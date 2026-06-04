import type { Agenda, Claim, DebateAgendasResponse, Evidence } from "../types/agendaSummary";
import { initialAgendaSummaryState, type AgendaSummaryState } from "../types/agendaSummaryState";

function parseModifiedAt(value: string): number {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

/** 파싱 실패 시 incoming을 더 최신으로 간주 */
export function isModifiedAtNewer(incoming: string, local: string | undefined): boolean {
  if (local == null) {
    return true;
  }
  const incomingMs = parseModifiedAt(incoming);
  const localMs = parseModifiedAt(local);
  if (incomingMs === 0 && localMs === 0) {
    return incoming !== local;
  }
  if (incomingMs === 0) {
    return true;
  }
  if (localMs === 0) {
    return true;
  }
  return incomingMs > localMs;
}

export function mergeEvidences(local: Evidence[], incoming: Evidence[]): Evidence[] {
  const byId = new Map(local.map(evidence => [evidence.evidenceId, evidence]));
  const order = local.map(evidence => evidence.evidenceId);

  for (const evidence of incoming) {
    const existing = byId.get(evidence.evidenceId);
    if (!existing) {
      byId.set(evidence.evidenceId, evidence);
      order.push(evidence.evidenceId);
      continue;
    }
    if (isModifiedAtNewer(evidence.modifiedAt, existing.modifiedAt)) {
      byId.set(evidence.evidenceId, evidence);
    }
  }

  return order.map(id => byId.get(id)!);
}

export function mergeClaims(local: Claim[], incoming: Claim[]): Claim[] {
  const byId = new Map(local.map(claim => [claim.claimId, claim]));
  const order = local.map(claim => claim.claimId);

  for (const claim of incoming) {
    const existing = byId.get(claim.claimId);
    if (!existing) {
      byId.set(claim.claimId, claim);
      order.push(claim.claimId);
      continue;
    }
    if (!isModifiedAtNewer(claim.modifiedAt, existing.modifiedAt)) {
      continue;
    }
    byId.set(claim.claimId, {
      ...claim,
      evidences: mergeEvidences(existing.evidences, claim.evidences),
    });
  }

  return order.map(id => byId.get(id)!);
}

export function mergeAgenda(local: Agenda | undefined, incoming: Agenda): Agenda {
  if (!local) {
    return incoming;
  }
  if (!isModifiedAtNewer(incoming.modifiedAt, local.modifiedAt)) {
    return local;
  }
  return {
    ...incoming,
    claims: mergeClaims(local.claims, incoming.claims),
  };
}

export function mergeAgendaSummary(state: AgendaSummaryState, response: DebateAgendasResponse): AgendaSummaryState {
  let agendasById = state.agendasById;
  let agendaOrder = state.agendaOrder;

  for (const incomingAgenda of response.agendas) {
    const localAgenda = agendasById[incomingAgenda.agendaId];
    if (!localAgenda) {
      agendasById = { ...agendasById, [incomingAgenda.agendaId]: incomingAgenda };
      agendaOrder = [...agendaOrder, incomingAgenda.agendaId];
      continue;
    }
    const merged = mergeAgenda(localAgenda, incomingAgenda);
    if (merged !== localAgenda) {
      agendasById = { ...agendasById, [incomingAgenda.agendaId]: merged };
    }
  }

  return { agendasById, agendaOrder };
}

export type AgendaSummaryAction =
  | { type: "CLEAR" }
  | { type: "MERGE"; response: DebateAgendasResponse };

export function agendaSummaryReducer(state: AgendaSummaryState, action: AgendaSummaryAction): AgendaSummaryState {
  switch (action.type) {
    case "CLEAR":
      return initialAgendaSummaryState;
    case "MERGE":
      return mergeAgendaSummary(state, action.response);
    default:
      return state;
  }
}

export function selectOrderedAgendas(state: AgendaSummaryState): Agenda[] {
  return state.agendaOrder
    .map(agendaId => state.agendasById[agendaId])
    .filter((agenda): agenda is Agenda => agenda != null);
}

import { DEBATE_API_PATHS } from "@/features/debate/api/paths";
import { apiClient } from "@/shared/api/client";
import type { DebateAgendasResponse } from "../types/agendaSummary";

export async function fetchDebateAgendas(debateId: string): Promise<DebateAgendasResponse> {
  return apiClient<DebateAgendasResponse>(DEBATE_API_PATHS.agendas(debateId));
}

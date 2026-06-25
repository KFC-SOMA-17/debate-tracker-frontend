import { apiClient } from "@/shared/api/client";
import { normalizeDebateResponse } from "../lib/normalizeDebateResponse";
import type { CreateDebateRequest, CreateDebateResponse } from "../types/debateApi";
import { DEBATE_API_PATHS } from "./paths";

export async function createDebate(request: CreateDebateRequest): Promise<CreateDebateResponse> {
  const raw = await apiClient<unknown>(DEBATE_API_PATHS.debates, {
    method: "POST",
    body: JSON.stringify(request),
  });
  return normalizeDebateResponse(raw);
}

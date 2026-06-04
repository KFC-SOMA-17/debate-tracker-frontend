import { apiClient } from "@/shared/api/client";
import type { CreateDebateRequest, CreateDebateResponse } from "../types/debateApi";
import { DEBATE_API_PATHS } from "./paths";

export async function createDebate(request: CreateDebateRequest): Promise<CreateDebateResponse> {
  return apiClient<CreateDebateResponse>(DEBATE_API_PATHS.debates, {
    method: "POST",
    body: JSON.stringify(request),
  });
}

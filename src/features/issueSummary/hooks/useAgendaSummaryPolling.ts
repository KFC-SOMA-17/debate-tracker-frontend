import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useReducer } from "react";
import type { DebateSessionPhase } from "@/app/layouts/DebateSessionLayoutContext";
import { ApiError } from "@/shared/api/errors";
import { fetchDebateAgendas } from "../api/issueSummaryApi";
import { agendaSummaryReducer, selectOrderedAgendas } from "../lib/agendaSummaryMerge";
import type { Agenda } from "../types/agendaSummary";
import { initialAgendaSummaryState } from "../types/agendaSummaryState";

export const AGENDA_SUMMARY_POLL_INTERVAL_MS = 10_000;

export type AgendaSummaryPollingStatus = "idle" | "loading" | "polling" | "error";

export type UseAgendaSummaryPollingOptions = {
  debateId?: string;
  phase: DebateSessionPhase;
  /** 비활성화 시 로컬 merge 상태 초기화 (idle 복귀 등) */
  resetWhenDisabled?: boolean;
};

export type UseAgendaSummaryPollingResult = {
  agendas: Agenda[];
  status: AgendaSummaryPollingStatus;
  error: ApiError | null;
  refetch: () => void;
};

function deriveStatus(
  enabled: boolean,
  isFetched: boolean,
  isError: boolean,
): AgendaSummaryPollingStatus {
  if (!enabled) {
    return "idle";
  }
  if (isError) {
    return "error";
  }
  if (!isFetched) {
    return "loading";
  }
  return "polling";
}

export function useAgendaSummaryPolling({
  debateId,
  phase,
  resetWhenDisabled = false,
}: UseAgendaSummaryPollingOptions): UseAgendaSummaryPollingResult {
  const [record, dispatch] = useReducer(agendaSummaryReducer, initialAgendaSummaryState);
  const pollingEnabled = phase === "active" && debateId != null && debateId.length > 0;

  const query = useQuery({
    queryKey: ["debate", debateId, "agendas"],
    queryFn: () => fetchDebateAgendas(debateId!),
    enabled: pollingEnabled,
    staleTime: 0,
    refetchInterval: AGENDA_SUMMARY_POLL_INTERVAL_MS,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    dispatch({ type: "CLEAR" });
  }, [debateId]);

  useEffect(() => {
    if (!query.data) {
      return;
    }
    dispatch({ type: "MERGE", response: query.data });
  }, [query.data]);

  useEffect(() => {
    if (pollingEnabled || !resetWhenDisabled) {
      return;
    }
    dispatch({ type: "CLEAR" });
  }, [pollingEnabled, resetWhenDisabled]);

  const agendas = useMemo(() => selectOrderedAgendas(record), [record]);

  const error = query.error instanceof ApiError ? query.error : null;

  const status = deriveStatus(pollingEnabled, query.isFetched, query.isError);

  return {
    agendas,
    status,
    error,
    refetch: () => {
      void query.refetch();
    },
  };
}

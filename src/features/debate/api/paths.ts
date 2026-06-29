export const DEBATE_API_PATHS = {
  debates: "/api/debates",
  agendas: (debateId: string) => `/api/debates/${debateId}/agendas`,
} as const;

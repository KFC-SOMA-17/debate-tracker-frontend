export const queryKeys = {
  debate: {
    all: ["debate"] as const,
    detail: (id: string) => ["debate", id] as const,
  },
  utterances: {
    bySession: (sessionId: string) => ["utterances", sessionId] as const,
  },
  analysis: {
    team: (sessionId: string) => ["analysis", "team", sessionId] as const,
    individual: (sessionId: string, speakerId: string) => ["analysis", "individual", sessionId, speakerId] as const,
  },
} as const;

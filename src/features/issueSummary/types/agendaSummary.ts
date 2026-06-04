export type EvidenceType = "STATISTICS" | "EXAMPLE" | "QUOTATION";

export type ClaimStance = "PROS" | "CONS";

export type Evidence = {
  evidenceId: number;
  content?: string;
  type?: EvidenceType;
  createdAt: string;
  modifiedAt: string;
};

export type Claim = {
  claimId: number;
  content?: string;
  stance?: ClaimStance;
  createdAt: string;
  modifiedAt: string;
  evidences: Evidence[];
};

export type Agenda = {
  agendaId: number;
  content?: string;
  createdAt: string;
  modifiedAt: string;
  claims: Claim[];
};

export type DebateAgendasResponse = {
  debateId: number;
  agendas: Agenda[];
};

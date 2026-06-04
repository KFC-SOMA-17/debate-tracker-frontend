import { describe, expect, it } from "vitest";
import type { Agenda } from "../types/agendaSummary";
import { formatAgendaSummaryUpdatedAt, getLatestAgendaModifiedAt } from "./formatAgendaSummaryUpdatedAt";

describe("getLatestAgendaModifiedAt", () => {
  it("agenda·claim·evidence 중 가장 최근 modifiedAt을 반환한다", () => {
    const agendas: Agenda[] = [
      {
        agendaId: 1,
        content: "A",
        createdAt: "2026-06-04T22:15:30",
        modifiedAt: "2026-06-04T22:15:30",
        claims: [
          {
            claimId: 10,
            content: "주장",
            stance: "PROS",
            createdAt: "2026-06-04T22:15:30",
            modifiedAt: "2026-06-04T22:15:40",
            evidences: [
              {
                evidenceId: 100,
                content: "근거",
                createdAt: "2026-06-04T22:15:30",
                modifiedAt: "2026-06-04T22:16:00",
              },
            ],
          },
        ],
      },
    ];

    expect(getLatestAgendaModifiedAt(agendas)).toBe("2026-06-04T22:16:00");
  });
});

describe("formatAgendaSummaryUpdatedAt", () => {
  it("갱신 라벨을 포함한 시각 문자열을 반환한다", () => {
    const label = formatAgendaSummaryUpdatedAt("2026-06-04T22:16:40");
    expect(label).toMatch(/갱신$/);
    expect(label).toMatch(/22:16/);
  });
});

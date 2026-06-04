import { http, HttpResponse } from "msw";
import { DEBATE_API_PATHS } from "@/features/debate/api/paths";
import { AGENDA_SUMMARY_MAX_STAGE, buildAgendaSummaryStage } from "../fixtures/agendaSummaryScenario";
import { advanceAgendaPollStage } from "../fixtures/mockAgendaPollStore";

export const agendaHandlers = [
  http.get(`*${DEBATE_API_PATHS.agendas(":debateId")}`, ({ params }) => {
    const debateIdParam = params.debateId;
    const debateIdKey = typeof debateIdParam === "string" ? debateIdParam : String(debateIdParam ?? "1");
    const numericDebateId = Number(debateIdKey);
    const debateId = Number.isNaN(numericDebateId) ? 1 : numericDebateId;

    const stage = advanceAgendaPollStage(debateIdKey, AGENDA_SUMMARY_MAX_STAGE);
    const body = buildAgendaSummaryStage(debateId, stage);

    return HttpResponse.json(body);
  }),
];

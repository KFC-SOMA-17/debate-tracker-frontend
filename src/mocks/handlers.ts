import { agendaHandlers } from "./http/agendaHandlers";
import { debateHandlers } from "./http/debateHandlers";
import { sttWebSocketHandlers } from "./ws/sttHandler";

export const handlers = [...debateHandlers, ...agendaHandlers, ...sttWebSocketHandlers];

import { debateHandlers } from "./http/debateHandlers";
import { sttWebSocketHandlers } from "./ws/sttHandler";

export const handlers = [...debateHandlers, ...sttWebSocketHandlers];

import { http, HttpResponse } from "msw";
import { DEBATE_API_PATHS } from "@/features/debate/api/paths";
import { createMockDebateNumericId } from "../fixtures/mockDebateStore";

export const debateHandlers = [
  http.post(`*${DEBATE_API_PATHS.debates}`, async ({ request }) => {
    const body = (await request.json()) as { topic?: string };
    const topic = body.topic?.trim() ?? "";

    if (!topic) {
      return HttpResponse.json(
        {
          code: "INVALID_TOPIC",
          status: 400,
          message: "토론 주제는 필수입니다.",
        },
        { status: 400 },
      );
    }

    const debateId = createMockDebateNumericId();

    return HttpResponse.json({
      debateId: String(debateId),
      topic,
    });
  }),
];

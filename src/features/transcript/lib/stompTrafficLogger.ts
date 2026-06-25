const STOMP_TRAFFIC_PREFIX = "[STOMP traffic]";

type StompTrafficPayload = {
  destination: string;
  headers?: Record<string, string>;
  body?: string;
  binaryBody?: Uint8Array;
};

function tryParseJson(raw: string): unknown {
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return raw;
  }
}

export function logStompSend(payload: StompTrafficPayload): void {
  if (payload.binaryBody) {
    return;
  }

  console.info(STOMP_TRAFFIC_PREFIX, {
    direction: "SEND" as const,
    at: new Date().toISOString(),
    destination: payload.destination,
    headers: payload.headers ?? {},
    body: payload.body ?? "",
  });
}

export function logStompReceive(payload: StompTrafficPayload): void {
  if (payload.binaryBody) {
    return;
  }

  const body = payload.body ?? "";
  console.info(STOMP_TRAFFIC_PREFIX, {
    direction: "RECV" as const,
    at: new Date().toISOString(),
    destination: payload.destination ?? payload.headers?.destination ?? "(unknown)",
    headers: payload.headers ?? {},
    body,
    parsedBody: body ? tryParseJson(body) : null,
  });
}

export function logStompReceiveParseFailure(rawBody: string, destination?: string): void {
  console.warn(STOMP_TRAFFIC_PREFIX, {
    direction: "RECV",
    at: new Date().toISOString(),
    destination: destination ?? "(unknown)",
    parseFailed: true,
    body: rawBody,
  });
}

export function resetStompTrafficLogger(): void {
  // no-op: PCM send counters removed
}

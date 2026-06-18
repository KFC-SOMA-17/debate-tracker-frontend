const NULL_CHAR = "\u0000";

export type StompFrame = {
  command: string;
  headers: Record<string, string>;
  body: string;
};

export function parseStompFrame(raw: string): StompFrame | null {
  const withoutNull = raw.endsWith(NULL_CHAR) ? raw.slice(0, -1) : raw;
  const separatorIndex = withoutNull.indexOf("\n\n");
  if (separatorIndex === -1) {
    return null;
  }

  const headerSection = withoutNull.slice(0, separatorIndex);
  const body = withoutNull.slice(separatorIndex + 2);
  const lines = headerSection.split("\n");
  const command = lines[0]?.trim();
  if (!command) {
    return null;
  }

  const headers: Record<string, string> = {};
  for (const line of lines.slice(1)) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) {
      continue;
    }
    const key = line.slice(0, colonIndex);
    const value = line.slice(colonIndex + 1);
    headers[key] = value;
  }

  return { command, headers, body };
}

export function encodeStompFrame(frame: StompFrame): string {
  const headerLines = Object.entries(frame.headers).map(([key, value]) => `${key}:${value}`);
  const headerBlock = [frame.command, ...headerLines].join("\n");
  return `${headerBlock}\n\n${frame.body}${NULL_CHAR}`;
}

export function encodeStompMessage(
  destination: string,
  subscriptionId: string,
  body: string,
): string {
  return encodeStompFrame({
    command: "MESSAGE",
    headers: {
      destination,
      subscription: subscriptionId,
      "content-type": "application/json",
    },
    body,
  });
}

export function encodeStompConnected(): string {
  return encodeStompFrame({
    command: "CONNECTED",
    headers: {
      version: "1.2",
      "heart-beat": "2000,2000",
    },
    body: "",
  });
}

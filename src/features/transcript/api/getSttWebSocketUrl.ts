import { TRANSCRIPT_API_PATHS } from "./paths";

export function getSttWebSocketUrl(): string {
  const fromEnv = import.meta.env.VITE_WS_STT_URL;
  if (fromEnv) {
    return fromEnv;
  }

  const apiBase = import.meta.env.VITE_API_BASE_URL;
  if (apiBase) {
    const url = new URL(apiBase);
    url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
    url.pathname = TRANSCRIPT_API_PATHS.sttWebSocket;
    url.search = "";
    url.hash = "";
    return url.toString();
  }

  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${protocol}//${window.location.host}${TRANSCRIPT_API_PATHS.sttWebSocket}`;
}

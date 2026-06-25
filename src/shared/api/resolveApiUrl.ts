export function normalizeBaseUrl(baseUrl: string): string {
  const trimmed = baseUrl.trim().replace(/\/+$/, "");
  if (!trimmed) {
    return "";
  }

  const match = trimmed.match(/^(https?)(?:[/:]*)(.*)$/i);
  if (!match) {
    return trimmed;
  }

  const [, protocol, rest] = match;
  return `${protocol.toLowerCase()}://${rest}`;
}

export function resolveApiUrl(path: string, baseUrl = import.meta.env.VITE_API_BASE_URL ?? ""): string {
  const base = normalizeBaseUrl(baseUrl);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!base) {
    return normalizedPath;
  }

  return `${base}${normalizedPath}`;
}

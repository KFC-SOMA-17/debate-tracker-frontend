import { ApiError } from "./errors";
import { resolveApiUrl } from "./resolveApiUrl";

export { ApiError, type ApiErrorBody, isApiErrorBody } from "./errors";

export async function apiClient<T>(path: string, init?: RequestInit): Promise<T> {
  const url = resolveApiUrl(path);
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    let body: unknown;
    try {
      body = await response.json();
    } catch {
      body = undefined;
    }
    throw ApiError.fromResponse(response.status, body);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

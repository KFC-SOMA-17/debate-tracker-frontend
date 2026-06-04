export type ApiErrorBody = {
  code: string;
  status: number;
  message: string;
};

export function isApiErrorBody(value: unknown): value is ApiErrorBody {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;
  return typeof record.code === "string" && typeof record.status === "number" && typeof record.message === "string";
}

export class ApiError extends Error {
  readonly code: string;
  readonly status: number;

  constructor(body: ApiErrorBody) {
    super(body.message);
    this.name = "ApiError";
    this.code = body.code;
    this.status = body.status;
  }

  static fromResponse(httpStatus: number, body: unknown): ApiError {
    if (isApiErrorBody(body)) {
      return new ApiError(body);
    }

    const fallbackMessage =
      typeof body === "object" &&
      body !== null &&
      "message" in body &&
      typeof (body as { message?: unknown }).message === "string"
        ? (body as { message: string }).message
        : "Request failed";

    return new ApiError({
      code: "UNKNOWN_ERROR",
      status: httpStatus,
      message: fallbackMessage,
    });
  }
}

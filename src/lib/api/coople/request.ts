export class CoopleApiError extends Error {
  constructor(
    message: string,
    public readonly httpStatus: number,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "CoopleApiError";
  }
}

export async function request<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new CoopleApiError(
      `Coople request failed (HTTP ${response.status}).`,
      response.status,
    );
  }

  const payload: T & { error?: boolean } = await response.json();

  if (payload.error) {
    throw new CoopleApiError(
      `Coople request failed (HTTP ${response.status}).`,
      response.status,
    );
  }

  return payload;
}

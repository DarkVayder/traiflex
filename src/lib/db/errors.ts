const UNAVAILABLE_ERRORS = new Set([
  "MongooseServerSelectionError",
  "MongoServerSelectionError",
  "MongoNetworkError",
  "MongoNetworkTimeoutError",
]);

/** True when MongoDB couldn't be reached, as opposed to a bug in our own code. */
export function isDatabaseUnavailable(error: unknown): boolean {
  return error instanceof Error && (UNAVAILABLE_ERRORS.has(error.name) || /buffering timed out/i.test(error.message));
}

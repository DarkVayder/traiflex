import "server-only";
import { NextResponse } from "next/server";
import { AuthError, bearerToken, verifyFirebaseIdToken, type VerifiedUser } from "@/lib/auth/verify-id-token";
import { isDatabaseUnavailable } from "@/lib/db/errors";
import { serverEnv } from "@/lib/env";

export type ApiErrorCode = "unauthorized" | "bad_request" | "not_found" | "unavailable" | "internal";

export interface ApiErrorBody {
  error: { code: ApiErrorCode; message: string };
}

export function apiError(status: number, code: ApiErrorCode, message: string) {
  return NextResponse.json<ApiErrorBody>({ error: { code, message } }, { status });
}

/** Resolves the signed-in user from the request's Firebase ID token, or a 401 response. */
export async function requireUser(request: Request): Promise<VerifiedUser | NextResponse<ApiErrorBody>> {
  const token = bearerToken(request.headers.get("authorization"));
  if (!token) return apiError(401, "unauthorized", "Sign in to continue.");
  try {
    return await verifyFirebaseIdToken(token, serverEnv().NEXT_PUBLIC_FIREBASE_PROJECT_ID);
  } catch (error) {
    if (error instanceof AuthError) return apiError(401, "unauthorized", "Your session has expired. Sign in again.");
    throw error;
  }
}

/** Wraps a handler so unexpected errors are logged and returned as a 503 (database down) or a generic 500. */
export function withErrorHandling<Args extends unknown[]>(
  handler: (...args: Args) => Promise<Response>,
): (...args: Args) => Promise<Response> {
  return async (...args) => {
    try {
      return await handler(...args);
    } catch (error) {
      console.error("[api]", error);
      if (isDatabaseUnavailable(error)) {
        return apiError(503, "unavailable", "We can't reach our database right now. Please try again in a moment.");
      }
      return apiError(500, "internal", "Something went wrong. Please try again.");
    }
  };
}

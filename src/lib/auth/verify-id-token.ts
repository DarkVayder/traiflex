import "server-only";
import { createRemoteJWKSet, jwtVerify, type JWTVerifyGetKey } from "jose";

// Firebase ID tokens are RS256 JWTs signed by Google's securetoken service.
// Verifying them against the public JWKS needs no service-account secret.
// https://firebase.google.com/docs/auth/admin/verify-id-tokens#verify_id_tokens_using_a_third-party_jwt_library
const FIREBASE_JWKS_URL =
  "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com";

let remoteKeys: JWTVerifyGetKey | undefined;

function firebaseKeys(): JWTVerifyGetKey {
  remoteKeys ??= createRemoteJWKSet(new URL(FIREBASE_JWKS_URL));
  return remoteKeys;
}

export interface VerifiedUser {
  uid: string;
  email: string | null;
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export async function verifyFirebaseIdToken(
  token: string,
  projectId: string,
  keys: JWTVerifyGetKey = firebaseKeys(),
): Promise<VerifiedUser> {
  try {
    const { payload } = await jwtVerify(token, keys, {
      algorithms: ["RS256"],
      issuer: `https://securetoken.google.com/${projectId}`,
      audience: projectId,
    });

    if (typeof payload.sub !== "string" || payload.sub.length === 0 || payload.sub.length > 128) {
      throw new AuthError("Token has no valid subject");
    }
    if (typeof payload.auth_time !== "number" || payload.auth_time * 1000 > Date.now()) {
      throw new AuthError("Token has an invalid auth_time");
    }

    return { uid: payload.sub, email: typeof payload.email === "string" ? payload.email : null };
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError("Invalid or expired ID token");
  }
}

/** Extracts a bearer token from an Authorization header, or null. */
export function bearerToken(header: string | null): string | null {
  const match = header?.match(/^Bearer\s+(\S+)$/i);
  return match ? match[1] : null;
}

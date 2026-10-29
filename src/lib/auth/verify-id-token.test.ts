import { createLocalJWKSet, exportJWK, generateKeyPair, SignJWT, type JWK } from "jose";
import { beforeAll, describe, expect, it } from "vitest";
import { AuthError, bearerToken, verifyFirebaseIdToken } from "./verify-id-token";

const PROJECT = "traiflex-test";
const now = () => Math.floor(Date.now() / 1000);

let privateKey: CryptoKey;
let keys: ReturnType<typeof createLocalJWKSet>;
let otherPrivateKey: CryptoKey;

beforeAll(async () => {
  const pair = await generateKeyPair("RS256");
  privateKey = pair.privateKey;
  const jwk: JWK = { ...(await exportJWK(pair.publicKey)), kid: "k1", alg: "RS256", use: "sig" };
  keys = createLocalJWKSet({ keys: [jwk] });
  otherPrivateKey = (await generateKeyPair("RS256")).privateKey;
});

function token(claims: Record<string, unknown> = {}, key: CryptoKey = privateKey) {
  return new SignJWT({ auth_time: now() - 60, email: "ada@example.com", ...claims })
    .setProtectedHeader({ alg: "RS256", kid: "k1" })
    .setIssuer(`https://securetoken.google.com/${PROJECT}`)
    .setAudience(PROJECT)
    .setSubject("uid-123")
    .setIssuedAt(now() - 60)
    .setExpirationTime(now() + 3600)
    .sign(key);
}

describe("verifyFirebaseIdToken", () => {
  it("accepts a valid token and returns uid and email", async () => {
    await expect(verifyFirebaseIdToken(await token(), PROJECT, keys)).resolves.toEqual({
      uid: "uid-123",
      email: "ada@example.com",
    });
  });

  it("rejects a token for another Firebase project", async () => {
    await expect(verifyFirebaseIdToken(await token(), "someone-else", keys)).rejects.toBeInstanceOf(AuthError);
  });

  it("rejects a token signed with an unknown key", async () => {
    await expect(verifyFirebaseIdToken(await token({}, otherPrivateKey), PROJECT, keys)).rejects.toBeInstanceOf(AuthError);
  });

  it("rejects expired tokens", async () => {
    const expired = await new SignJWT({ auth_time: now() - 7200 })
      .setProtectedHeader({ alg: "RS256", kid: "k1" })
      .setIssuer(`https://securetoken.google.com/${PROJECT}`)
      .setAudience(PROJECT)
      .setSubject("uid-123")
      .setIssuedAt(now() - 7200)
      .setExpirationTime(now() - 3600)
      .sign(privateKey);
    await expect(verifyFirebaseIdToken(expired, PROJECT, keys)).rejects.toBeInstanceOf(AuthError);
  });

  it("rejects an auth_time in the future", async () => {
    await expect(verifyFirebaseIdToken(await token({ auth_time: now() + 600 }), PROJECT, keys)).rejects.toThrow(
      /auth_time/,
    );
  });

  it("rejects garbage", async () => {
    await expect(verifyFirebaseIdToken("not-a-jwt", PROJECT, keys)).rejects.toBeInstanceOf(AuthError);
  });
});

describe("bearerToken", () => {
  it("extracts the token from a Bearer header", () => {
    expect(bearerToken("Bearer abc.def")).toBe("abc.def");
    expect(bearerToken("bearer abc")).toBe("abc");
  });

  it("returns null for missing or malformed headers", () => {
    expect(bearerToken(null)).toBeNull();
    expect(bearerToken("Basic abc")).toBeNull();
    expect(bearerToken("Bearer")).toBeNull();
  });
});

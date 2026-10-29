import { describe, expect, it } from "vitest";
import { signupSchema } from "./auth/schemas";
import { authErrorMessage } from "./firebase/auth-errors";
import { safeRedirectPath } from "./utils";

describe("safeRedirectPath", () => {
  it("allows same-origin relative paths", () => {
    expect(safeRedirectPath("/my-list")).toBe("/my-list");
    expect(safeRedirectPath("/watch/movie/1?x=1")).toBe("/watch/movie/1?x=1");
  });

  it("rejects absolute and protocol-relative URLs", () => {
    expect(safeRedirectPath("https://evil.example")).toBe("/");
    expect(safeRedirectPath("//evil.example")).toBe("/");
    expect(safeRedirectPath("/\\evil.example")).toBe("/");
    expect(safeRedirectPath(null)).toBe("/");
  });
});

describe("authErrorMessage", () => {
  it("never reveals whether the email or the password was wrong", () => {
    expect(authErrorMessage({ code: "auth/user-not-found" })).toBe(authErrorMessage({ code: "auth/wrong-password" }));
  });

  it("falls back to a generic message", () => {
    expect(authErrorMessage(new Error("boom"))).toBe("Something went wrong. Please try again.");
  });
});

describe("signupSchema", () => {
  it("requires matching passwords with a letter and a number", () => {
    expect(signupSchema.safeParse({ email: "a@b.co", password: "abcdefg1", confirmPassword: "abcdefg1" }).success).toBe(true);
    const mismatch = signupSchema.safeParse({ email: "a@b.co", password: "abcdefg1", confirmPassword: "abcdefg2" });
    expect(mismatch.success).toBe(false);
    expect(signupSchema.safeParse({ email: "a@b.co", password: "abcdefgh", confirmPassword: "abcdefgh" }).success).toBe(false);
    expect(signupSchema.safeParse({ email: "nope", password: "abcdefg1", confirmPassword: "abcdefg1" }).success).toBe(false);
  });
});

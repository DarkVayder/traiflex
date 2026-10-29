"use client";

import { firebaseAuth } from "@/lib/firebase/client";

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function idToken(forceRefresh: boolean): Promise<string | null> {
  const user = firebaseAuth().currentUser;
  return user ? user.getIdToken(forceRefresh) : null;
}

async function send(path: string, init: RequestInit, forceRefresh: boolean): Promise<Response> {
  const token = await idToken(forceRefresh);
  const headers = new Headers(init.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (init.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  return fetch(path, { ...init, headers });
}

/**
 * Typed fetch for our own /api routes. Attaches the Firebase ID token, retries
 * once with a force-refreshed token on 401, and throws ApiError on failure.
 */
export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  let response = await send(path, init, false);
  if (response.status === 401 && firebaseAuth().currentUser) {
    response = await send(path, init, true);
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { error?: { code?: string; message?: string } } | null;
    throw new ApiError(
      response.status,
      body?.error?.code ?? "unknown",
      body?.error?.message ?? "Something went wrong. Please try again.",
    );
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

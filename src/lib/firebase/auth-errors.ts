const MESSAGES: Record<string, string> = {
  "auth/invalid-credential": "That email and password don't match. Try again or reset your password.",
  "auth/invalid-login-credentials": "That email and password don't match. Try again or reset your password.",
  "auth/wrong-password": "That email and password don't match. Try again or reset your password.",
  "auth/user-not-found": "That email and password don't match. Try again or reset your password.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/email-already-in-use": "An account with this email already exists. Sign in instead.",
  "auth/weak-password": "Choose a stronger password — at least 8 characters.",
  "auth/too-many-requests": "Too many attempts. Wait a moment and try again.",
  "auth/network-request-failed": "Can't reach the server. Check your connection and try again.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/missing-email": "Enter your email address.",
};

/** Maps a Firebase Auth error to a message safe to show the user. */
export function authErrorMessage(error: unknown): string {
  const code =
    typeof error === "object" && error !== null && "code" in error ? String((error as { code: unknown }).code) : "";
  return MESSAGES[code] ?? "Something went wrong. Please try again.";
}

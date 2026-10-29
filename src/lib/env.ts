import "server-only";
import { z } from "zod";

const serverEnvSchema = z.object({
  TMDB_API_KEY: z.string().min(1, "TMDB_API_KEY is required"),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1, "NEXT_PUBLIC_FIREBASE_PROJECT_ID is required"),
});

type ServerEnv = z.infer<typeof serverEnvSchema>;

let cached: ServerEnv | undefined;

/** Validated server env. Read lazily so a missing var fails the request that needs it, not the build. */
export function serverEnv(): ServerEnv {
  if (!cached) {
    const parsed = serverEnvSchema.safeParse(process.env);
    if (!parsed.success) {
      const missing = parsed.error.issues.map((issue) => issue.message).join("; ");
      throw new Error(`Invalid server environment: ${missing}`);
    }
    cached = parsed.data;
  }
  return cached;
}

import "server-only";
import mongoose from "mongoose";
import { serverEnv } from "@/lib/env";

// Reuse one connection across hot reloads in dev and across invocations on a warm serverless instance.
const globalForMongo = globalThis as typeof globalThis & {
  traiflexMongo?: Promise<typeof mongoose>;
};

export function connectMongo(): Promise<typeof mongoose> {
  globalForMongo.traiflexMongo ??= mongoose
    .connect(serverEnv().MONGODB_URI, { serverSelectionTimeoutMS: 5_000 })
    .catch((error: unknown) => {
      globalForMongo.traiflexMongo = undefined;
      throw error;
    });
  return globalForMongo.traiflexMongo;
}

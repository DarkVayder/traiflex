"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Spinner } from "@/components/ui/skeleton";
import { useAuth } from "./auth-provider";

function FullScreenSpinner() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <Spinner />
    </div>
  );
}

/** Renders children only for signed-in users; otherwise sends them to /login and back afterwards. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status !== "signed-out") return;
    // Read the location here rather than via usePathname() so the shell can still prerender.
    const here = `${window.location.pathname}${window.location.search}`;
    router.replace(here === "/" ? "/login" : `/login?next=${encodeURIComponent(here)}`);
  }, [status, router]);

  return status === "signed-in" ? children : <FullScreenSpinner />;
}

/** For /login and /signup: signed-in users go straight to where they were headed. */
export function RedirectIfSignedIn({ to, children }: { to: string; children: ReactNode }) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "signed-in") router.replace(to);
  }, [status, router, to]);

  return status === "signed-out" ? children : <FullScreenSpinner />;
}

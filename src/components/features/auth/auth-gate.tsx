"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Spinner } from "@/components/ui/skeleton";
import { loginHref } from "@/lib/auth/login-href";
import { useAuth } from "./auth-provider";

function FullScreenSpinner() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <Spinner />
    </div>
  );
}

/** For pages that need an account (My List, Account): signed-out visitors go to /login and back afterwards. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status !== "signed-out") return;
    // Read the location here rather than via usePathname() so the shell can still prerender.
    const here = `${window.location.pathname}${window.location.search}`;
    router.replace(loginHref(here));
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

import type { Metadata } from "next";
import { Suspense } from "react";
import { RedirectIfSignedIn } from "@/components/features/auth/auth-gate";
import { LoginForm } from "@/components/features/auth/login-form";
import { safeRedirectPath } from "@/lib/utils";

export const metadata: Metadata = { title: "Sign in" };

async function Login({ searchParams }: PageProps<"/login">) {
  const { next } = await searchParams;
  const target = safeRedirectPath(typeof next === "string" ? next : null);
  return (
    <RedirectIfSignedIn to={target}>
      <LoginForm next={target} />
    </RedirectIfSignedIn>
  );
}

export default function LoginPage(props: PageProps<"/login">) {
  return (
    <Suspense>
      <Login {...props} />
    </Suspense>
  );
}

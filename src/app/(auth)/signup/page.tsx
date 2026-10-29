import type { Metadata } from "next";
import { Suspense } from "react";
import { RedirectIfSignedIn } from "@/components/features/auth/auth-gate";
import { SignupForm } from "@/components/features/auth/signup-form";
import { safeRedirectPath } from "@/lib/utils";

export const metadata: Metadata = { title: "Create an account" };

async function Signup({ searchParams }: PageProps<"/signup">) {
  const { next } = await searchParams;
  const target = safeRedirectPath(typeof next === "string" ? next : null);
  return (
    <RedirectIfSignedIn to={target}>
      <SignupForm next={target} />
    </RedirectIfSignedIn>
  );
}

export default function SignupPage(props: PageProps<"/signup">) {
  return (
    <Suspense>
      <Signup {...props} />
    </Suspense>
  );
}

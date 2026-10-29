"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/skeleton";
import { resetSchema, type ResetValues } from "@/lib/auth/schemas";
import { authErrorMessage } from "@/lib/firebase/auth-errors";
import { firebaseAuth } from "@/lib/firebase/client";
import { AuthCard, FormAlert } from "./auth-card";

export function ResetPasswordForm() {
  const [result, setResult] = useState<{ tone: "error" | "success"; message: string } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetValues>({ resolver: zodResolver(resetSchema), defaultValues: { email: "" } });

  const onSubmit = handleSubmit(async ({ email }) => {
    setResult(null);
    try {
      await sendPasswordResetEmail(firebaseAuth(), email);
      // Same message whether or not the account exists, so the form can't be used to probe emails.
      setResult({ tone: "success", message: `If an account exists for ${email}, a reset link is on its way.` });
    } catch (error) {
      setResult({ tone: "error", message: authErrorMessage(error) });
    }
  });

  return (
    <AuthCard title="Reset your password" description="Enter your account email and we'll send you a link to choose a new password.">
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        {result ? <FormAlert tone={result.tone}>{result.message}</FormAlert> : null}
        <FormField label="Email" error={errors.email?.message}>
          <Input type="email" autoComplete="email" inputMode="email" {...register("email")} />
        </FormField>
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
          {isSubmitting ? <Spinner label="Sending" /> : "Email me a reset link"}
        </Button>
      </form>
      <Link href="/login" className="text-muted hover:text-foreground hover:underline">
        Back to sign in
      </Link>
    </AuthCard>
  );
}

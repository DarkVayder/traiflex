"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Spinner } from "@/components/ui/skeleton";
import { loginSchema, type LoginValues } from "@/lib/auth/schemas";
import { authErrorMessage } from "@/lib/firebase/auth-errors";
import { firebaseAuth } from "@/lib/firebase/client";
import { AuthCard, FormAlert } from "./auth-card";

export function LoginForm({ next }: { next: string }) {
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: true },
  });

  // On success the auth listener (RedirectIfSignedIn) navigates to `next`.
  const onSubmit = handleSubmit(async ({ email, password, remember }) => {
    setFormError(null);
    try {
      const auth = firebaseAuth();
      await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setFormError(authErrorMessage(error));
    }
  });

  return (
    <AuthCard title="Sign in">
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        {formError ? <FormAlert>{formError}</FormAlert> : null}
        <FormField label="Email" error={errors.email?.message}>
          <Input type="email" autoComplete="email" inputMode="email" {...register("email")} />
        </FormField>
        <FormField label="Password" error={errors.password?.message}>
          <PasswordInput autoComplete="current-password" {...register("password")} />
        </FormField>
        <Button type="submit" size="lg" disabled={isSubmitting} className="mt-1 w-full">
          {isSubmitting ? <Spinner label="Signing in" /> : "Sign in"}
        </Button>
        <div className="flex items-center justify-between text-sm text-muted">
          <label className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" className="size-4 accent-primary" {...register("remember")} />
            Remember me
          </label>
          <Link href="/forgot-password" className="hover:text-foreground hover:underline">
            Forgot password?
          </Link>
        </div>
      </form>
      <p className="text-muted">
        New to Traiflex?{" "}
        <Link
          href={next === "/" ? "/signup" : `/signup?next=${encodeURIComponent(next)}`}
          className="font-semibold text-foreground hover:underline"
        >
          Create an account
        </Link>
      </p>
    </AuthCard>
  );
}

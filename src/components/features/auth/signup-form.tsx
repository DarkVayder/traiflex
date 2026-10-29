"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Spinner } from "@/components/ui/skeleton";
import { signupSchema, type SignupValues } from "@/lib/auth/schemas";
import { authErrorMessage } from "@/lib/firebase/auth-errors";
import { firebaseAuth } from "@/lib/firebase/client";
import { AuthCard, FormAlert } from "./auth-card";

export function SignupForm({ next }: { next: string }) {
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setFormError(null);
    try {
      await createUserWithEmailAndPassword(firebaseAuth(), email, password);
      toast.success("Welcome to Traiflex!");
    } catch (error) {
      setFormError(authErrorMessage(error));
    }
  });

  return (
    <AuthCard title="Create your account" description="Trending trailers for movies and TV, plus a list of everything you want to watch.">
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        {formError ? <FormAlert>{formError}</FormAlert> : null}
        <FormField label="Email" error={errors.email?.message}>
          <Input type="email" autoComplete="email" inputMode="email" {...register("email")} />
        </FormField>
        <FormField
          label="Password"
          error={errors.password?.message}
          hint="At least 8 characters, with a letter and a number."
        >
          <PasswordInput autoComplete="new-password" {...register("password")} />
        </FormField>
        <FormField label="Confirm password" error={errors.confirmPassword?.message}>
          <PasswordInput autoComplete="new-password" {...register("confirmPassword")} />
        </FormField>
        <Button type="submit" size="lg" disabled={isSubmitting} className="mt-1 w-full">
          {isSubmitting ? <Spinner label="Creating your account" /> : "Create account"}
        </Button>
      </form>
      <p className="text-muted">
        Already have an account?{" "}
        <Link
          href={next === "/" ? "/login" : `/login?next=${encodeURIComponent(next)}`}
          className="font-semibold text-foreground hover:underline"
        >
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}

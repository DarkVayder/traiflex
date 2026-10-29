import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/features/auth/reset-password-form";

export const metadata: Metadata = { title: "Reset your password" };

export default function ForgotPasswordPage() {
  return <ResetPasswordForm />;
}

"use client";

import { sendPasswordResetEmail, signOut } from "firebase/auth";
import { KeyRound, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authErrorMessage } from "@/lib/firebase/auth-errors";
import { firebaseAuth } from "@/lib/firebase/client";
import { useAuth } from "../auth/auth-provider";
import { UserAvatar } from "../layout/site-nav";
import { useMyList } from "../my-list/use-my-list";

function formatDate(value: string | undefined) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function AccountView() {
  const { user } = useAuth();
  const { data: items } = useMyList();
  const router = useRouter();
  const [sending, setSending] = useState(false);

  if (!user) return null;

  const sendReset = async () => {
    if (!user.email) return;
    setSending(true);
    try {
      await sendPasswordResetEmail(firebaseAuth(), user.email);
      toast.success(`Password reset link sent to ${user.email}`);
    } catch (error) {
      toast.error(authErrorMessage(error));
    } finally {
      setSending(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(firebaseAuth());
    router.replace("/");
  };

  const rows = [
    { label: "Email", value: user.email ?? "—" },
    { label: "Member since", value: formatDate(user.metadata.creationTime) },
    { label: "Last signed in", value: formatDate(user.metadata.lastSignInTime) },
    { label: "Saved titles", value: items ? String(items.length) : "—" },
  ];

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 pb-16 pt-28 sm:px-8">
      <h1 className="font-display text-4xl tracking-wide sm:text-5xl">Account</h1>
      <section aria-labelledby="profile-heading" className="flex flex-col gap-6 rounded-xl bg-surface p-6 ring-1 ring-border sm:p-8">
        <div className="flex items-center gap-4">
          <UserAvatar email={user.email} className="size-14 text-2xl" />
          <h2 id="profile-heading" className="truncate text-xl font-semibold">
            {user.email}
          </h2>
        </div>
        <dl className="grid gap-4 sm:grid-cols-2">
          {rows.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1">
              <dt className="text-sm text-subtle">{label}</dt>
              <dd className="truncate">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap gap-3 border-t border-border pt-6">
          <Button variant="secondary" onClick={sendReset} disabled={sending || !user.email}>
            <KeyRound aria-hidden />
            {sending ? "Sending…" : "Change password"}
          </Button>
          <Button variant="primary" onClick={handleSignOut}>
            <LogOut aria-hidden />
            Sign out
          </Button>
        </div>
      </section>
    </div>
  );
}

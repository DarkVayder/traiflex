import type { Metadata } from "next";
import { AccountView } from "@/components/features/account/account-view";
import { RequireAuth } from "@/components/features/auth/auth-gate";

export const metadata: Metadata = { title: "Account" };

export default function ProfilePage() {
  return (
    <RequireAuth>
      <AccountView />
    </RequireAuth>
  );
}

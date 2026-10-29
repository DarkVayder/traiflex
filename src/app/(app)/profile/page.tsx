import type { Metadata } from "next";
import { AccountView } from "@/components/features/account/account-view";

export const metadata: Metadata = { title: "Account" };

export default function ProfilePage() {
  return <AccountView />;
}

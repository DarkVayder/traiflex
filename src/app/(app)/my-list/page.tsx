import type { Metadata } from "next";
import { RequireAuth } from "@/components/features/auth/auth-gate";
import { MyListView } from "@/components/features/my-list/my-list-view";

export const metadata: Metadata = { title: "My List" };

export default function MyListPage() {
  return (
    <RequireAuth>
      <MyListView />
    </RequireAuth>
  );
}

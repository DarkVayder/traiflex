import type { Metadata } from "next";
import { MyListView } from "@/components/features/my-list/my-list-view";

export const metadata: Metadata = { title: "My List" };

export default function MyListPage() {
  return <MyListView />;
}

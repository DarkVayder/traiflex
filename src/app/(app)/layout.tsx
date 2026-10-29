import { RequireAuth } from "@/components/features/auth/auth-gate";
import { SiteFooter } from "@/components/features/layout/site-footer";
import { SiteNav } from "@/components/features/layout/site-nav";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <RequireAuth>
      <SiteNav />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </RequireAuth>
  );
}

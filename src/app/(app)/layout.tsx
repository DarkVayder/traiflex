import { Suspense } from "react";
import { SiteFooter } from "@/components/features/layout/site-footer";
import { SiteNav } from "@/components/features/layout/site-nav";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      {/* The nav reads the pathname, so it renders behind Suspense and the rest of the page stays prerendered. */}
      <Suspense fallback={<div className="h-16" aria-hidden />}>
        <SiteNav />
      </Suspense>
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

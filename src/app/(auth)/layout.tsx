import { Wordmark } from "@/components/ui/wordmark";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="relative isolate flex min-h-dvh flex-col">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgb(229_9_20/0.28),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgb(229_9_20/0.12),transparent_55%)]"
      />
      <header className="px-4 py-6 sm:px-8 lg:px-12">
        <Wordmark className="text-4xl sm:text-5xl" />
      </header>
      <main className="flex flex-1 items-center justify-center px-4 pb-16">{children}</main>
    </div>
  );
}

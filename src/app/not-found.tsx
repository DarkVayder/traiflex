import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Wordmark } from "@/components/ui/wordmark";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 px-4 text-center">
      <Wordmark className="text-5xl" />
      <h1 className="text-2xl font-semibold">We couldn&apos;t find that page</h1>
      <p className="max-w-md text-muted">The title may have been removed from TMDB, or the link is mistyped.</p>
      <Link href="/" className={buttonVariants()}>
        Go to Home
      </Link>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Wordmark } from "@/components/ui/wordmark";

export const metadata: Metadata = { title: "Help Centre" };

const FAQ = [
  {
    q: "What is Traiflex?",
    a: "Traiflex is a place to discover what's trending in film and TV and watch the official trailers. It doesn't stream full movies or episodes.",
  },
  {
    q: "Where does the catalogue come from?",
    a: "Titles, artwork, ratings and trailers come from The Movie Database (TMDB), and trailers play from YouTube. Rows refresh every few hours.",
  },
  {
    q: "How does My List work?",
    a: "Press the + button on any title to save it, and the ✓ button to remove it. Your list is tied to your account, so it follows you to any device you sign in on.",
  },
  {
    q: "A title has no trailer. Why?",
    a: "TMDB doesn't have a trailer for every title yet, especially for very new or older releases. When one is added, it appears automatically.",
  },
  {
    q: "I forgot my password.",
    a: "Use “Forgot password?” on the sign-in page, or “Change password” on your Account page, and we'll email you a reset link.",
  },
];

export default function HelpPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="px-4 py-6 sm:px-8 lg:px-12">
        <Wordmark />
      </header>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 pb-16 sm:px-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-5xl tracking-wide">Help Centre</h1>
          <p className="text-muted">Answers to the most common questions about Traiflex.</p>
        </div>
        <div className="flex flex-col divide-y divide-border rounded-xl bg-surface ring-1 ring-border">
          {FAQ.map(({ q, a }) => (
            <details key={q} className="group px-6 py-5">
              <summary className="cursor-pointer list-none text-lg font-semibold marker:hidden">
                <span className="flex items-center justify-between gap-4">
                  {q}
                  <span aria-hidden className="text-2xl text-muted transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-muted">{a}</p>
            </details>
          ))}
        </div>
        <Link href="/" className={buttonVariants({ className: "self-start" })}>
          Back to Traiflex
        </Link>
      </main>
    </div>
  );
}

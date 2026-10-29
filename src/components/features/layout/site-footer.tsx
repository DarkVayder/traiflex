import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/60 px-4 py-10 text-sm text-subtle sm:px-8 lg:px-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/help" className="hover:text-foreground">
                Help Centre
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-foreground">
                Account
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/DarkVayder/traiflex"
                className="hover:text-foreground"
                target="_blank"
                rel="noreferrer"
              >
                Source on GitHub
              </a>
            </li>
          </ul>
        </nav>
        <p className="max-w-md md:text-right">
          Film and TV data from{" "}
          <a href="https://www.themoviedb.org/" className="underline hover:text-foreground" target="_blank" rel="noreferrer">
            TMDB
          </a>
          . This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </div>
      <p className="mt-6">© Traiflex · A portfolio project for discovering trailers.</p>
    </footer>
  );
}

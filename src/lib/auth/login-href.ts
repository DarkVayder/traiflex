/** Sign-in URL that brings the visitor back to `here` afterwards; the home page needs no `next`. */
export function loginHref(here: string): string {
  return here === "/" ? "/login" : `/login?next=${encodeURIComponent(here)}`;
}

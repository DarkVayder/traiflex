"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { signOut } from "firebase/auth";
import { ChevronDown, CircleHelp, ListVideo, LogOut, Search, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Wordmark } from "@/components/ui/wordmark";
import { firebaseAuth } from "@/lib/firebase/client";
import { cn } from "@/lib/utils";
import { useAuth } from "../auth/auth-provider";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/tv", label: "TV Shows" },
  { href: "/movies", label: "Movies" },
  { href: "/my-list", label: "My List" },
];

export function UserAvatar({ email, className }: { email: string | null | undefined; className?: string }) {
  const initial = (email?.trim()[0] ?? "?").toUpperCase();
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-8 items-center justify-center rounded-md bg-gradient-to-br from-primary to-[#8a0a10] text-sm font-bold text-primary-foreground",
        className,
      )}
    >
      {initial}
    </span>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // "/" jumps to search, like on most streaming and docs sites.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      event.preventDefault();
      router.push("/search");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(firebaseAuth());
      router.replace("/login");
    } catch {
      toast.error("Couldn't sign you out. Please try again.");
    }
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const links = (className: string) =>
    LINKS.map(({ href, label }) => (
      <li key={href}>
        <Link
          href={href}
          aria-current={isActive(href) ? "page" : undefined}
          className={cn(
            className,
            "transition-colors hover:text-foreground",
            isActive(href) ? "font-semibold text-foreground" : "text-muted",
          )}
        >
          {label}
        </Link>
      </li>
    ));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled ? "bg-background/95 shadow-lg shadow-black/40 backdrop-blur" : "bg-gradient-to-b from-background/90 to-transparent",
      )}
    >
      <nav aria-label="Main" className="flex h-16 items-center gap-6 px-4 sm:px-8 lg:px-12">
        <Wordmark className="text-3xl" />
        <ul className="hidden items-center gap-5 text-sm md:flex">{links("py-2")}</ul>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/search"
            aria-label="Search"
            title="Search (press /)"
            aria-current={isActive("/search") ? "page" : undefined}
            className={cn(
              "flex size-10 items-center justify-center rounded-md transition-colors hover:text-foreground",
              isActive("/search") ? "text-foreground" : "text-muted",
            )}
          >
            <Search className="size-5" aria-hidden />
          </Link>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger
              className="flex items-center gap-1.5 rounded-md p-1 text-muted hover:text-foreground"
              aria-label="Account menu"
            >
              <UserAvatar email={user?.email} />
              <ChevronDown className="size-4" aria-hidden />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                sideOffset={8}
                className="z-50 min-w-56 rounded-lg border border-border bg-surface p-1.5 text-sm shadow-xl shadow-black/50"
              >
                <DropdownMenu.Label className="truncate px-3 py-2 text-xs text-subtle">{user?.email}</DropdownMenu.Label>
                {[
                  { href: "/profile", label: "Account", Icon: UserRound },
                  { href: "/my-list", label: "My List", Icon: ListVideo },
                  { href: "/help", label: "Help Centre", Icon: CircleHelp },
                ].map(({ href, label, Icon }) => (
                  <DropdownMenu.Item key={href} asChild>
                    <Link
                      href={href}
                      className="flex items-center gap-3 rounded-md px-3 py-2 outline-none data-[highlighted]:bg-surface-raised"
                    >
                      <Icon className="size-4 text-muted" aria-hidden />
                      {label}
                    </Link>
                  </DropdownMenu.Item>
                ))}
                <DropdownMenu.Separator className="my-1 h-px bg-border" />
                <DropdownMenu.Item
                  onSelect={handleSignOut}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 outline-none data-[highlighted]:bg-surface-raised"
                >
                  <LogOut className="size-4 text-muted" aria-hidden />
                  Sign out of Traiflex
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </nav>
      <ul className="no-scrollbar flex gap-5 overflow-x-auto px-4 pb-3 text-sm sm:px-8 md:hidden">{links("whitespace-nowrap py-1")}</ul>
    </header>
  );
}

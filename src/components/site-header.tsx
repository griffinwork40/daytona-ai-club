import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
import { Plate } from "@/components/ui/primitives";
import { nav, site } from "@/config/site";

/** Club wordmark: initials on a plate, then "AI Club". */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Plate className="text-2xl">{site.plate}</Plate>{" "}
      <span className="display text-2xl tracking-wide">AI Club</span>
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-foam/8 bg-ink-950/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* The visible wordmark is the link's accessible name. */}
        <Link href="/">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="label text-mist transition hover:text-foam"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#join"
            className="display bg-foam px-4 py-2 text-base tracking-wide text-ink-950 transition hover:bg-sun-300"
          >
            Join the club
          </Link>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}

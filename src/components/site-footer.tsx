import Link from "next/link";
import { Wordmark } from "@/components/site-header";
import { CheckerStrip, Container } from "@/components/ui/primitives";
import { nav, site } from "@/config/site";

export function SiteFooter() {
  const external = [
    { href: site.links.luma, label: "Luma" },
    { href: site.links.discord, label: "Discord" },
    { href: site.links.github, label: "GitHub" },
  ].filter((l): l is { href: string; label: string } => Boolean(l.href));

  return (
    <footer className="mt-auto bg-ink-950">
      <CheckerStrip />
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-sm text-mist">
            {site.tagline}. Monthly meetups for builders and the curious in{" "}
            {site.county}.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="label text-sun-300">Site</p>
          <ul className="mt-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-block py-1.5 text-mist hover:text-foam">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#join" className="inline-block py-1.5 text-mist hover:text-foam">
                Join the club
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="label text-sun-300">Elsewhere</p>
          {external.length > 0 || site.contactEmail ? (
            <ul className="mt-3">
              {external.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="inline-block py-1.5 text-mist hover:text-foam"
                    rel="noreferrer"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              {site.contactEmail ? (
                <li>
                  <a
                    href={`mailto:${site.contactEmail}`}
                    className="inline-block py-1.5 text-mist hover:text-foam"
                  >
                    {site.contactEmail}
                  </a>
                </li>
              ) : null}
            </ul>
          ) : (
            <p className="mt-4 text-mist">
              The email list is the one place to follow along for now.
            </p>
          )}
        </div>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-foam/8 py-6 text-sm text-mist/80 sm:flex-row sm:justify-between">
        <p>
          Est. {site.founded} in {site.city}, {site.region}. Run by{" "}
          {site.organizer.name}.
        </p>
        <p>An independent community club, not affiliated with any company.</p>
      </Container>
    </footer>
  );
}

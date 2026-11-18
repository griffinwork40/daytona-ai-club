/**
 * Single source of truth for the club's identity.
 * Renaming the club is an edit to `name`, `shortName`, and `plate` here.
 *
 * Anything set to `null` is not known yet. Components hide the matching
 * UI instead of showing a placeholder, so nothing fake ships.
 */
export const site = {
  name: "Daytona Beach AI Club",
  shortName: "DBAI",
  /** Short text shown on the wordmark plate. */
  plate: "DB",
  city: "Daytona Beach",
  region: "FL",
  county: "Volusia County",
  founded: 2026,
  tagline: "A small group building things with AI in Daytona Beach",
  description:
    "Daytona Beach AI Club is a casual, in-person gathering for people around Daytona Beach who enjoy experimenting with AI, building things, and hanging out. No presentations, no agenda. Just curious people, laptops, and good company.",
  organizer: {
    name: "Griffin Long",
    bio: "Software engineer in Daytona Beach building open source AI agent tools. Started this because he wanted to find people nearby who are into the same things.",
    url: null as string | null,
  },
  links: {
    /** Luma calendar URL. RSVP buttons stay hidden until this is set. */
    luma: null as string | null,
    discord: null as string | null,
    github: null as string | null,
  },
  /** Public contact address. Mail links stay hidden until this is set. */
  contactEmail: null as string | null,
} as const;

export const nav = [
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/speak", label: "Share" },
] as const;

/**
 * Canonical origin for metadata, sitemap, and share images.
 * Set SITE_URL in production. Falls back to the Vercel production URL,
 * then to localhost for development.
 */
export function siteUrl(): string {
  const explicit = process.env.SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

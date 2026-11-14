/**
 * Single source of truth for the club's identity.
 * Renaming the club is an edit to `name`, `shortName`, and `plate` here.
 *
 * Anything set to `null` is not known yet. Components hide the matching
 * UI instead of showing a placeholder, so nothing fake ships.
 */
export const site = {
  name: "386 AI Club",
  shortName: "386 AI",
  /** Number shown on the wordmark plate. 386 is the local area code. */
  plate: "386",
  city: "Daytona Beach",
  region: "FL",
  county: "Volusia County",
  founded: 2026,
  tagline: "Daytona Beach's in-person AI club",
  description:
    "386 AI Club is a monthly, in-person meetup in Daytona Beach, Florida for people who build with AI, use it at work, or want to see what it can actually do. Live demos, no sales pitches.",
  organizer: {
    name: "Griffin Long",
    /** DRAFT: confirm wording with the organizer before launch. */
    bio: "Griffin is a Daytona Beach software engineer who builds open source AI agent tools.",
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
  { href: "/speak", label: "Speak" },
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

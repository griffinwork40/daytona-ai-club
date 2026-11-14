# AI club launch site (Daytona Beach)

Status: approved 2026-11-14. Owner: Griffin Long.

## Goal

A launch website for a new in-person AI club in Daytona Beach, Florida. The site has one job: get founding members onto an email list and into meetup #001.

The club has held zero events. The site says so and makes it the hook ("Founding members wanted") instead of faking activity.

## Research this plan rests on

Collected 2026-11-14 by two read-only research agents plus direct checks.

1. **Name collision.** Daytona (daytona.io) is an AI infrastructure company that runs its own community events. Its events page was loaded directly and confirmed. A club named "Daytona AI" would compete with it in search. `daytonabeachai.com` is registered (creation date 2026-04-23 per whois), reportedly by a local AI services vendor.
2. **Local gap.** The research agent found no recurring in-person AI meetup in Volusia County. Closest groups: GDG Daytona Beach (Google developer group) and Agentville (AI agents, reportedly online only). Both pages were loaded and exist. Member counts and recent activity were not confirmed.
3. **Prior art.** The strongest club sites (AI Tinkerers, Kansas City AI Club, Chi Hack Night, Vancouver AI) lead with the next event, show what a night looks like, publish house rules, and offer one join action. The weakest show stale events and zero value counters.
4. **Tooling facts loaded from pricing pages.** Luma free plan: unlimited events and guests. Resend free plan: 3,000 emails a month, 100 a day. Luma API terms were not confirmed, so nothing depends on the API.

Not confirmed: Daytona's funding and search rank figures, local group sizes, venue availability, and domain availability beyond a whois lookup.

## Chosen approach

### Name

Default: **386 AI Club** (386 is the local area code). "Daytona Beach" goes in the tagline and page titles for local search. The name lives in one config file (`src/config/site.ts`), so changing it is a one-line edit.

| Option | Domain (whois only) | Read |
|---|---|---|
| 386 AI Club (default) | `386ai.club` likely available | No collision with daytona.io |
| Daytona Beach AI Club | `daytonaaiclub.com` likely available | Literal, shares search results with daytona.io |
| Daytona AI | `daytonaai.club` likely available | Strongest collision, avoid |

The name was not confirmed by the owner at approval time. 386 AI Club is an assumption.

### Visual direction: race day at sunrise

1. Deep navy shifting to an Atlantic sunrise gradient, with condensed display type.
2. Meetups numbered like race cars (#001).
3. A hero canvas of an ocean swell drawn from text characters, with a static fallback for reduced motion.

Alternative direction not taken: beach town neon (motel signs, boardwalk arcade).

### Stack

1. Next.js 16 App Router, React 19, TypeScript, Tailwind 4, Motion, pnpm.
2. Events are typed files in the repo. No CMS.
3. Luma hosts RSVPs by link only.
4. A server action adds signups to a Resend audience.
5. Vercel hosts it.

### Pages in v1

| Route | Contents |
|---|---|
| `/` | Hero, next meetup block, who it is for, run of show, house rules, join form, FAQ |
| `/events`, `/events/[slug]` | Upcoming and archive. Detail page with agenda, venue, RSVP link, later a recap and photos |
| `/about` | Why this exists, who runs it, code of conduct |
| `/speak` | Propose a demo or talk (form emails the organizer) |

Deferred: sponsors page, blog, member directory, Discord integration.

## Steps

### Milestone 1: foundation

1. Scaffold Next.js with TypeScript, Tailwind, ESLint, App Router, `src/` directory.
2. Add design tokens (colors, type scale, spacing) in `globals.css`.
3. Add `src/config/site.ts` holding name, tagline, area, links, and contact.
4. Build the root layout, header, footer, and the hero with the text swell canvas.
5. Capture desktop and mobile screenshots for owner review.

### Milestone 2: three parallel workstreams

1. **Content sections and pages.** Home sections (who it is for, run of show, house rules, FAQ), `/about`, `/speak` page shell.
2. **Event model.** Typed event files, a pure upcoming and past split that takes the current time as an argument, unit tests, `/events` and `/events/[slug]`, next meetup block.
3. **Forms.** Join and speak server actions with validation, a honeypot field, and a rate limit. Join writes to a Resend audience. Speak emails the organizer. Without a Resend key both report honestly that signups are not live yet instead of pretending to succeed.

### Milestone 3: polish

1. Generated share images (Open Graph).
2. Sitemap and robots.
3. Event and Organization structured data.
4. Accessibility and performance pass.

### Milestone 4: ship (each step waits for owner approval)

1. Create the GitHub repo and push.
2. Deploy to Vercel.
3. Buy the domain.

## Verification

Typecheck, ESLint, production build, unit tests, and mobile and desktop screenshots. No source file over 350 lines.

## Risks

1. **Stale site.** The next meetup block is computed from dates. With no upcoming event it switches to "date being set, get on the list". Counters stay hidden until they are worth showing.
2. **Heavy hero.** The canvas loads lazily, pauses when off screen, and has a performance budget on mobile.
3. **Form spam.** Honeypot plus rate limit.
4. **Unverified research.** See the "Not confirmed" list above.
5. **Rate limit on serverless.** An in memory limit resets per instance on Vercel. Acceptable for launch volume, noted for later.

## Alternatives considered

1. **Luma or Meetup page only.** Fastest, but no identity and the organizer does not own the list.
2. **A CMS such as Sanity.** Unnecessary for one organizer.
3. **Static export.** Rules out the server side forms.

## Needed from the owner (none block milestone 1)

1. Name pick.
2. Date and venue for meetup #001.
3. A short bio.
4. A Resend API key and audience id.

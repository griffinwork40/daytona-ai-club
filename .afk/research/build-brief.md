# Build brief for milestone 2 workstreams

Read this whole file before writing code. Three agents work in this tree at the same time, each with its own file ownership.

## Project

- Path: `/Users/griffinlong/Projects/daytona-ai-club`
- A launch site for 386 AI Club, a new in-person AI club in Daytona Beach, Florida. The club has held zero meetups. The site's one job is to get founding members onto an email list and into meetup #001.
- Stack: Next.js 16.4.6 App Router, React 19.3, TypeScript, Tailwind 4, Motion, pnpm, Vitest. Source lives in `src/`, import alias `@/*`.
- Plan: `.afk/plans/ai-club-launch-site.md`.

## This Next.js version is not the one you remember

`next.config.ts` sets `cacheComponents: true` and `partialPrefetching: true`. Read the sections of `.afk/research/next16-conventions.md` that touch your work, and check `node_modules/next/dist/docs/` when in doubt. The rules that bite most:

1. `new Date()`, `Date.now()`, and `Math.random()` in a server component fail the build unless they run inside a `"use cache"` scope (pair it with `cacheLife`) or after `await io()` / `await connection()` inside `<Suspense>`. Verified in `01-app/01-getting-started/08-caching.md` and `01-app/03-api-reference/04-functions/io.md`.
2. `params` is a Promise. Type pages with the global `PageProps<'/route/[slug]'>` and `await props.params`. Run `pnpm exec next typegen` after adding a route so those types exist.
3. `generateStaticParams` must return at least one entry.
4. `headers()` and `cookies()` are async and cannot be called inside `"use cache"`.
5. `next/dynamic` with `ssr: false` is only allowed inside a client component.
6. `next lint` does not exist. Lint with `pnpm exec eslint <paths>`.

## Design system (already built, use it, do not restyle it)

- Tokens in `src/app/globals.css`. Colors: `ink-950..600` (navy), `foam` (text), `mist` (muted text), `sun-200..500`, `flare-500`, `dusk-500/700/900`. Fonts: `font-display` (Big Shoulders, condensed), `font-sans` (Geist), `font-mono` (Geist Mono).
- CSS component classes: `.display` (condensed caps headings), `.label` (small mono caps), `.text-sunrise` (gradient text), `.checker`, `.panel` (card surface), `.field` (form input), `.prose-club`.
- `src/components/ui/primitives.tsx`: `Container`, `Section` (eyebrow, title, lede), `PageHeader` (interior page heading), `Plate` (slanted race number plate), `CheckerStrip`.
- `src/components/ui/button.tsx`: `ButtonLink` for navigation, `buttonClass(variant)` for real `<button>` elements. Variants: `primary`, `ghost`.
- `src/components/ui/reveal.tsx`: `Reveal` scroll animation wrapper (client). Use it sparingly on section content, never on anything above the fold.
- Visual direction: race day at sunrise. Dark navy surfaces, sunrise gradient accents, condensed display type, meetups numbered like race cars (`#001`). Square corners, no rounded cards. Look at `src/components/hero/hero.tsx` and `src/components/site-footer.tsx` for the house style.
- Layout, header, and footer already exist. Pages render inside `<main>`.

## Identity and facts

`src/config/site.ts` holds the name, tagline, organizer, and links. Always read names from it, never hard code "386 AI Club" in components. Fields set to `null` are unknown: hide the matching UI, never show a placeholder.

Known facts you may state:
- In-person, monthly, in the Daytona Beach area (Volusia County), founded 2026 by Griffin Long.
- Zero meetups held so far. Meetup #001 is called "Founding Night". Its date and venue are not set.
- Intended format: short live demos, one longer deep dive, open time to build and get help. No sales pitches.
- For people who build with AI, people who use it at work, and people who are curious.

Not known, so never state as fact: any date, time, venue, address, price, sponsor, member count, attendance number, testimonial, or partner. Where a visitor would expect one of these, say plainly that it is being set and point to the email list.

## Copy rules

- Plain and direct. Short sentences. No hype words, no rhetorical questions, no em dashes.
- No fake activity. No counters, no "join 500 members".

## Engineering rules

- No source file over 350 lines. Split by concern instead.
- Stay inside your file ownership. If you need a change elsewhere, do not make it: describe it in your final report.
- Do not run `pnpm add`, `pnpm install`, `pnpm build`, or `git commit`. Do not start a dev server. One is already running at `http://localhost:3000` with hot reload: use `curl` against it to check that your routes return 200 and contain what you expect.
- Verify with: `pnpm exec next typegen && pnpm exec tsc --noEmit`, `pnpm exec eslint <your paths>`, and `pnpm exec vitest run <your tests>`. Other agents are mid-edit in the same tree, so type errors in files you do not own are not yours to fix: report them and move on.
- Tests are Vitest, node environment, files named `*.test.ts` under `src/`. Test pure logic. Vitest cannot render async server components.

## Seams between workstreams

These three components exist as stubs right now. Their import paths, export names, and props are fixed contracts:

| Import | Owner | Contract |
|---|---|---|
| `NextMeetup` from `@/components/events/next-meetup` | events | Server component, no props. Renders a card, not a section wrapper. Must be safe to render in a statically prerendered page with no Suspense boundary around it. |
| `JoinForm` from `@/components/forms/join-form` | forms | Client component. Optional prop `source?: string`. Renders the form only. |
| `SpeakForm` from `@/components/forms/speak-form` | forms | Client component, no props. Renders the form only. |

Anchors on the home page that other code links to: `#next`, `#run-of-show`, `#join`.

## Final report format

At most 250 words: files created or changed, the exact verification commands you ran with their results, assumptions you made, anything you needed outside your ownership, and what you did not check.

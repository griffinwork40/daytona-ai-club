# Daytona Beach AI Club website

Launch site for Daytona Beach AI Club, an in-person AI club in Daytona Beach, Florida. Its one job is to get founding members onto the email list and into meetup #001.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind 4, and Motion. Hosted on Vercel.

## Run it

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm check        # typecheck, lint, unit tests, production build
```

Individual gates: `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`.

## Where things live

| To change | Edit |
|---|---|
| Club name, tagline, organizer, links, contact email | `src/config/site.ts` |
| Home page copy | `src/content/home.ts`, `src/content/audiences.ts`, `src/content/faq.ts` |
| About and speak page copy | `src/content/about.ts`, `src/content/speak.ts` |
| Meetups | `src/content/events/` |
| Colors, type, shared CSS classes | `src/app/globals.css` |
| Hero and the text swell | `src/components/hero/` |

Fields set to `null` in `src/config/site.ts` are unknown. The matching UI stays hidden until they are filled in. Lines marked `// DRAFT:` in `src/content/` are assumptions about club policy that the organizer should confirm or rewrite.

## Add or update a meetup

1. Copy `src/content/events/founding-night.ts` to a new file and give it the next `number` and a unique `slug`.
2. Add it to the list in `src/content/events/index.ts`.
3. Fill in only what is confirmed. `start` and `end` are ISO strings with an explicit UTC offset, for example `2027-01-21T18:30:00-05:00`. `venue` and `rsvpLink` are optional.

Nothing else needs editing. What counts as upcoming or past is computed from the dates against a clock that refreshes hourly, so the home page, `/events`, and the event page update themselves. An event with a start but no end is treated as running for three hours. After a meetup, add `recap` and `photos` to its file and they appear on its page.

## Forms and email

Both forms deliver through [Resend](https://resend.com). Copy `.env.example` to `.env.local` and fill it in.

| Variable | Needed by | Purpose |
|---|---|---|
| `RESEND_API_KEY` | both forms | Resend API key |
| `RESEND_SEGMENT_ID` | join form | Segment that new members are added to |
| `RESEND_FROM_ADDRESS` | speak form | Sender on a domain verified in Resend |
| `ORGANIZER_EMAIL` | speak form | Where talk proposals are delivered |
| `SITE_URL` | metadata | Canonical origin, no trailing slash |

When a form's variables are missing, it shows a "not open yet" notice instead of accepting input it cannot store. Each form has a honeypot field and a per-IP rate limit. The rate limit is held in memory, so on Vercel it applies per server instance.

## Before launch

1. Confirm the club name in `src/config/site.ts`.
2. Set the date, venue, and RSVP link for meetup #001 in `src/content/events/founding-night.ts`.
3. Review every `// DRAFT:` line in `src/content/`.
4. Create the Resend segment, verify a sending domain, and set the environment variables in Vercel.
5. Send one real signup and one real proposal through the deployed site and confirm they arrive.
6. Set `SITE_URL` to the production domain.

## Project notes

- `.afk/plans/ai-club-launch-site.md` is the approved plan and its status.
- `.afk/research/next16-conventions.md` summarises how this Next.js version differs from older ones. The app uses Cache Components, so reading the clock in a server component must happen inside a `"use cache"` scope. See `src/lib/now.ts`.
- No source file is over 350 lines. Split by concern instead of raising that.

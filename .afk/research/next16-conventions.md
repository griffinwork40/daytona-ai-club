# Next.js 16.4.6 + React 19.3 — Conventions Brief

> Every claim below comes from a file read from `node_modules/next/dist/docs/`.
> Format: **rule → snippet → citation (file:line) → gotcha**.
> "docs silent" = no doc file addressed the question.

---

## 1. Cache Components (`cacheComponents: true`)

### What it changes

`cacheComponents: true` is the Next.js 16 replacement for the old `experimental.ppr`
and `experimental.dynamicIO` flags (both removed). It enables the full Cache Components
model: server components are prerendered into a **static shell**; anything that needs
runtime data must live inside a `<Suspense>` boundary or be wrapped in `"use cache"`.

> "Enabling `cacheComponents` is not a rename-only change: it can surface build errors
> for uncached data outside of `<Suspense>`."
> — `02-guides/upgrading/version-16.md:1258`

### `"use cache"` directive

Must be placed at the top of an `async` function, component, or file. All cached
functions/components **must** be async.

```ts
// lib/events.ts
import { cacheLife, cacheTag } from 'next/cache'

export async function getUpcomingEvents() {
  'use cache'
  cacheLife('hours')           // revalidate: 1 h, expire: 1 day
  cacheTag('events')
  const res = await fetch('https://api.example.com/events')
  return res.json()
}
```
Citation: `03-api-reference/01-directives/use-cache.md:50–65`, `cacheLife.md:71–81`

### Reading the current time — the right pattern

**Problem:** `new Date()` / `Date.now()` called directly inside a cached component runs
at build time and returns a stale value. Called outside `<Suspense>` on a
`cacheComponents` route it triggers:

```
Route "/events": Next.js encountered uncached data during prerendering.
`fetch(...)` or `connection()` accessed outside of `<Suspense>` prevents the route
from being prerendered …
Ways to fix this:
  - [stream] Provide a placeholder with `<Suspense fallback={...}>`
  - [cache] Cache the data access with "use cache"
  - [block] Set `export const instant = false`
```
Citation: `02-guides/ai-agents.md:149–159`

**Correct pattern for "show upcoming events, refresh ~hourly":**

```tsx
// app/events/page.tsx
import { Suspense } from 'react'
import { getUpcomingEvents } from '@/lib/events'

export default function Page() {
  return (
    <Suspense fallback={<p>Loading events…</p>}>
      <EventList />
    </Suspense>
  )
}

async function EventList() {
  'use cache'
  cacheLife('hours')           // stale 5 min client, revalidate 1 h server
  const events = await getUpcomingEvents()
  const now = Date.now()       // safe: runs inside cached scope at revalidation time
  return <ul>{events.filter(e => e.date > now).map(…)}</ul>
}
```

> `connection()` from `next/server` is the escape hatch when you need a fresh value
> on every request (no caching). Place the calling component inside `<Suspense>`.

```ts
import { connection } from 'next/server'

export default async function LiveClock() {
  await connection()           // prerendering stops here
  return <time>{new Date().toISOString()}</time>
}
```
Citation: `03-api-reference/04-functions/connection.md:7–19`, `:84`

### `cacheLife` preset profiles

| Profile   | stale    | revalidate | expire  |
|-----------|----------|------------|---------|
| `seconds` | 30 s     | 1 s        | 1 min   |
| `minutes` | 5 min    | 1 min      | 1 h     |
| `hours`   | 5 min    | 1 h        | 1 day   |
| `days`    | 5 min    | 1 day      | 1 week  |
| `weeks`   | 5 min    | 1 week     | 30 days |
| `max`     | 5 min    | 30 days    | 1 year  |

**Client minimum:** 30 s stale enforced regardless of config.
Only `seconds` profile is excluded from prerenders (expire < 5 min).
Citation: `cacheLife.md:139–148`, `:266–272`

### `revalidateTag` now requires a second argument

```ts
// Before (Next.js 15) — TypeScript error in 16
revalidateTag('events')

// After (Next.js 16)
revalidateTag('events', 'hours')   // second arg = cacheLife profile
// or for read-your-writes (Server Actions only):
updateTag('events')
```
Citation: `02-guides/upgrading/version-16.md:426–436`

### Gotchas

- `cookies()`, `headers()`, `searchParams` **cannot** be called inside `"use cache"` —
  read them outside, pass as arguments. Citation: `use-cache.md:241`
- Nesting a `seconds`-profile cache inside an outer `"use cache"` without an explicit
  `cacheLife` on the outer scope **fails the build**. Citation: `cacheLife.md:449–484`
- `React.cache` is isolated inside `"use cache"` boundaries — values stored outside
  are not visible inside. Citation: `use-cache.md:293–317`
- Build timeout (50 s) if a Promise from runtime data is passed as a prop into a cached
  scope. Citation: `use-cache.md:698–704`

---

## 2. Dynamic Routes

### Typing and accessing `params`

`params` is now `Promise<{…}>` — always await it. Use `npx next typegen` to generate
`PageProps`, `LayoutProps`, `RouteContext` globally.

```tsx
// app/blog/[slug]/page.tsx
export default async function Page(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params
  return <h1>{slug}</h1>
}
```
Citation: `02-guides/upgrading/version-16.md:285–293`

Client components: use `React.use(params)` — not `await`.
Citation: `03-api-reference/03-file-conventions/dynamic-routes.md:52–68`

### `generateStaticParams` under Cache Components

With `cacheComponents: true`, `generateStaticParams` **must return at least one param**
(empty array is a build error). Use a placeholder if values are unknown at build time.

```ts
export async function generateStaticParams() {
  return [{ slug: '__placeholder__' }]  // handle with notFound() in page
}
```
Citation: `03-api-reference/04-functions/generate-static-params.md:311–313`

### Without `generateStaticParams`

Params are runtime data. Wrap param access in `<Suspense>`:

```tsx
export default function Page({ params }: PageProps<'/blog/[slug]'>) {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      {params.then(({ slug }) => <Content slug={slug} />)}
    </Suspense>
  )
}
```
Citation: `dynamic-routes.md:170–197`

### `notFound()`

Call `notFound()` from `next/navigation` for 404s. All parallel route slots now require
an explicit `default.js`; build fails without one.
Citation: `version-16.md:921–939`

---

## 3. Server Actions and Forms

### Defining actions

```ts
// app/actions.ts
'use server'
import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  const title = String(formData.get('title'))
  // validate, auth-check, write to DB…
  revalidatePath('/posts')
}
```
Citation: `02-guides/server-actions.md:50–70`

### `useActionState` (progressive enhancement)

```tsx
'use client'
import { useActionState } from 'react'
import { createPost } from './actions'

export function PostForm() {
  const [state, action, isPending] = useActionState(createPost, null)
  return (
    <form action={action}>
      <input name="title" />
      <button disabled={isPending}>Submit</button>
      {state?.error && <p>{state.error}</p>}
    </form>
  )
}
```
(Docs describe this pattern; `useActionState` from React 19 is the standard hook.)
Citation: `02-guides/server-actions.md:20–24`

### Reading request headers (e.g. client IP) inside an action

```ts
'use server'
import { headers } from 'next/headers'

export async function logVisit() {
  const hdrs = await headers()
  const ip = hdrs.get('x-forwarded-for')
  // …
}
```
`headers()` is fully async in Next.js 16; synchronous access removed.
Citation: `version-16.md:263–270`

### Cache Components interaction

Server Actions are **not** subject to `"use cache"` — the directive has no effect in
the proxy/action execution path. `cacheTag` / `cacheLife` called inside an action throw.
Use `updateTag` (immediate) or `revalidateTag` (stale-while-revalidate) instead.
Citation: `use-cache.md:422–424`

### Dispatch is sequential on the client

Next.js queues client-dispatched actions one at a time. Do parallel work **inside** a
single action, not via `Promise.all` on the client.
Citation: `server-actions.md:28–31`

---

## 4. Metadata

### Static and generated

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: { template: '%s | Daytona AI Club', default: 'Daytona AI Club' },
  description: '…',
}
```

```tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  return { title: post.title, description: post.description }
}
```
Citation: `01-getting-started/14-metadata-and-og-images.md:46–96`

Metadata is streamed for dynamic pages (injected after UI starts rendering).
Disabled for bots/crawlers which get the full `<head>`. Citation: `:121–129`

### File conventions

| File | Purpose |
|------|---------|
| `app/favicon.ico` | favicon |
| `app/opengraph-image.tsx` | dynamic OG image |
| `app/icon.tsx` | app icon |
| `app/sitemap.ts` | sitemap |
| `app/robots.ts` | robots.txt |

Citation: `14-metadata-and-og-images.md:207–214`

### `ImageResponse` (dynamic OG images)

```ts
// app/opengraph-image.tsx
import { ImageResponse } from 'next/og'   // ← correct import path

export default function Image() {
  return new ImageResponse(
    <div style={{ display: 'flex', fontSize: 48 }}>Hello OG</div>,
    { width: 1200, height: 630 }
  )
}
```
Constraints: only flexbox + subset of CSS (no `display:grid`); max bundle 500 KB;
fonts must be `ttf`/`otf`/`woff` (prefer ttf/otf for speed).
Citation: `03-api-reference/04-functions/image-response.md:14–52`

### In Next.js 16: `opengraph-image` params are async

The image-generating function now receives `params` and `id` as Promises:

```ts
export default async function Image({ params, id }) {
  const { slug } = await params   // was synchronous in Next.js 15
  const imageId = await id        // id is now Promise<string>
}
```
Citation: `version-16.md:316–328`

### Interaction with Cache Components

`metadata` / `generateMetadata` exports work normally. For `generateStaticParams`
routes, metadata is prerendered with the page. For dynamic routes, metadata streams.
Docs silent on explicit Cache Components × metadata interaction beyond this.

---

## 5. Fonts

### `next/font/google` with CSS variable (Tailwind 4 `@theme`)

```tsx
// app/layout.tsx
import { Geist, Geist_Mono } from 'next/font/google'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

```css
/* app/globals.css — Tailwind 4 @theme block */
@theme {
  --font-sans: var(--font-geist), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
}
```

Fonts self-hosted automatically; no requests sent to Google at runtime.
Citation: `01-getting-started/13-fonts.md:17–51`, `:96–138`

**Gotcha:** Variable fonts preferred for performance. Non-variable fonts require
explicit `weight`. Citation: `:177`

---

## 6. Client-only Components

### `"use client"`

```tsx
'use client'
import { useState } from 'react'
export function Counter() { … }
```

Marks the client boundary. Everything imported into a `"use client"` file is bundled
for the browser. Keep the boundary as deep as possible.

### `next/dynamic` with `ssr: false`

**Rule:** `ssr: false` only works for Client Components. Move it **into** a Client
Component file — not a Server Component.

```tsx
// app/components/map-wrapper.tsx  ← must be 'use client'
'use client'
import dynamic from 'next/dynamic'
const Map = dynamic(() => import('./Map'), { ssr: false })
export function MapWrapper() { return <Map /> }
```

Citation: `02-guides/lazy-loading.md:60–71`

If a Server Component dynamically imports a Client Component, automatic code-splitting
is **not** supported (only children of that Client Component are lazy-loaded).
Citation: `lazy-loading.md:60`

---

## 7. Partial Prefetching

### What it requires

`partialPrefetching: true` **requires** `cacheComponents: true`. Without Cache
Components it has no effect. When enabled without an explicit `partialPrefetching`
value, Next.js logs a warning.

```ts
// next.config.ts
const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
}
```
Citation: `02-guides/adopting-partial-prefetching.md:21`, `:54–68`

### What changes for `<Link>`

| Prop | Before | After |
|------|--------|-------|
| `<Link href="/x">` | Prefetched cached render | Prefetches shared App Shell |
| `<Link prefetch>` | Full page + dynamic content | App Shell + cached URL-specific content |
| `<Link prefetch={false}>` | Disabled | Still disabled |

Citation: `adopting-partial-prefetching.md:73–80`

### Pitfalls for a simple site

- A simple marketing site with no `<Link prefetch={true}>` sees only App Shell
  prefetches — this is fine and reduces total transfer size.
- Existing `<Link prefetch={true}>` navigations **change behavior**: dynamic content is
  no longer included in the prefetch. Audit before enabling.
- Dev-only insights appear in the overlay identifying routes that need `<Suspense>`
  around URL data. These never block the build.
Citation: `adopting-partial-prefetching.md:44–48`, `:67`

---

## 8. Environment Variables

### Server vs `NEXT_PUBLIC_`

- Variables without prefix: Node.js only, never sent to browser.
- `NEXT_PUBLIC_FOO`: inlined at **build time** into client bundle.
  Value baked in — not read at runtime.

```bash
# .env.local
DB_URL=postgres://...          # server only
NEXT_PUBLIC_API_URL=https://…  # bundled into client JS
```

```tsx
// Server Component — fine
const db = process.env.DB_URL

// Client Component
'use client'
const api = process.env.NEXT_PUBLIC_API_URL  // string literal after build
```

**To read a variable at request time (not build time):**
```tsx
import { connection } from 'next/server'
export default async function Page() {
  await connection()
  const config = process.env.RUNTIME_CONFIG  // evaluated at request time
  return <p>{config}</p>
}
```
Citation: `version-16.md:1190–1199`, `environment-variables.md:154–160`

**Note:** `.env` files load from the **project root**, not from `src/`. With a `src/`
dir, place `.env` at repo root. Citation: `environment-variables.md:63`

`serverRuntimeConfig` and `publicRuntimeConfig` are **removed** in Next.js 16.
Citation: `version-16.md:1132–1133`

---

## 9. Linting and Testing

### Linting — `next lint` removed

`next lint` command is **gone**. `next build` no longer runs linting. Use ESLint CLI directly.

```js
// eslint.config.mjs  (flat config — required for ESLint 9+)
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

export default defineConfig([
  ...nextVitals,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
])
```

Add to `package.json`:
```json
{ "scripts": { "lint": "eslint ." } }
```
Citation: `version-16.md:1097–1098`, `03-api-reference/05-config/03-eslint.md:42–59`

### Vitest setup

```ts
// vitest.config.mts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: { environment: 'jsdom' },
})
```

Install: `vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths`
Citation: `02-guides/testing/vitest.md:63–76`

**Stated limit:** Vitest **does not support async Server Components**. Write unit tests
for synchronous Server and Client Components; use E2E tests for async server components.
Citation: `testing/vitest.md:9`

---

## 10. JSON-LD Structured Data

Docs recommend a plain `<script>` tag in `page.tsx` or `layout.tsx`.
**Do not use `next/script`** — JSON-LD is structured data, not executable code.

```tsx
// app/events/[id]/page.tsx
export default async function Page({ params }) {
  const { id } = await params
  const event = await getEvent(id)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    startDate: event.date,
  }

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      {/* page content */}
    </section>
  )
}
```
XSS note: replace `<` with `\u003c` to prevent injection. Use `schema-dts` for TS types.
Citation: `02-guides/json-ld.md:9–87`

---

## 11. Next.js 14/15 → 16 Upgrade Traps

From `version-16.md` and `ai-agents.md`:

### Breaking changes that will bite Next.js 14/15 developers

1. **All async request APIs are fully async — no sync compat shim.**
   `cookies()`, `headers()`, `draftMode()`, `params`, `searchParams`, `sitemap({id})`
   are all `Promise`-based. The Next.js 15 compatibility shim is gone.
   Run `npx @next/codemod@canary next-async-request-api .` if you have old code.
   Citation: `version-16.md:259–271`

2. **`next lint` is gone; `next build` no longer lints.**
   Scripts that call `next lint` break silently or error. Replace with `eslint .`.
   Citation: `version-16.md:1097–1098`

3. **Turbopack is the default bundler for `next dev` and `next build`.**
   Any `webpack` config in `next.config.ts` causes `next build` to **fail** unless you
   pass `--webpack`. `experimental.turbopack` is now the top-level `turbopack` key.
   Sass tilde imports (`~bootstrap/…`) no longer work under Turbopack.
   Citation: `version-16.md:104–131`, `:223`

4. **`experimental.ppr`, `experimental.dynamicIO`, `experimental.useCache` removed.**
   Replace with top-level `cacheComponents: true`. This is NOT a simple rename —
   it changes build behavior. Citation: `version-16.md:566–579`, `:1216–1258`

5. **`middleware.ts` renamed to `proxy.ts`; edge runtime not supported in proxy.**
   The named export `middleware` is deprecated; rename to `proxy`.
   Config flags like `skipMiddlewareUrlNormalize` → `skipProxyUrlNormalize`.
   Citation: `version-16.md:596–621`

6. **Parallel route slots require `default.js` — build fails without them.**
   Citation: `version-16.md:920–939`

7. **`sitemap({ id })` — `id` is now `Promise<string>`, not a number.**
   `const resolvedId = await id; const start = Number(resolvedId) * 50000`
   Citation: `version-16.md:348–360`

8. **`revalidateTag` requires a second argument (cacheLife profile name).**
   Single-argument form is deprecated and produces a TypeScript error.
   Citation: `version-16.md:426–434`

9. **`serverRuntimeConfig` / `publicRuntimeConfig` removed.** Use env vars.
   Citation: `version-16.md:1132–1145`

10. **`opengraph-image` / `icon` params are async Promises.**
    Citation: `version-16.md:296–328`

11. **Node.js minimum is 20.9; TypeScript minimum is 5.1.**
    Citation: `version-16.md:97–99`

12. **`images.minimumCacheTTL` default changed 60 s → 4 h (14400 s).**
    May cause stale images if upstream lacks `cache-control`.
    Citation: `version-16.md:693–699`

---

## Docs Silent On

- Tailwind 4 `@theme` + `next/font` CSS variable integration (no Tailwind 4 doc in
  bundled docs; pattern above is derived from font + variable font docs).
- Specific `@tailwindcss/turbopack` loader behavior (Turbopack docs cover loader
  config structure but not this specific package).
- Reading client IP inside a Server Action (inferred from `headers()` async API;
  no dedicated guide in bundled docs).
- `useActionState` signature (React 19 API; not covered in bundled Next.js docs).

---

*Generated from `node_modules/next/dist/docs/` (Next.js 16.4.6). Do not answer from memory.*

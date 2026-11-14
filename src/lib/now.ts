import { cacheLife } from "next/cache";

/**
 * The only wall-clock read for event surfaces. Cache Components can prerender this
 * without a Suspense boundary. Refresh on demand about hourly, with a hard server
 * expiry just after an hour (not the `hours` preset's one-day expiry).
 * This is a cached snapshot, not a live clock: transitions can lag by this window.
 * Docs: next/dist/docs/01-app/01-getting-started/08-caching.md (data-level caching),
 * and 03-api-reference/04-functions/cacheLife.md (revalidate vs expire).
 */
export async function getNow(): Promise<number> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 3600, expire: 3660 });
  return Date.now();
}

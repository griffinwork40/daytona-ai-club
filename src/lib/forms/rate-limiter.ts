/**
 * In-memory rate limiter with an injectable clock.
 *
 * NOTE: This store lives in process memory and resets on every cold start.
 * In a serverless environment (Vercel, AWS Lambda) each function instance
 * has its own store — the limit is per-instance, not per-deployment.
 * For a launch-scale site this is acceptable; replace with an edge KV store
 * (Upstash Redis, Vercel KV) if you need cross-instance coordination.
 */

export interface RateLimiterOptions {
  /** Maximum requests allowed in the window. */
  limit: number;
  /** Window size in milliseconds. */
  windowMs: number;
  /** Injectable clock function — defaults to Date.now. */
  now?: () => number;
}

interface BucketEntry {
  count: number;
  windowStart: number;
}

export class RateLimiter {
  private readonly limit: number;
  private readonly windowMs: number;
  private readonly now: () => number;
  private readonly store = new Map<string, BucketEntry>();

  constructor(options: RateLimiterOptions) {
    this.limit = options.limit;
    this.windowMs = options.windowMs;
    this.now = options.now ?? (() => Date.now());
  }

  /**
   * Check and record a hit for `key`.
   * Returns true if the request is allowed, false if the limit is exceeded.
   */
  check(key: string): boolean {
    const now = this.now();
    const entry = this.store.get(key);

    if (!entry || now - entry.windowStart >= this.windowMs) {
      // New window
      this.store.set(key, { count: 1, windowStart: now });
      return true;
    }

    if (entry.count >= this.limit) {
      return false;
    }

    entry.count += 1;
    return true;
  }

  /** Remaining requests in the current window for a key. */
  remaining(key: string): number {
    const now = this.now();
    const entry = this.store.get(key);
    if (!entry || now - entry.windowStart >= this.windowMs) return this.limit;
    return Math.max(0, this.limit - entry.count);
  }
}

/** Shared limiters — one per action, created once at module load. */
export const joinLimiter = new RateLimiter({ limit: 5, windowMs: 60_000 });
export const speakLimiter = new RateLimiter({ limit: 3, windowMs: 60_000 });

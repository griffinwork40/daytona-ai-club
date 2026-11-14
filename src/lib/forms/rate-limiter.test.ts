import { describe, it, expect } from "vitest";
import { RateLimiter } from "./rate-limiter";

describe("RateLimiter", () => {
  it("allows requests up to the limit", () => {
    const t = 0;
    const limiter = new RateLimiter({ limit: 3, windowMs: 60_000, now: () => t });

    expect(limiter.check("ip1")).toBe(true);
    expect(limiter.check("ip1")).toBe(true);
    expect(limiter.check("ip1")).toBe(true);
  });

  it("blocks the request that exceeds the limit", () => {
    const t = 0;
    const limiter = new RateLimiter({ limit: 3, windowMs: 60_000, now: () => t });

    limiter.check("ip1");
    limiter.check("ip1");
    limiter.check("ip1");
    expect(limiter.check("ip1")).toBe(false);
  });

  it("resets after the window expires", () => {
    let t = 0;
    const limiter = new RateLimiter({ limit: 2, windowMs: 10_000, now: () => t });

    limiter.check("ip1");
    limiter.check("ip1");
    expect(limiter.check("ip1")).toBe(false);

    t = 10_001; // advance past window
    expect(limiter.check("ip1")).toBe(true);
  });

  it("tracks keys independently", () => {
    const t = 0;
    const limiter = new RateLimiter({ limit: 1, windowMs: 60_000, now: () => t });

    expect(limiter.check("ipA")).toBe(true);
    expect(limiter.check("ipA")).toBe(false);
    expect(limiter.check("ipB")).toBe(true); // different key — fresh bucket
  });

  it("returns correct remaining count", () => {
    const t = 0;
    const limiter = new RateLimiter({ limit: 5, windowMs: 60_000, now: () => t });

    expect(limiter.remaining("ip1")).toBe(5);
    limiter.check("ip1");
    expect(limiter.remaining("ip1")).toBe(4);
    limiter.check("ip1");
    expect(limiter.remaining("ip1")).toBe(3);
  });

  it("remaining resets after window expiry", () => {
    let t = 0;
    const limiter = new RateLimiter({ limit: 2, windowMs: 5_000, now: () => t });

    limiter.check("ip1");
    limiter.check("ip1");
    expect(limiter.remaining("ip1")).toBe(0);

    t = 5_001;
    expect(limiter.remaining("ip1")).toBe(2);
  });

  it("window expires at exactly windowMs (>= boundary)", () => {
    let t = 0;
    const limiter = new RateLimiter({ limit: 1, windowMs: 1_000, now: () => t });

    limiter.check("ip1"); // uses the slot
    // elapsed === windowMs → new window opens (uses >= in the limiter)
    t = 1_000;
    expect(limiter.check("ip1")).toBe(true);
  });

  it("still blocked one ms before the window expires", () => {
    let t = 0;
    const limiter = new RateLimiter({ limit: 1, windowMs: 1_000, now: () => t });

    limiter.check("ip1");
    t = 999; // elapsed < windowMs — same window
    expect(limiter.check("ip1")).toBe(false);
  });
});

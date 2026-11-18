import { describe, expect, it } from "vitest";
import { events, findEvent } from "../../content/events";
import { defineEvent, type ClubEvent } from "./types";
import { eventStructuredData, serializeJsonLd } from "./structured-data";

const base: ClubEvent = { slug: "test", number: 1, title: "A </script> title", summary: "Summary" };

describe("authored event data", () => {
  it("seeds exactly one honest undated meetup", () => {
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({ slug: "founding-night", number: 1, title: "First Hangout" });
    expect(events[0].start).toBeUndefined();
    expect(events[0].end).toBeUndefined();
    expect(events[0].venue).toBeUndefined();
    expect(events[0].rsvpLink).toBeUndefined();
    expect(findEvent("founding-night")).toBe(events[0]);
    expect(findEvent("missing")).toBeUndefined();
  });
  it("rejects missing offsets and invalid dates at runtime", () => {
    for (const start of ["2026-06-15T18:00:00", "invalid", "2026-13-15T18:00:00-04:00"]) {
      expect(() => defineEvent({ ...base, start } as ClubEvent)).toThrow("explicit UTC offset");
    }
  });
  it("rejects orphan ends, reversed ranges, and invalid meetup numbers", () => {
    expect(() => defineEvent({ ...base, end: "2026-06-15T18:00:00-04:00" })).toThrow("requires a start");
    expect(() => defineEvent({ ...base, start: "2026-06-15T18:00:00-04:00", end: "2026-06-15T17:00:00-04:00" })).toThrow("cannot precede");
    expect(() => defineEvent({ ...base, number: 0 })).toThrow("positive integer");
  });
});

describe("structured data", () => {
  it("omits schema for an undated event", () => {
    expect(eventStructuredData(base, "Club", "https://example.org")).toBeNull();
  });
  it("includes only known fields and never invents an offer or location", () => {
    const data = eventStructuredData({ ...base, start: "2026-06-15T18:00:00-04:00" }, "Club", "https://example.org");
    expect(data).toMatchObject({ "@type": "Event", startDate: "2026-06-15T18:00:00-04:00", url: "https://example.org/events/test" });
    expect(data).not.toHaveProperty("location");
    expect(data).not.toHaveProperty("offers");
    expect(data).not.toHaveProperty("endDate");
    expect(serializeJsonLd(data!)).not.toContain("<");
    expect(JSON.parse(serializeJsonLd(data!))).toEqual(data);
  });
});

import { describe, expect, it } from "vitest";
import { CLUB_TIME_ZONE, formatEventDate, formatEventTime, formatMeetupNumber } from "./format";

describe("club-local dates", () => {
  it("uses New York even when the input's calendar day is different", () => {
    expect(CLUB_TIME_ZONE).toBe("America/New_York");
    expect(formatEventDate("2026-06-15T01:00:00+00:00")).toBe("Sunday, June 14, 2026");
    expect(formatEventTime("2026-06-15T01:00:00+00:00")).toBe("9:00 PM EDT");
  });
  it("renders both sides of the spring daylight saving change", () => {
    expect(formatEventTime("2026-03-08T06:30:00+00:00")).toBe("1:30 AM EST");
    expect(formatEventTime("2026-03-08T07:30:00+00:00")).toBe("3:30 AM EDT");
    expect(formatEventDate("2026-03-08T06:30:00+00:00")).toBe("Sunday, March 8, 2026");
    expect(formatEventDate("2026-03-08T07:30:00+00:00")).toBe("Sunday, March 8, 2026");
  });
  it("distinguishes repeated fall hours", () => {
    expect(formatEventTime("2026-11-01T05:30:00+00:00")).toBe("1:30 AM EDT");
    expect(formatEventTime("2026-11-01T06:30:00+00:00")).toBe("1:30 AM EST");
  });
  it("formats meetup numbers without truncating", () => {
    expect(formatMeetupNumber(1)).toBe("#001");
    expect(formatMeetupNumber(1000)).toBe("#1000");
  });
});

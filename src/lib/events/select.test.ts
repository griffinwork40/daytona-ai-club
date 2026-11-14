import { describe, expect, it } from "vitest";
import { DEFAULT_DURATION_MS, eventState, selectNextEvent, splitEvents } from "./select";
import { defineEvent, type ClubEvent } from "./types";

const start = "2026-06-15T18:00:00-04:00";
const end = "2026-06-15T20:00:00-04:00";
const event = defineEvent({ slug: "test", number: 1, title: "Test", summary: "Test", start, end });
const at = Date.parse;
const undated: ClubEvent = { slug: "undated", number: 2, title: "Undated", summary: "Test" };

describe("event cutoff", () => {
  it("is upcoming exactly at its start", () => {
    expect(eventState(event, at(start))).toBe("upcoming");
  });
  it("remains upcoming mid-event and exactly at its end", () => {
    expect(eventState(event, at(start) + 60 * 60 * 1000)).toBe("upcoming");
    expect(eventState(event, at(end))).toBe("upcoming");
  });
  it("is past one millisecond after its end", () => {
    expect(eventState(event, at(end) + 1)).toBe("past");
  });
  it("treats an event with no end as running for the default duration", () => {
    const startOnly = { ...event, end: undefined };
    expect(eventState(startOnly, at(start) - 1)).toBe("upcoming");
    expect(eventState(startOnly, at(start) + 1)).toBe("upcoming");
    expect(eventState(startOnly, at(start) + DEFAULT_DURATION_MS)).toBe("upcoming");
    expect(eventState(startOnly, at(start) + DEFAULT_DURATION_MS + 1)).toBe("past");
  });
  it("keeps an undated event in to-be-announced at any time", () => {
    expect(eventState(undated, at(end))).toBe("announced");
    expect(splitEvents([undated], at(end)).announced).toEqual([undated]);
  });
});

describe("selection and ordering", () => {
  it("handles an empty list", () => {
    expect(splitEvents([], at(start))).toEqual({ upcoming: [], announced: [], past: [] });
    expect(selectNextEvent([], at(start))).toBeNull();
  });
  it("sorts upcoming soonest first and past by most recent start, without mutating", () => {
    const earlier = defineEvent({ ...event, slug: "earlier", number: 3, start: "2026-06-13T18:00:00-04:00", end: "2026-06-13T20:00:00-04:00" });
    const later = defineEvent({ ...event, slug: "later", number: 4, start: "2026-06-17T18:00:00-04:00", end: "2026-06-17T20:00:00-04:00" });
    const latest = defineEvent({ ...event, slug: "latest", number: 5, start: "2026-06-18T18:00:00-04:00", end: "2026-06-18T20:00:00-04:00" });
    const input = Object.freeze([latest, undated, later, earlier, event]);
    const groups = splitEvents(input, at("2026-06-16T12:00:00-04:00"));
    expect(groups.upcoming).toEqual([later, latest]);
    expect(groups.past).toEqual([event, earlier]);
    expect(groups.announced).toEqual([undated]);
    expect(input[0]).toBe(latest);
    expect(selectNextEvent(input, at(start))).toBe(event);
    expect(selectNextEvent([event, undated], at(end) + 1)).toBe(undated);
    expect(selectNextEvent([event], at(end) + 1)).toBeNull();
  });
  it("compares instants across UTC offsets, not strings", () => {
    const earlier = defineEvent({ ...event, number: 3, start: "2026-06-15T18:30:00-03:00", end: undefined });
    expect(splitEvents([event, earlier], at(start) - 60 * 60 * 1000).upcoming).toEqual([earlier, event]);
  });
  it("orders undated meetups by race number", () => {
    const third = { ...undated, number: 3 };
    expect(splitEvents([third, undated], at(start)).announced).toEqual([undated, third]);
  });
});

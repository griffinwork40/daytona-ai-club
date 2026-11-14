import type { ClubEvent } from "./types";

export type EventState = "upcoming" | "announced" | "past";

/** How long an event with a start but no end is treated as running. */
export const DEFAULT_DURATION_MS = 3 * 60 * 60 * 1000;

/**
 * An event is over strictly AFTER its end. At the exact cutoff it remains upcoming.
 * With no end time, it is treated as running for DEFAULT_DURATION_MS after its start,
 * so the site does not call a meetup "past" while people are walking in.
 * Undated events never end.
 * `now` is epoch milliseconds, supplied by the caller. These functions read no clock.
 */
export function eventState(event: ClubEvent, now: number): EventState {
  if (!event.start) return "announced";
  const cutoff = event.end
    ? Date.parse(event.end)
    : Date.parse(event.start) + DEFAULT_DURATION_MS;
  return now > cutoff ? "past" : "upcoming";
}

export function splitEvents(events: readonly ClubEvent[], now: number) {
  const upcoming: ClubEvent[] = [];
  const announced: ClubEvent[] = [];
  const past: ClubEvent[] = [];
  for (const event of events) {
    const state = eventState(event, now);
    if (state === "upcoming") upcoming.push(event);
    else if (state === "past") past.push(event);
    else announced.push(event);
  }
  const byStart = (a: ClubEvent, b: ClubEvent) =>
    Date.parse(a.start!) - Date.parse(b.start!) || a.number - b.number;
  upcoming.sort(byStart);
  past.sort((a, b) => -byStart(a, b));
  announced.sort((a, b) => a.number - b.number);
  return { upcoming, announced, past };
}

export function selectNextEvent(events: readonly ClubEvent[], now: number) {
  const { upcoming, announced } = splitEvents(events, now);
  return upcoming[0] ?? announced[0] ?? null;
}

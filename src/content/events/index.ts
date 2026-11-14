import type { ClubEvent } from "@/lib/events/types";
import { foundingNight } from "./founding-night";

/** Add each new typed event here. Chronology is derived from dates, not this order. */
export const events: readonly ClubEvent[] = [foundingNight];

export function findEvent(slug: string): ClubEvent | undefined {
  return events.find((event) => event.slug === slug);
}

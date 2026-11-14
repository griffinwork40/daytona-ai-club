/** ISO 8601 datetime with an explicit numeric UTC offset, e.g. -05:00. */
export type EventDate = `${number}-${number}-${number}T${string}${"+" | "-"}${number}:${number}`;

export interface EventPhoto {
  /** Local public/ asset. Remote image hosts require a separate config change. */
  src: `/${string}`;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface ClubEvent {
  slug: string;
  number: number;
  title: string;
  summary: string;
  start?: EventDate;
  end?: EventDate;
  venue?: { name: string; address: string; mapLink?: string };
  rsvpLink?: string;
  agenda?: readonly { title: string; description?: string }[];
  recap?: string;
  photos?: readonly EventPhoto[];
}

/** Validate authored data early, rather than silently misclassifying bad dates. */
export function defineEvent(event: ClubEvent): ClubEvent {
  if (!Number.isInteger(event.number) || event.number < 1) {
    throw new Error("Meetup number must be a positive integer");
  }
  for (const value of [event.start, event.end]) {
    if (value !== undefined && (
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?[+-]\d{2}:\d{2}$/.test(value) ||
      !Number.isFinite(Date.parse(value))
    )) {
      throw new Error("Event dates need an ISO datetime with an explicit UTC offset");
    }
  }
  if (event.end && (!event.start || Date.parse(event.end) < Date.parse(event.start))) {
    throw new Error("Event end requires a start and cannot precede it");
  }
  return event;
}

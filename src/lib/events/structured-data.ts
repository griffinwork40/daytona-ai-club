import type { ClubEvent } from "./types";

/** No guessed location, price, availability or date. Undated events emit no schema. */
export function eventStructuredData(event: ClubEvent, clubName: string, origin: string) {
  if (!event.start) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.summary,
    startDate: event.start,
    ...(event.end ? { endDate: event.end } : {}),
    url: `${origin}/events/${event.slug}`,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    organizer: { "@type": "Organization", name: clubName, url: origin },
    ...(event.venue ? {
      location: {
        "@type": "Place",
        name: event.venue.name,
        address: event.venue.address,
        ...(event.venue.mapLink ? { hasMap: event.venue.mapLink } : {}),
      },
    } : {}),
    ...(event.photos?.length ? { image: event.photos.map((photo) => `${origin}${photo.src}`) } : {}),
  };
}

/** Native script escaping recommended by Next's bundled JSON-LD guide. */
export function serializeJsonLd(value: object): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

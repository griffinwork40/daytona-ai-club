import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Plate } from "@/components/ui/primitives";
import type { ClubEvent } from "@/lib/events/types";
import { eventState } from "@/lib/events/select";
import { formatEventDate, formatEventTime, formatMeetupNumber } from "@/lib/events/format";

export function EventCard({ event, now }: { event: ClubEvent; now: number }) {
  const state = eventState(event, now);
  const past = state === "past";
  return (
    <article className="panel relative overflow-hidden border border-foam/15 p-6 sm:p-8">
      <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-sun-300 to-flare-500" />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Plate tone={past ? "line" : "sun"} className="text-3xl">
          {formatMeetupNumber(event.number)}
        </Plate>
        <p className="label text-mist">{past ? "In the archive" : "Next on the grid"}</p>
      </div>
      <h3 className="display mt-7 text-4xl sm:text-5xl">
        <Link href={`/events/${event.slug}`} className="hover:text-sun-300">{event.title}</Link>
      </h3>
      <p className="mt-4 max-w-xl leading-relaxed text-mist">{event.summary}</p>
      {event.start ? (
        <p className="mt-6 font-mono text-sm leading-relaxed text-sun-200">
          <time dateTime={event.start}>{formatEventDate(event.start)}<br />{formatEventTime(event.start)}</time>
        </p>
      ) : <p className="label mt-6 text-sun-200">Date being set</p>}
      {event.venue ? <p className="mt-3 text-sm text-mist">{event.venue.name}</p> : null}
      <div className="mt-7 flex flex-wrap gap-3">
        {!past && event.start && event.rsvpLink ? (
          <ButtonLink href={event.rsvpLink}>RSVP</ButtonLink>
        ) : !past ? (
          <ButtonLink href="/#join">Get meetup updates</ButtonLink>
        ) : null}
        <ButtonLink href={`/events/${event.slug}`} variant="ghost">{past ? "View meetup" : "Meetup details"}</ButtonLink>
      </div>
    </article>
  );
}

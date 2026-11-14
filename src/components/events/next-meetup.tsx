import { ButtonLink } from "@/components/ui/button";
import { events } from "@/content/events";
import { selectNextEvent } from "@/lib/events/select";
import { getNow } from "@/lib/now";
import { EventCard } from "./event-card";

/** No-props server card. Its cached clock is safe in a static shell. */
export async function NextMeetup() {
  const now = await getNow();
  const event = selectNextEvent(events, now);
  if (event) return <EventCard event={event} now={now} />;
  return (
    <article className="panel border border-foam/15 p-6 sm:p-8">
      <p className="label text-sun-300">Stay in the loop</p>
      <h3 className="display mt-4 text-4xl sm:text-5xl">More meetups ahead</h3>
      <p className="mt-4 max-w-xl leading-relaxed text-mist">
        No upcoming meetup is listed yet. Get an email when the next one is ready.
      </p>
      <ButtonLink className="mt-7" href="/#join">Get meetup updates</ButtonLink>
    </article>
  );
}

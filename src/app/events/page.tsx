import type { Metadata } from "next";
import { EventCard } from "@/components/events/event-card";
import { ButtonLink } from "@/components/ui/button";
import { Container, PageHeader, Section } from "@/components/ui/primitives";
import { site } from "@/config/site";
import { events } from "@/content/events";
import { splitEvents } from "@/lib/events/select";
import { getNow } from "@/lib/now";

export const metadata: Metadata = {
  title: "Events",
  description: `Upcoming meetups and the archive from ${site.name}.`,
};

export default async function EventsPage() {
  const now = await getNow();
  const { upcoming, announced, past } = splitEvents(events, now);
  const onTheGrid = [...upcoming, ...announced];
  return (
    <>
      <PageHeader eyebrow="Meet in person" title="On the grid" lede={`Monthly meetups in the ${site.city} area. A place to share what works, build together, and get help.`} />
      <Container className="py-14 sm:py-20">
        <h2 className="label mb-6 text-sun-300">Coming up</h2>
        {onTheGrid.length ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {onTheGrid.map((event) => <EventCard key={event.slug} event={event} now={now} />)}
          </div>
        ) : (
          <div className="panel border border-foam/15 p-8">
            <h3 className="display text-4xl">More meetups ahead</h3>
            <p className="mt-4 text-mist">No upcoming meetup is listed yet. Get an email when the next one is ready.</p>
            <ButtonLink href="/#join" className="mt-6">Get meetup updates</ButtonLink>
          </div>
        )}
      </Container>
      {past.length ? (
        <Section eyebrow="Previous meetups" title="The archive" className="border-t border-foam/10">
          <div className="grid gap-6 lg:grid-cols-2">
            {past.map((event) => <EventCard key={event.slug} event={event} now={now} />)}
          </div>
        </Section>
      ) : null}
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container, PageHeader } from "@/components/ui/primitives";
import { site, siteUrl } from "@/config/site";
import { events, findEvent } from "@/content/events";
import { formatEventDate, formatEventTime, formatMeetupNumber } from "@/lib/events/format";
import { eventState } from "@/lib/events/select";
import { eventStructuredData, serializeJsonLd } from "@/lib/events/structured-data";
import { getNow } from "@/lib/now";

/**
 * Every real event is prerendered through generateStaticParams, so this
 * segment does not need an instant shell and opts out of that check.
 *
 * A slug that is not an event renders the not-found page. With Cache
 * Components the response has already started by then, so visitors get
 * that page with a 200 status and a `noindex` tag, while crawlers that
 * need full HTML (Googlebot) get a real 404. Measured against a
 * production build. A 404 status for everyone would need `proxy.ts`.
 * (`dynamicParams = false` is not available with Cache Components.)
 */
export const instant = false;

export function generateStaticParams() {
  return events.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const event = findEvent(slug);
  if (!event) notFound();
  return {
    title: `${formatMeetupNumber(event.number)} ${event.title}`,
    description: event.summary,
    alternates: { canonical: `/events/${event.slug}` },
  };
}

export default async function EventPage(props: PageProps<"/events/[slug]">) {
  const { slug } = await props.params;
  const event = findEvent(slug);
  if (!event) notFound();
  const now = await getNow();
  const past = eventState(event, now) === "past";
  const jsonLd = eventStructuredData(event, site.name, siteUrl());
  return (
    <>
      {jsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} /> : null}
      <PageHeader eyebrow={`Meetup ${formatMeetupNumber(event.number)}${past ? " · In the archive" : ""}`} title={event.title} lede={event.summary} />
      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
        <div>
          <h2 className="display text-4xl">{past ? "Meetup details" : "The plan"}</h2>
          <div className="mt-6 space-y-6 border-l-2 border-sun-300 pl-6">
            <div>
              <h3 className="label text-sun-300">When</h3>
              {event.start ? (
                <p className="mt-2 leading-relaxed">
                  <time dateTime={event.start}>{formatEventDate(event.start)}<br />{formatEventTime(event.start)}</time>
                  {event.end ? <><br /><span className="text-mist">Ends </span><time dateTime={event.end}>{formatEventDate(event.end)}, {formatEventTime(event.end)}</time></> : null}
                </p>
              ) : <p className="mt-2 text-mist">Date being set. Join the email list for the announcement.</p>}
            </div>
            {event.venue ? (
              <div>
                <h3 className="label text-sun-300">Where</h3>
                <p className="mt-2">{event.venue.name}</p>
                <p className="mt-1 text-mist">{event.venue.address}</p>
                {event.venue.mapLink ? <a className="mt-3 inline-block text-sun-200 underline underline-offset-4" href={event.venue.mapLink}>View map</a> : null}
              </div>
            ) : null}
          </div>
          {event.agenda?.length ? (
            <section className="mt-12" aria-labelledby="agenda-title">
              <h2 id="agenda-title" className="display text-4xl">Agenda</h2>
              <ol className="mt-6 divide-y divide-foam/10">
                {event.agenda.map((item, index) => (
                  <li key={`${index}-${item.title}`} className="py-5">
                    <h3 className="font-display text-2xl font-bold uppercase">{item.title}</h3>
                    {item.description ? <p className="mt-2 leading-relaxed text-mist">{item.description}</p> : null}
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
          {past && event.recap ? (
            <section className="mt-12" aria-labelledby="recap-title">
              <h2 id="recap-title" className="display text-4xl">From the meetup</h2>
              <p className="mt-6 whitespace-pre-line leading-relaxed text-mist">{event.recap}</p>
            </section>
          ) : null}
          {past && event.photos?.length ? (
            <section className="mt-12" aria-label="Meetup photos">
              <div className="grid gap-6 sm:grid-cols-2">
                {event.photos.map((photo) => (
                  <figure key={photo.src}>
                    <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} className="h-auto w-full" />
                    {photo.caption ? <figcaption className="mt-2 text-sm text-mist">{photo.caption}</figcaption> : null}
                  </figure>
                ))}
              </div>
            </section>
          ) : null}
        </div>
        <aside className="panel self-start border border-foam/15 p-6 sm:p-8">
          <p className="label text-sun-300">{past ? "Keep building" : "Be part of it"}</p>
          <h2 className="display mt-4 text-4xl">{past ? "Catch the next meetup" : event.start ? "Meet us there" : "Get the first details"}</h2>
          <p className="mt-4 leading-relaxed text-mist">
            {past ? "Get an email when the next meetup is ready." : "Join the email list for meetup updates. We will share the details when they are set."}
          </p>
          <div className="mt-6 flex flex-col items-start gap-3">
            {!past && event.start && event.rsvpLink ? <ButtonLink href={event.rsvpLink}>RSVP</ButtonLink> : null}
            <ButtonLink href="/#join" variant={!past && event.start && event.rsvpLink ? "ghost" : "primary"}>Get meetup updates</ButtonLink>
            <ButtonLink href="/events" variant="ghost">All meetups</ButtonLink>
          </div>
        </aside>
      </Container>
    </>
  );
}

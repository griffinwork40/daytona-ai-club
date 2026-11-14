import { CardGrid } from "@/components/sections/card-grid";
import { ButtonLink } from "@/components/ui/button";
import { Container, Plate, Section } from "@/components/ui/primitives";
import { site } from "@/config/site";
import {
  aboutCta,
  conduct,
  conductCopy,
  conductReport,
  organizerCopy,
  whyCopy,
} from "@/content/about";

/** Why the club exists, beside the organizer card. */
export function WhyAndOrganizer() {
  const { organizer } = site;
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
        <div>
          <p className="label text-sun-300">{whyCopy.eyebrow}</p>
          <h2 className="display mt-3 text-5xl sm:text-6xl">{whyCopy.title}</h2>
          <div className="prose-club mt-8 max-w-2xl text-lg leading-relaxed text-mist">
            {whyCopy.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <div>
          <p className="label text-sun-300">{organizerCopy.eyebrow}</p>
          <h2 className="display mt-3 text-5xl sm:text-6xl">
            {organizerCopy.title}
          </h2>
          <div className="panel relative mt-8 p-6 sm:p-8">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-sun-300 via-flare-500 to-dusk-500"
            />
            <Plate tone="line" className="text-lg">
              Founder
            </Plate>
            <p className="display mt-5 text-4xl">{organizer.name}</p>
            <p className="mt-4 leading-relaxed text-mist">{organizer.bio}</p>
            {organizer.url ? (
              <a
                href={organizer.url}
                rel="noreferrer"
                className="label mt-6 inline-block text-sun-300 hover:text-sun-200"
              >
                More about {organizer.name} &rarr;
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Code of conduct with the reporting line. */
export function ConductSection() {
  return (
    <Section
      eyebrow={conductCopy.eyebrow}
      title={conductCopy.title}
      lede={conductCopy.lede}
      className="border-t border-foam/8"
    >
      <CardGrid items={conduct} columns={3} />
      <p className="mt-8 max-w-2xl border-l-2 border-sun-400 pl-5 text-mist">
        {conductReport.text}
      </p>
    </Section>
  );
}

/** Closing call to action for interior pages. */
export function AboutCta() {
  return (
    <section className="border-t border-foam/8 bg-linear-to-b from-ink-950 to-dusk-900/60 py-20 sm:py-24">
      <Container className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Plate className="text-3xl">#001</Plate>
          <h2 className="display mt-5 text-5xl sm:text-6xl">
            {aboutCta.title}
          </h2>
          <p className="mt-4 max-w-xl text-lg text-mist">{aboutCta.body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={aboutCta.join.href}>{aboutCta.join.label}</ButtonLink>
          <ButtonLink href={aboutCta.speak.href} variant="ghost">
            {aboutCta.speak.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

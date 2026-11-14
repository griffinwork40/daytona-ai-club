import { CardGrid } from "@/components/sections/card-grid";
import { SpeakForm } from "@/components/forms/speak-form";
import { Container, Plate, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { isSpeakConfigured } from "@/lib/forms/config";
import {
  formCopy,
  formats,
  formatsCopy,
  goodCopy,
  goodTraits,
  whoCopy,
} from "@/content/speak";

/** Who should propose, as a short checklist. */
export function WhoShouldPropose() {
  return (
    <Section eyebrow={whoCopy.eyebrow} title={whoCopy.title}>
      <ul className="grid gap-px bg-foam/8 sm:grid-cols-2">
        {whoCopy.points.map((point) => (
          <li key={point} className="flex gap-4 bg-ink-950 p-6 text-lg">
            <span
              aria-hidden
              className="mt-2.5 size-2 shrink-0 -skew-x-10 bg-sun-400"
            />
            <span className="text-foam">{point}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** The two formats, each with its time on a number plate. */
export function FormatsSection() {
  return (
    <Section
      eyebrow={formatsCopy.eyebrow}
      title={formatsCopy.title}
      className="border-t border-foam/8 bg-linear-to-b from-ink-950 via-ink-900 to-ink-950"
    >
      <Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {formats.map((f, i) => (
            <article key={f.name} className="panel relative p-6 sm:p-8">
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-sun-300 via-flare-500 to-dusk-500"
              />
              <div className="flex items-center justify-between gap-4">
                <Plate tone={i === 0 ? "line" : "sun"} className="text-3xl">
                  ~{f.minutes} min
                </Plate>
              </div>
              <h3 className="display mt-6 text-4xl">{f.name}</h3>
              <p className="mt-4 leading-relaxed text-mist">{f.body}</p>
              <p className="label mt-6 text-sun-300">For example</p>
              <ul className="mt-3 space-y-2">
                {f.examples.map((ex) => (
                  <li key={ex} className="text-foam">
                    <span aria-hidden className="text-sun-400">
                      /{" "}
                    </span>
                    {ex}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/** What makes a good demo. */
export function GoodDemoSection() {
  return (
    <Section eyebrow={goodCopy.eyebrow} title={goodCopy.title}>
      <CardGrid items={goodTraits} columns={2} />
    </Section>
  );
}

/** Proposal form block. Shows a plain note while the form renders nothing. */
export function ProposalSection() {
  return (
    <section
      id="propose"
      className="border-t border-foam/8 bg-linear-to-b from-ink-950 via-dusk-900/50 to-ink-950 py-20 sm:py-28"
    >
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <p className="label text-sun-300">{formCopy.eyebrow}</p>
          <h2 className="display mt-3 text-5xl sm:text-6xl">
            <span className="text-sunrise pb-[0.06em]">{formCopy.title}</span>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-mist">
            {formCopy.body}
          </p>
          <p className="mt-6 max-w-md border-l-2 border-sun-400 pl-5 text-mist">
            {formCopy.followUp}
          </p>
        </div>
        <div className="self-start">
          <div className="peer panel bg-ink-950/70 p-6 empty:hidden sm:p-8">
            <SpeakForm enabled={isSpeakConfigured()} />
          </div>
          <div className="panel hidden bg-ink-950/70 p-6 peer-empty:block sm:p-8">
            <p className="label text-sun-300">{formCopy.pendingLabel}</p>
            <p className="mt-3 text-mist">{formCopy.pending}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

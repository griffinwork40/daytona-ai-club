import { Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { audiences, audiencesCopy } from "@/content/audiences";
import type { SectionCopy } from "@/content/types";

/** The three audiences, as tall lanes with a sunrise top edge. */
export function AudiencesSection({
  copy = audiencesCopy,
  className = "",
}: {
  copy?: SectionCopy;
  className?: string;
}) {
  return (
    <Section
      eyebrow={copy.eyebrow}
      title={copy.title}
      lede={copy.lede}
      className={className}
    >
      <Reveal>
        <ul className="grid gap-5 md:grid-cols-3">
          {audiences.map((a, i) => (
            <li key={a.title} className="panel relative flex flex-col p-6 sm:p-8">
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-sun-300 via-flare-500 to-dusk-500"
              />
              <span className="display text-6xl text-foam/15" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display mt-4 text-3xl sm:text-4xl">{a.title}</h3>
              <p className="mt-4 leading-relaxed text-mist">{a.body}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}

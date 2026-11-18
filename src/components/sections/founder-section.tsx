import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { founderCopy } from "@/content/home";

/** First-person intro from Griffin. */
export function FounderSection() {
  return (
    <section className="border-t border-foam/8 bg-linear-to-b from-ink-950 via-ink-900 to-ink-950 py-20 sm:py-28">
      <Container>
        <header className="max-w-3xl">
          <p className="label text-sun-300">{founderCopy.eyebrow}</p>
          <h2 className="display mt-3 text-5xl sm:text-6xl lg:text-7xl">
            {founderCopy.title}
          </h2>
        </header>
        <Reveal>
          <div className="mt-12 sm:mt-14 lg:grid lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <div className="prose-club max-w-2xl space-y-6 text-lg leading-relaxed text-mist sm:text-xl">
              {founderCopy.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

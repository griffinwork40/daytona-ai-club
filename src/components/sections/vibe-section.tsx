import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { vibeCopy } from "@/content/home";

/** What the club actually is — casual prose intro. */
export function VibeSection() {
  return (
    <section id="vibe" className="py-20 sm:py-28">
      <Container>
        <header className="max-w-3xl">
          <p className="label text-sun-300">{vibeCopy.eyebrow}</p>
          <h2 className="display mt-3 text-5xl sm:text-6xl lg:text-7xl">
            {vibeCopy.title}
          </h2>
        </header>
        <Reveal>
          <div className="prose-club mt-12 max-w-2xl space-y-6 text-lg leading-relaxed text-mist sm:mt-14 sm:text-xl">
            {vibeCopy.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

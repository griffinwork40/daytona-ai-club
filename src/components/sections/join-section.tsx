import { JoinForm } from "@/components/forms/join-form";
import { Container } from "@/components/ui/primitives";
import { joinCopy } from "@/content/home";
import { isJoinConfigured } from "@/lib/forms/config";

/**
 * Main call to action. The sunrise glow sits behind a two column layout:
 * pitch on the left, the form slot on the right.
 */
export function JoinSection() {
  return (
    <section
      id="join"
      className="relative isolate overflow-hidden border-y border-foam/8 bg-linear-to-b from-ink-950 via-dusk-900/60 to-ink-950 py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 -z-10 aspect-square w-[min(900px,140vw)] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgb(255 178 77 / 0.55) 0%, rgb(224 69 123 / 0.25) 45%, transparent 70%)",
        }}
      />
      <Container className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <p className="label text-sun-300">{joinCopy.eyebrow}</p>
          <h2 className="display mt-3 text-5xl sm:text-6xl lg:text-7xl">
            <span className="text-sunrise pb-[0.06em]">{joinCopy.title}</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist sm:text-xl">
            {joinCopy.lede}
          </p>
          <ul className="mt-8 space-y-3">
            {joinCopy.points.map((point) => (
              <li key={point} className="flex gap-3 text-foam">
                <span
                  aria-hidden
                  className="mt-2 size-2 shrink-0 -skew-x-10 bg-sun-400"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="self-start">
          {/* `peer-empty` shows the fallback only while the form renders nothing. */}
          <div className="peer panel bg-ink-950/70 p-6 backdrop-blur-sm empty:hidden sm:p-8">
            <JoinForm source="home" enabled={isJoinConfigured()} />
          </div>
          <div className="panel hidden bg-ink-950/70 p-6 peer-empty:block sm:p-8">
            <p className="label text-sun-300">{joinCopy.pendingLabel}</p>
            <p className="mt-3 text-mist">{joinCopy.pending}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

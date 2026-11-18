import { Swell } from "@/components/hero/swell";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";

/** Horizontal position of the sun, shared by the disc and its reflection. */
const SUN_U = 0.72;

/**
 * Home page hero. Copy sits on the dark pre-dawn sky; the sunrise scene
 * (horizon glow, sun, text swell) sits below it so text never overlaps
 * the bright band.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-linear-to-b from-ink-950 via-[#0c1233] via-40% to-dusk-900 to-70%">
      <Stars />

      <Container className="relative pb-10 pt-12 sm:pb-14 sm:pt-16">
        <p className="label inline-flex items-center gap-3 border border-foam/15 bg-foam/5 px-3 py-2 text-sun-200">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-[pulse-dot_2s_ease-out_infinite] rounded-full bg-sun-400" />
            <span className="relative size-2 rounded-full bg-sun-400" />
          </span>
          Daytona Beach, FL
        </p>

        <h1 className="display mt-6 text-[clamp(2.95rem,7.4vw,6.7rem)]">
          Come build things
          <span className="text-sunrise block pb-[0.06em]">
            with people who get it.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist sm:text-xl">
          A small group of people around Daytona Beach who enjoy experimenting
          with AI, building things, and hanging out. No agenda. Just show up.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/#join">I&rsquo;m interested</ButtonLink>
          <ButtonLink href="/#vibe" variant="ghost">
            What is this?
          </ButtonLink>
        </div>
      </Container>

      <SunriseScene />
    </section>
  );
}

/** Faint stars in the pre-dawn sky. Decorative. */
function Stars() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[55%] opacity-70"
      style={{
        backgroundImage: [
          "radial-gradient(1px 1px at 12% 18%, rgb(246 240 228 / 0.9), transparent 60%)",
          "radial-gradient(1px 1px at 31% 9%, rgb(246 240 228 / 0.7), transparent 60%)",
          "radial-gradient(1.5px 1.5px at 47% 27%, rgb(246 240 228 / 0.8), transparent 60%)",
          "radial-gradient(1px 1px at 63% 13%, rgb(246 240 228 / 0.6), transparent 60%)",
          "radial-gradient(1.5px 1.5px at 78% 22%, rgb(246 240 228 / 0.9), transparent 60%)",
          "radial-gradient(1px 1px at 91% 8%, rgb(246 240 228 / 0.7), transparent 60%)",
          "radial-gradient(1px 1px at 22% 41%, rgb(246 240 228 / 0.5), transparent 60%)",
          "radial-gradient(1px 1px at 86% 44%, rgb(246 240 228 / 0.5), transparent 60%)",
        ].join(","),
      }}
    />
  );
}

/** Horizon glow, rising sun, and the animated water below it. */
function SunriseScene() {
  return (
    <div
      aria-hidden
      className="relative min-h-[clamp(240px,30svh,420px)] w-full flex-1"
    >
      {/* Sky band above the horizon. */}
      <div className="absolute inset-x-0 top-0 h-[36%] bg-linear-to-b from-transparent via-dusk-500/90 via-65% to-sun-300" />

      {/* Sun, a little more than half above the horizon line. */}
      <div
        className="absolute top-[36%] aspect-square w-[clamp(120px,16vw,230px)] animate-[sun-breathe_9s_ease-in-out_infinite] rounded-full"
        style={{
          left: `${SUN_U * 100}%`,
          transform: "translate(-50%, -56%)",
          background:
            "radial-gradient(circle at 50% 45%, #fff6dc 0%, #ffe09a 38%, #ffb24d 72%, #ff8a3c 100%)",
          boxShadow:
            "0 0 90px 30px rgb(255 190 110 / 0.55), 0 0 220px 90px rgb(255 120 70 / 0.35)",
        }}
      />

      {/* Water: gradient base, then the text swell on top. */}
      <div className="absolute inset-x-0 bottom-0 top-[36%] overflow-hidden bg-linear-to-b from-[#ff9a56] via-[#3c2470] via-38% to-ink-950">
        <Swell sunU={SUN_U} />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-ink-950" />
      </div>
    </div>
  );
}

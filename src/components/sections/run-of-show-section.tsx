import { Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { runOfShow, runOfShowCopy } from "@/content/home";

/**
 * The order of a night as a lap timeline. Durations only: no start time is
 * set, so nothing here implies a clock time.
 */
export function RunOfShowSection() {
  const total = runOfShow.reduce((sum, step) => sum + step.minutes, 0);
  return (
    <Section
      id="run-of-show"
      eyebrow={runOfShowCopy.eyebrow}
      title={runOfShowCopy.title}
      lede={runOfShowCopy.lede}
      className="bg-linear-to-b from-ink-950 via-ink-900 to-ink-950"
    >
      <Reveal>
        <ol className="relative grid gap-px bg-foam/8 md:grid-cols-4">
          {runOfShow.map((step, i) => (
            <li key={step.title} className="flex flex-col bg-ink-950 p-6 sm:p-7">
              <div className="flex items-baseline justify-between gap-4">
                <span className="label text-mist">
                  Segment {String(i + 1).padStart(2, "0")}
                </span>
                <span className="label text-sun-300">~{step.minutes} min</span>
              </div>
              <h3 className="display mt-5 text-3xl">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-mist">{step.body}</p>
              <div
                aria-hidden
                className="mt-auto pt-6"
              >
                <div className="h-1 w-full bg-foam/8">
                  <div
                    className="h-full bg-linear-to-r from-sun-300 to-flare-500"
                    style={{ width: `${Math.round((step.minutes / total) * 100)}%` }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      <div className="mt-8 flex flex-col gap-4 border-l-2 border-sun-400 pl-5 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="max-w-2xl text-mist">{runOfShowCopy.caveat}</p>
        <p className="label shrink-0 text-foam">
          Total ~{Math.round((total / 60) * 2) / 2} hours
        </p>
      </div>
    </Section>
  );
}

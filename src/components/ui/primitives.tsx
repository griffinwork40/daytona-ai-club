import type { ReactNode } from "react";

/** Page width container with consistent gutters. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Race number plate: a slanted block holding a number.
 * `tone="sun"` is the filled version, `tone="line"` is outlined.
 */
export function Plate({
  children,
  tone = "sun",
  className = "",
}: {
  children: ReactNode;
  tone?: "sun" | "line";
  className?: string;
}) {
  const toneClass =
    tone === "sun"
      ? "bg-linear-to-br from-sun-300 to-flare-500 text-ink-950"
      : "border border-foam/30 text-foam";
  return (
    <span
      className={`display inline-flex -skew-x-10 items-center px-2.5 py-1 ${toneClass} ${className}`}
    >
      <span className="skew-x-10">{children}</span>
    </span>
  );
}

/** Checkered flag divider. Decorative only. */
export function CheckerStrip({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`checker h-3.5 w-full ${className}`} />;
}

/**
 * Standard page section with an eyebrow, a display heading, and an
 * optional lede. `eyebrow` is short mono text such as "Lap 02".
 */
export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      <Container>
        <header className="max-w-3xl">
          {eyebrow ? <p className="label text-sun-300">{eyebrow}</p> : null}
          <h2 className="display mt-3 text-5xl sm:text-6xl lg:text-7xl">
            {title}
          </h2>
          {lede ? (
            <p className="mt-5 text-lg leading-relaxed text-mist sm:text-xl">
              {lede}
            </p>
          ) : null}
        </header>
        <div className="mt-12 sm:mt-14">{children}</div>
      </Container>
    </section>
  );
}

/** Heading block for interior pages (about, events, speak). */
export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <div className="border-b border-foam/10 bg-linear-to-b from-ink-950 via-ink-900 to-dusk-900/50 pb-14 pt-16 sm:pb-20 sm:pt-24">
      <Container>
        {eyebrow ? <p className="label text-sun-300">{eyebrow}</p> : null}
        <h1 className="display mt-3 max-w-4xl text-6xl sm:text-7xl lg:text-8xl">
          {title}
        </h1>
        {lede ? (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist sm:text-xl">
            {lede}
          </p>
        ) : null}
      </Container>
    </div>
  );
}

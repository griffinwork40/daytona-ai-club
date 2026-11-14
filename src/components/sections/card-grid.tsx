import { Reveal } from "@/components/ui/reveal";
import type { Card } from "@/content/types";

/**
 * Grid of numbered cards. `numbered` prefixes each title with a race style
 * index ("01"). Headings are `h3`, so place it under an `h2`.
 */
export function CardGrid({
  items,
  columns = 3,
  numbered = true,
}: {
  items: Card[];
  columns?: 2 | 3;
  numbered?: boolean;
}) {
  const cols = columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
  // When the last row is short, the final card stretches to fill it so
  // the grid never shows an empty cell.
  const short = items.length % columns;
  const span = short === 0 ? 1 : columns - short + 1;
  const lastSpan = span === 3 ? "md:col-span-3" : span === 2 ? "md:col-span-2" : "";
  return (
    <Reveal>
      <ul className={`grid gap-px bg-foam/8 ${cols}`}>
        {items.map((item, i) => (
          <li
            key={item.title}
            className={`bg-ink-950 p-6 sm:p-8 ${i === items.length - 1 ? lastSpan : ""}`}
          >
            {numbered ? (
              <span className="label text-sun-300">
                {String(i + 1).padStart(2, "0")}
              </span>
            ) : null}
            <h3 className="display mt-3 text-3xl">{item.title}</h3>
            <p className="mt-3 leading-relaxed text-mist">{item.body}</p>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

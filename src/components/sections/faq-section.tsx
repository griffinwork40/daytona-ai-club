import Link from "next/link";
import { Section } from "@/components/ui/primitives";
import { faq, faqCopy } from "@/content/faq";

/** FAQ built on native `<details>`, so it works without JavaScript. */
export function FaqSection() {
  return (
    <Section eyebrow={faqCopy.eyebrow} title={faqCopy.title} lede={faqCopy.lede}>
      <div className="max-w-4xl border-t border-foam/10">
        {faq.map((item) => (
          <details
            key={item.question}
            className="group border-b border-foam/10"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
              <h3 className="text-lg font-medium text-foam group-open:text-sun-200 sm:text-xl">
                {item.question}
              </h3>
              <span
                aria-hidden
                className="display grid size-8 shrink-0 place-items-center border border-foam/20 text-xl text-sun-300 transition group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="prose-club max-w-3xl pb-6 leading-relaxed text-mist">
              {item.answer.map((para) => (
                <p key={para}>{para}</p>
              ))}
              {item.link ? (
                <p>
                  <Link
                    href={item.link.href}
                    className="label text-sun-300 hover:text-sun-200"
                  >
                    {item.link.label} &rarr;
                  </Link>
                </p>
              ) : null}
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}

import type { Card, SectionCopy } from "@/content/types";

/** Who shows up. Used on the home page and /about. */
export const audiencesCopy: SectionCopy = {
  eyebrow: "Who shows up",
  title: "Curious people",
  lede: "You don\u2019t need an impressive r\u00e9sum\u00e9 or a finished project. You just need to be interested.",
};

export const audiences: Card[] = [
  {
    title: "People who build things",
    body: "Engineers, indie hackers, founders. You\u2019re shipping things with AI and want to trade notes with people solving similar problems.",
  },
  {
    title: "People who use AI at work",
    body: "Marketers, designers, analysts, writers. AI shows up in your day-to-day and you want to see how others are using it.",
  },
  {
    title: "People who are just curious",
    body: "You\u2019ve heard about all this AI stuff and want to see what it actually looks like up close. Perfect. That\u2019s reason enough.",
  },
];

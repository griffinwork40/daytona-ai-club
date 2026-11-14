import type { Card, SectionCopy } from "@/content/types";

/** Who the club is for. Used on the home page and on /about. */
export const audiencesCopy: SectionCopy = {
  eyebrow: "Lap 02 · The field",
  title: "Who it is for",
  lede: "Three kinds of people, one room. You do not need to code to belong here.",
};

export const audiences: Card[] = [
  {
    title: "People who build with AI",
    body: "Engineers, tinkerers, and founders shipping things with models, agents, and APIs. Bring what you made, show how it works, and trade notes with people solving the same problems.",
  },
  {
    title: "People who use it at work",
    body: "Marketers, analysts, nurses, teachers, lawyers, tradespeople. If AI already shows up in your job, come see how others use it and share what works for you.",
  },
  {
    title: "People who are curious",
    body: "Students, retirees, and anyone who wants to see what this stuff can really do, live and unscripted. Ask anything. Nobody expects you to know the jargon.",
  },
];

import type { Card, RunStep, SectionCopy } from "@/content/types";

/**
 * Home page copy, except the FAQ (see faq.ts) and audiences (audiences.ts).
 * Lines marked DRAFT are assumptions about club policy. Confirm or edit them.
 */

export const nextCopy = {
  eyebrow: "Lap 01 · On the grid",
  title: "Next up",
  lede: "Every meetup gets a number, like a car on the grid. The first one is #001, Founding Night.",
  plate: "#001",
  note: "New dates and venues go to the email list first.",
};

export const runOfShowCopy: SectionCopy & { caveat: string } = {
  eyebrow: "Lap 03 · Run of show",
  title: "What a night looks like",
  // DRAFT: total length of about two and a half hours.
  lede: "Roughly two and a half hours, built around live demos and time to build together.",
  caveat:
    "This is the plan, not a promise. The format may shift until meetup #001 is booked, and again after we learn what works in the room.",
};

/** Order of the evening. Durations only, since no start time is set. */
export const runOfShow: RunStep[] = [
  {
    title: "Doors and hellos",
    // DRAFT: 30 minute arrival window.
    minutes: 30,
    body: "Find a seat, meet the people next to you, and say what you are working on or curious about.",
  },
  {
    title: "Short demos",
    // DRAFT: four or so demos per night.
    minutes: 30,
    body: "A handful of live demos, about five minutes each. Real tools on a real screen, with a quick question or two after each.",
  },
  {
    title: "Deep dive",
    // DRAFT: 15 minute talk plus 10 minutes of questions.
    minutes: 25,
    body: "One longer session, about fifteen minutes, that goes further into a single project or technique. Then open questions.",
  },
  {
    title: "Open build",
    // DRAFT: open build closes the night.
    minutes: 60,
    body: "Laptops open. Get help with a stuck project, pair with someone new, or watch over a shoulder and ask questions.",
  },
];

export const houseRulesCopy: SectionCopy = {
  eyebrow: "Lap 04 · House rules",
  title: "House rules",
  lede: "A few norms that keep the night worth showing up for.",
};

export const houseRules: Card[] = [
  {
    title: "Demos over slides",
    body: "Show the thing working. A live screen beats a deck every time, even when it breaks.",
  },
  {
    title: "No sales pitches",
    body: "Share what you built and what you learned. Selling a product or service from the front of the room is off limits.",
  },
  {
    title: "Beginners welcome",
    body: "Every question is fair game. Explain things the way you wish someone had explained them to you.",
  },
  {
    // DRAFT: credit norm.
    title: "Credit your sources",
    body: "Name the tools, papers, and people your work builds on.",
  },
  {
    // DRAFT: photo and recording consent norm.
    title: "Ask before you post",
    body: "Check with people before you share photos of them or their screens.",
  },
];

export const joinCopy = {
  eyebrow: "Lap 05 · Join",
  title: "Become a founding member",
  lede: "The club starts with the people on this list. Add your email and you will hear first when Founding Night has a date and a venue.",
  points: [
    "One list, no account to create.",
    // DRAFT: email frequency and content policy.
    "Emails only about meetups: dates, venues, and calls for demos.",
    // DRAFT: unsubscribe policy (depends on the forms workstream).
    "Unsubscribe any time.",
  ],
  /** Shown only if the signup form renders nothing. */
  pendingLabel: "Signups opening soon",
  pending: "The signup form is not live yet. Check back shortly.",
  speakPrompt: "If you have something to show,",
  speakLink: { href: "/speak", label: "propose a demo" },
};

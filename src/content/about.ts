import { site } from "@/config/site";
import type { Card, SectionCopy } from "@/content/types";

/**
 * /about copy. Lines marked DRAFT are assumptions about club policy.
 * Confirm or edit them.
 */

export const aboutMeta = {
  title: "About",
  description: `Why ${site.name} exists, who runs it, who it is for, and the code of conduct for meetups in ${site.city}, ${site.region}.`,
};

export const aboutHeader = {
  eyebrow: `Est. ${site.founded} · ${site.county}`,
  title: "Why this club exists",
  lede: `${site.name} is a monthly, in-person meetup for people around ${site.city} who want to see AI work up close and learn from each other.`,
};

export const whyCopy = {
  eyebrow: "The reason",
  title: "A room that did not exist",
  paragraphs: [
    `${site.organizer.name} went looking for a recurring, in-person AI meetup in the ${site.city} area that was open to everyone, not only engineers. He could not find one.`,
    "So he is starting it. The idea is simple: once a month, people who build with AI, use it at work, or are just curious get together in one room, watch real demos, and help each other get unstuck.",
    "The club has not met yet. The first meetup is #001, Founding Night, and the people who join now help decide what it becomes.",
  ],
};

export const organizerCopy = {
  eyebrow: "Race control",
  title: "Who runs it",
};

export const audienceCopy: SectionCopy = {
  eyebrow: "The field",
  title: "Who it is for",
};

export const conductCopy: SectionCopy = {
  eyebrow: "Code of conduct",
  title: "How we treat each other",
  // DRAFT: the whole code of conduct below is a starting draft.
  lede: "Everyone who attends, speaks, or helps run a meetup agrees to this.",
};

export const conduct: Card[] = [
  {
    title: "Be welcoming",
    body: "Treat every person and every question with respect, whatever their background or experience.",
  },
  {
    title: "No harassment",
    body: "No harassment, intimidation, or unwelcome attention of any kind, in person or online.",
  },
  {
    title: "Respect consent",
    body: "Ask before photographing or recording people or their screens, and before sharing someone else's work.",
  },
  {
    title: "Keep it honest",
    body: "Present your own work truthfully. No sales pitches from the stage.",
  },
  {
    // DRAFT: enforcement policy.
    title: "Consequences",
    body: "The organizer may ask anyone who breaks these rules to leave and not return.",
  },
];

export const conductReport = {
  // DRAFT: reporting channel. Shown with the organizer's name since no contact email is set.
  text: `If something happens that makes you uncomfortable, tell ${site.organizer.name} at the meetup.`,
};

export const aboutCta = {
  title: "Be there for #001",
  body: "Founding Night does not have a date yet. Join the list to hear first.",
  join: { href: "/#join", label: "Join the club" },
  speak: { href: "/speak", label: "Propose a demo" },
};

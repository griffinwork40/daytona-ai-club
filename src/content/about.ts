import { site } from "@/config/site";
import type { Card, SectionCopy } from "@/content/types";

export const aboutMeta = {
  title: "About",
  description: `Why ${site.name} exists, who\u2019s behind it, and what to expect at a gathering in ${site.city}, ${site.region}.`,
};

export const aboutHeader = {
  eyebrow: `${site.city}, ${site.region}`,
  title: "Why this exists",
  lede: "Because I wanted to find people nearby who like building things with AI, and they didn\u2019t seem to be in one place yet.",
};

export const whyCopy = {
  eyebrow: "The story",
  title: "Finding your people",
  paragraphs: [
    `I\u2019m ${site.organizer.name}. I\u2019m a software engineer in ${site.city} and I spend most of my time building open source AI agent tools.`,
    "I went looking for a group of people around here who mess around with AI, build things, and hang out regularly. I couldn\u2019t find one.",
    "So I\u2019m starting it. The idea is simple: get a few curious, interesting people together in one room on a regular basis. Laptops open, low pressure, see what happens.",
    "The group hasn\u2019t met yet. The people who join now get to shape what it becomes.",
  ],
};

export const expectCopy: SectionCopy = {
  eyebrow: "What to expect",
  title: "The vibe",
  lede: "A few things worth knowing before you show up.",
};

export const expectations: Card[] = [
  {
    title: "It\u2019s casual",
    body: "Think apartment hangout, not conference room. Laptops, music, conversation.",
  },
  {
    title: "Show things, don\u2019t pitch things",
    body: "Share what you built, what you\u2019re stuck on, what you learned. No sales pitches.",
  },
  {
    title: "Everyone\u2019s welcome",
    body: "Experienced engineers and total beginners sit in the same room. Every question is fair game.",
  },
  {
    title: "Be good to each other",
    body: "Treat people with respect. If something makes you uncomfortable, tell Griffin and he\u2019ll handle it.",
  },
];

export const aboutCta = {
  title: "Sound good?",
  body: "Drop your email and I\u2019ll reach out when we\u2019re getting together.",
  join: { href: "/#join", label: "I\u2019m interested" },
  speak: { href: "/speak", label: "Share something" },
};

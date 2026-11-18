import type { SectionCopy } from "@/content/types";

/**
 * Home page copy, except the FAQ (see faq.ts) and audiences (audiences.ts).
 */

export const vibeCopy: SectionCopy & { paragraphs: string[] } = {
  eyebrow: "What this is",
  title: "Not a meetup. A hangout.",
  paragraphs: [
    "Picture a few people in a casual space. Laptops open, music playing. Someone\u2019s pair-programming with Claude Code. Someone else is trying to get a local LLM running. Someone asks \u201chey, check this out\u201d and everyone leans over.",
    "That\u2019s pretty much it.",
    "Sometimes someone shows what they built. Sometimes we just hack on things together. The only real structure is showing up.",
  ],
};

export const founderCopy = {
  eyebrow: "Who\u2019s behind this",
  title: "Hey, I\u2019m Griffin",
  paragraphs: [
    "I\u2019m a software engineer in Daytona Beach. I build open source AI agent tools and spend most of my time messing around with LLMs, autonomous agents, and whatever else seems interesting.",
    "I started this because I wanted to find people nearby who are into the same things. Not a networking event or a lecture series. Just people to build things with and hang out.",
    "If that sounds like your kind of thing, come through.",
  ],
};

export const joinCopy = {
  eyebrow: "Get involved",
  title: "Come hang out",
  lede: "Drop your email and I\u2019ll reach out when we\u2019re getting together next. That\u2019s it.",
  points: [
    "No account to create. Just an email.",
    "I\u2019ll only email about getting together.",
    "Unsubscribe whenever.",
  ],
  pendingLabel: "Signups opening soon",
  pending: "The signup form is still being set up. Check back shortly.",
};

import { site } from "@/config/site";
import type { Card, SectionCopy } from "@/content/types";

export const speakMeta = {
  title: "Share",
  description: `Share something you\u2019ve built or discovered at ${site.name} in ${site.city}, ${site.region}. No formal proposals required.`,
};

export const speakHeader = {
  eyebrow: "Show and tell",
  title: "Share something",
  lede: "Got something cool you\u2019ve been working on? A tool, a workflow, a weird experiment? Bring it. That\u2019s what this is for.",
  cta: "Let me know",
};

export const whoCopy: SectionCopy & { points: string[] } = {
  eyebrow: "This means you",
  title: "You don\u2019t need permission",
  points: [
    "You built something with AI, finished or not.",
    "You found a workflow or tool that other people might want to steal.",
    "You tried something that failed in an interesting way.",
    "You\u2019ve never shown anything to a group before. Great. Start here.",
  ],
};

export const goodCopy: SectionCopy = {
  eyebrow: "What works well",
  title: "Keep it real",
};

export const goodTraits: Card[] = [
  {
    title: "Show the actual thing",
    body: "Open your laptop and make it do something. Live demos beat slide decks every time, even when they break.",
  },
  {
    title: "Be specific",
    body: "One problem, what you tried, and what happened. Narrow beats broad.",
  },
  {
    title: "Be honest about the rough parts",
    body: "What broke? What would you do differently? That\u2019s usually the most useful part.",
  },
  {
    title: "No pitches",
    body: "Talk about what you built and what you learned. This isn\u2019t a sales floor.",
  },
];

export const formCopy = {
  eyebrow: "Heads up",
  title: "Let me know what you want to share",
  body: "A few sentences is plenty. This isn\u2019t a formal proposal, just a heads-up so I know what to expect.",
  pendingLabel: "Not open yet",
  pending: "This form is still being set up. Check back shortly.",
  followUp: `${site.organizer.name} reads every one of these and will reply by email.`,
};

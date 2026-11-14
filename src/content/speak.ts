import { site } from "@/config/site";
import type { Card, Format, SectionCopy } from "@/content/types";

/**
 * /speak copy. Lines marked DRAFT are assumptions about club policy.
 * Confirm or edit them.
 */

export const speakMeta = {
  title: "Speak",
  description: `Propose a five minute demo or a fifteen minute deep dive at ${site.name}, the in-person AI club in ${site.city}, ${site.region}.`,
};

export const speakHeader = {
  eyebrow: "Call for demos",
  title: "Show what you built",
  lede: "Meetups run on live demos from people in the room. If you made something with AI, or found a way to use it that works, there is a slot for you.",
  cta: "Send a proposal",
};

export const whoCopy: SectionCopy & { points: string[] } = {
  eyebrow: "Who should propose",
  title: "You, probably",
  points: [
    "You built a tool, agent, app, or script that uses AI, finished or not.",
    "You use AI at work and found a workflow other people could copy.",
    "You tried something that failed in an interesting way.",
    // DRAFT: first-time speakers explicitly welcome.
    "You have never given a talk before. First timers are welcome.",
  ],
};

export const formatsCopy: SectionCopy = {
  eyebrow: "Two formats",
  title: "Pick your length",
};

export const formats: Format[] = [
  {
    name: "Short demo",
    minutes: 5,
    body: "One idea, shown live. Open the thing and make it do something. A question or two after.",
    examples: ["A tool you use every day", "A weekend project", "A prompt or workflow that saves you time"],
  },
  {
    name: "Deep dive",
    minutes: 15,
    body: "One longer session per night that goes further into a single project or technique, followed by open questions.",
    examples: ["How you built and shipped something", "A technique explained end to end", "Lessons from running AI in production"],
  },
];

export const goodCopy: SectionCopy = {
  eyebrow: "What makes a good one",
  title: "Make it worth the lap",
};

export const goodTraits: Card[] = [
  {
    title: "Live over slides",
    body: "Show the real thing on a real screen. A couple of slides for context is fine.",
  },
  {
    title: "Specific",
    body: "One problem, what you tried, and what happened. Narrow beats broad.",
  },
  {
    title: "Honest about the rough parts",
    body: "Say what broke and what you would do differently. That is often the most useful part.",
  },
  {
    title: "No pitch",
    body: "Talk about what you built and learned. Product pitches and recruiting pitches are not a fit.",
  },
];

export const formCopy = {
  eyebrow: "Propose",
  title: "Send a proposal",
  body: "Tell us what you want to show and which format fits. A few sentences is enough.",
  /** Shown only if the proposal form renders nothing. */
  pendingLabel: "Proposals opening soon",
  pending: "The proposal form is not live yet. Check back shortly.",
  // DRAFT: response policy.
  followUp: `${site.organizer.name} reads every proposal and will reply by email. Demo slots depend on when and where Founding Night lands, so a slot cannot be promised yet.`,
};

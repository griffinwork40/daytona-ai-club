import { site } from "@/config/site";
import type { FaqItem, SectionCopy } from "@/content/types";

/**
 * Home page FAQ. Answers say plainly when something is not decided.
 * Lines marked DRAFT are assumptions about club policy. Confirm or edit them.
 */

export const faqCopy: SectionCopy = {
  eyebrow: "Lap 06 · Pit lane",
  title: "Questions",
  lede: "Straight answers, including the parts that are not decided yet.",
};

export const faq: FaqItem[] = [
  {
    question: "When and where is the first meetup?",
    answer: [
      "Not set yet. Meetup #001, Founding Night, is being planned now, and the date and venue are still open.",
      `It will be in person in the ${site.city} area. The email list hears first.`,
    ],
    link: { href: "/#join", label: "Join the list" },
  },
  {
    question: "How often will it meet?",
    answer: [
      "Monthly, in person. The exact night of the month is not set yet.",
    ],
  },
  {
    question: "Does it cost anything?",
    answer: [
      // DRAFT: any cost will be listed before RSVP.
      "Pricing is not decided. If there is ever a cost, it will be on the event page before you RSVP.",
    ],
  },
  {
    question: "Do I need to know how to code?",
    answer: [
      "No. The club is for people who build with AI, people who use it at work, and people who are just curious. Demos are meant to be followed by anyone in the room.",
    ],
  },
  {
    question: "Can I show something I built?",
    answer: [
      "Yes, please. There are two formats: a short demo of about five minutes and a deep dive of about fifteen. Works in progress are welcome.",
    ],
    link: { href: "/speak", label: "Propose a demo" },
  },
  {
    question: "Can I pitch my company or product?",
    answer: [
      // DRAFT: networking and shop talk allowed during open build.
      "Not from the front of the room. Demos and talks are about what you built and what you learned. Talking shop during open build is fine.",
    ],
  },
  {
    question: "Will there be food?",
    answer: [
      "Not decided. It depends on the venue. Each event page will say.",
    ],
  },
  {
    question: "Will talks be recorded?",
    answer: [
      // DRAFT: no recording by default, so people can demo rough work.
      "The plan is not to record by default, so people feel free to show rough work. That may change for speakers who want a recording.",
    ],
  },
  {
    question: "Who runs it?",
    answer: [
      `${site.organizer.name} started the club in ${site.founded}. It is independent and not affiliated with any company.`,
    ],
    link: { href: "/about", label: "About the club" },
  },
];

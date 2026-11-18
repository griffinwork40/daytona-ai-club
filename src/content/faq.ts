import { site } from "@/config/site";
import type { FaqItem, SectionCopy } from "@/content/types";

export const faqCopy: SectionCopy = {
  eyebrow: "Questions",
  title: "The basics",
};

export const faq: FaqItem[] = [
  {
    question: "When and where?",
    answer: [
      "Still figuring that out. It\u2019ll be somewhere casual in the Daytona Beach area. I\u2019ll email you when I know.",
    ],
    link: { href: "/#join", label: "Get on the list" },
  },
  {
    question: "Does it cost anything?",
    answer: ["No plans to charge anything."],
  },
  {
    question: "Do I need to know how to code?",
    answer: [
      "Nope. Some people write code, some don\u2019t. If you\u2019re curious about AI and enjoy building or making things, you\u2019re in.",
    ],
  },
  {
    question: "Can I show something I\u2019m working on?",
    answer: [
      "Please do. That\u2019s half the fun. It doesn\u2019t need to be finished or impressive.",
    ],
    link: { href: "/speak", label: "Tell me about it" },
  },
  {
    question: "Who runs this?",
    answer: [
      `${site.organizer.name}. It\u2019s not a company or an organization. Just a person who wanted to find other people nearby who are into this stuff.`,
    ],
    link: { href: "/about", label: "More about that" },
  },
];

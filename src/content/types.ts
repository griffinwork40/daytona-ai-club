/** Shared shapes for editable page copy. Components render these as-is. */

export type SectionCopy = {
  eyebrow: string;
  title: string;
  lede?: string;
};

export type Card = {
  title: string;
  body: string;
};

export type Link = {
  href: string;
  label: string;
};

export type RunStep = {
  title: string;
  body: string;
  /** Rough length in minutes. Shown as "~20 min". */
  minutes: number;
};

export type FaqItem = {
  question: string;
  /** One paragraph per entry. */
  answer: string[];
  link?: Link;
};

export type Format = {
  name: string;
  /** Rough length in minutes. */
  minutes: number;
  body: string;
  examples: string[];
};

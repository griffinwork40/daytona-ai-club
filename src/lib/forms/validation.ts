/**
 * Pure validation functions for form fields.
 * No external dependencies — returns plain error maps.
 */

import type { FieldErrors } from "./types";

export const TALK_FORMAT_VALUES = ["short_demo", "deep_dive"] as const;
export type TalkFormat = (typeof TALK_FORMAT_VALUES)[number];

export interface JoinFields {
  email: string;
  firstName: string;
  honeypot: string;
}

export interface SpeakFields {
  name: string;
  email: string;
  talkTitle: string;
  talkFormat: string;
  description: string;
  honeypot: string;
}

function isValidEmail(value: string): boolean {
  // RFC 5322-inspired simple check: local@domain.tld
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function validateJoin(fields: JoinFields): FieldErrors | null {
  const errors: FieldErrors = {};

  if (!fields.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!isValidEmail(fields.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (fields.firstName.trim().length > 100) {
    errors.firstName = "First name must be 100 characters or fewer.";
  }

  return Object.keys(errors).length ? errors : null;
}

export function validateSpeak(fields: SpeakFields): FieldErrors | null {
  const errors: FieldErrors = {};

  if (!fields.name.trim()) {
    errors.name = "Your name is required.";
  } else if (fields.name.trim().length > 100) {
    errors.name = "Name must be 100 characters or fewer.";
  }

  if (!fields.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!isValidEmail(fields.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!fields.talkTitle.trim()) {
    errors.talkTitle = "A talk title is required.";
  } else if (fields.talkTitle.trim().length > 200) {
    errors.talkTitle = "Title must be 200 characters or fewer.";
  }

  if (!fields.talkFormat) {
    errors.talkFormat = "Select a talk format.";
  } else if (
    !TALK_FORMAT_VALUES.includes(fields.talkFormat as TalkFormat)
  ) {
    errors.talkFormat = "Select a valid format.";
  }

  if (!fields.description.trim()) {
    errors.description = "A short description is required.";
  } else if (fields.description.trim().length > 2000) {
    errors.description = "Description must be 2000 characters or fewer.";
  }

  return Object.keys(errors).length ? errors : null;
}

"use server";

import { headers } from "next/headers";
import type { FormState } from "@/lib/forms/types";
import { validateSpeak } from "@/lib/forms/validation";
import { speakLimiter } from "@/lib/forms/rate-limiter";
import { isSpeakConfigured } from "@/lib/forms/config";
import { sendSpeakProposal } from "@/lib/forms/resend-client";

export async function speakAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  // Honeypot: bots fill the hidden field, humans never reach it
  const honeypot = String(formData.get("website") ?? "");
  if (honeypot) {
    return { status: "success", message: "Proposal received." };
  }

  // Configuration check first — before touching any personal data
  if (!isSpeakConfigured()) {
    console.warn("[speak] Resend not configured: RESEND_API_KEY, ORGANIZER_EMAIL, or RESEND_FROM_ADDRESS is missing");
    return { status: "not_configured" };
  }

  const fields = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    talkTitle: String(formData.get("talkTitle") ?? ""),
    talkFormat: String(formData.get("talkFormat") ?? ""),
    description: String(formData.get("description") ?? ""),
    honeypot,
  };
  const values = {
    name: fields.name,
    email: fields.email,
    talkTitle: fields.talkTitle,
    talkFormat: fields.talkFormat,
    description: fields.description,
  };

  // Rate limit by IP
  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!speakLimiter.check(ip)) {
    return { status: "rate_limited", values };
  }

  const errors = validateSpeak(fields);
  if (errors) {
    return { status: "field_errors", errors, values };
  }

  const result = await sendSpeakProposal({
    name: fields.name.trim(),
    email: fields.email.trim(),
    talkTitle: fields.talkTitle.trim(),
    talkFormat: fields.talkFormat,
    description: fields.description.trim(),
  });

  if (!result.ok) {
    console.error("[speak] Resend error:", result.message);
    return {
      status: "error",
      message: "Something went wrong. Please try again in a moment.",
      values,
    };
  }

  return {
    status: "success",
    message: "Proposal received. We will be in touch.",
  };
}

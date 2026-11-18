"use server";

import { headers } from "next/headers";
import type { FormState } from "@/lib/forms/types";
import { validateJoin } from "@/lib/forms/validation";
import { joinLimiter } from "@/lib/forms/rate-limiter";
import { isJoinConfigured, isNotifyConfigured } from "@/lib/forms/config";
import { addContactToList, sendJoinNotification } from "@/lib/forms/resend-client";

export async function joinAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  // Honeypot: bots fill the hidden field, humans never reach it
  const honeypot = String(formData.get("website") ?? "");
  if (honeypot) {
    // Silent success for bots — do not reveal the trap
    return { status: "success", message: "Thanks." };
  }

  // Configuration check first — before touching any personal data
  if (!isJoinConfigured()) {
    console.warn("[join] Resend not configured: RESEND_API_KEY or RESEND_SEGMENT_ID is missing");
    return { status: "not_configured" };
  }

  const fields = {
    email: String(formData.get("email") ?? ""),
    firstName: String(formData.get("firstName") ?? ""),
    interest: String(formData.get("interest") ?? ""),
    honeypot,
  };
  const values = {
    email: fields.email,
    firstName: fields.firstName,
    interest: fields.interest,
  };

  // Rate limit by IP
  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!joinLimiter.check(ip)) {
    return { status: "rate_limited", values };
  }

  const errors = validateJoin(fields);
  if (errors) {
    return { status: "field_errors", errors, values };
  }

  const result = await addContactToList({
    email: fields.email.trim(),
    firstName: fields.firstName.trim() || undefined,
    interest: fields.interest.trim() || undefined,
  });

  if (!result.ok) {
    console.error("[join] Resend error:", result.message);
    return {
      status: "error",
      message: "Something went wrong. Please try again in a moment.",
      values,
    };
  }

  // Fire-and-forget organizer notification when interest is filled in
  if (fields.interest.trim() && isNotifyConfigured()) {
    sendJoinNotification({
      email: fields.email.trim(),
      firstName: fields.firstName.trim() || undefined,
      interest: fields.interest.trim(),
    }).catch((err) => {
      console.error("[join] Failed to send organizer notification:", err);
    });
  }

  return {
    status: "success",
    message: "I\u2019ll reach out when we\u2019re getting together next.",
  };
}

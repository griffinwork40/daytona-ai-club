"use client";

import { useActionState, useEffect, useRef } from "react";
import { speakAction } from "@/app/actions/speak";
import { FormNotice } from "@/components/forms/form-notice";
import { buttonClass } from "@/components/ui/button";
import type { FormState } from "@/lib/forms/types";

const INITIAL: FormState = { status: "idle" };

/**
 * `enabled` is false when the server cannot deliver proposals. The form
 * then shows a closed notice up front instead of taking a proposal it
 * cannot send.
 */
export function SpeakForm({ enabled = true }: { enabled?: boolean }) {
  const [state, action, isPending] = useActionState(speakAction, INITIAL);

  // Move focus to first invalid field on field_errors
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.status === "field_errors") {
      const first = formRef.current?.querySelector<HTMLElement>(
        "[aria-invalid='true']"
      );
      first?.focus();
    }
  }, [state]);

  if (!enabled || state.status === "not_configured") {
    return (
      <FormNotice title="Not open yet" live={enabled}>
        This form is still being set up, so nothing can be sent right now.
        Check back soon.
      </FormNotice>
    );
  }

  if (state.status === "success") {
    return (
      <FormNotice title="Got it" tone="success" live>
        {state.message}
      </FormNotice>
    );
  }

  const errors =
    state.status === "field_errors" ? state.errors : {};
  // Values echoed back by the action, so a failed submit keeps what was typed.
  const values: Record<string, string> = "values" in state ? state.values : {};

  return (
    <form ref={formRef} action={action} noValidate>
      {/* Honeypot — hidden from real users, invisible to AT */}
      <div aria-hidden="true" style={{ display: "none" }}>
        <label htmlFor="speak-website">Website</label>
        <input
          id="speak-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Announced status region */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {state.status === "error" && state.message}
        {state.status === "rate_limited" &&
          "Too many attempts. Please wait a minute and try again."}
      </div>

      <div className="flex flex-col gap-5">
        {/* Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="speak-name" className="label text-mist">
            Your name <span aria-hidden="true">*</span>
          </label>
          <input
            id="speak-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-describedby={errors.name ? "speak-name-err" : undefined}
            aria-invalid={errors.name ? "true" : undefined}
            className="field"
            defaultValue={values.name ?? ""}
          />
          {errors.name && (
            <p id="speak-name-err" role="alert" className="label text-flare-500">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="speak-email" className="label text-mist">
            Email address <span aria-hidden="true">*</span>
          </label>
          <input
            id="speak-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-describedby={errors.email ? "speak-email-err" : undefined}
            aria-invalid={errors.email ? "true" : undefined}
            className="field"
            defaultValue={values.email ?? ""}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id="speak-email-err" role="alert" className="label text-flare-500">
              {errors.email}
            </p>
          )}
        </div>

        {/* What do you want to share */}
        <div className="flex flex-col gap-1">
          <label htmlFor="speak-description" className="label text-mist">
            What do you want to share? <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="speak-description"
            name="description"
            rows={5}
            required
            aria-required="true"
            aria-describedby={errors.description ? "speak-description-err" : undefined}
            aria-invalid={errors.description ? "true" : undefined}
            className="field resize-y"
            defaultValue={values.description ?? ""}
            placeholder="A tool you built, a workflow that\u2019s been useful, something you\u2019re still figuring out\u2026"
          />
          {errors.description && (
            <p id="speak-description-err" role="alert" className="label text-flare-500">
              {errors.description}
            </p>
          )}
        </div>

        {/* General error */}
        {state.status === "error" && (
          <p role="alert" className="label text-flare-500">
            {state.message}
          </p>
        )}

        {state.status === "rate_limited" && (
          <p role="alert" className="label text-flare-500">
            Too many attempts. Please wait a minute and try again.
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className={buttonClass("primary")}
          aria-busy={isPending}
        >
          {isPending ? "Sending\u2026" : "Send it"}
        </button>
      </div>
    </form>
  );
}

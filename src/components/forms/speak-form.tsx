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
      <FormNotice title="Proposals are not open yet" live={enabled}>
        The proposal inbox is still being set up, so nothing can be sent
        right now. Check back soon.
      </FormNotice>
    );
  }

  if (state.status === "success") {
    return (
      <FormNotice title="Proposal received" tone="success" live>
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

        {/* Talk title */}
        <div className="flex flex-col gap-1">
          <label htmlFor="speak-talkTitle" className="label text-mist">
            Talk title <span aria-hidden="true">*</span>
          </label>
          <input
            id="speak-talkTitle"
            name="talkTitle"
            type="text"
            required
            aria-required="true"
            aria-describedby={errors.talkTitle ? "speak-talkTitle-err" : undefined}
            aria-invalid={errors.talkTitle ? "true" : undefined}
            className="field"
            defaultValue={values.talkTitle ?? ""}
            placeholder="Building a local AI coding assistant"
          />
          {errors.talkTitle && (
            <p id="speak-talkTitle-err" role="alert" className="label text-flare-500">
              {errors.talkTitle}
            </p>
          )}
        </div>

        {/* Talk format */}
        <fieldset
          aria-describedby={errors.talkFormat ? "speak-talkFormat-err" : undefined}
        >
          <legend className="label text-mist mb-2">
            Format <span aria-hidden="true">*</span>
          </legend>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="talkFormat"
                value="short_demo"
                defaultChecked={values.talkFormat === "short_demo"}
                required
                className="accent-sun-400"
              />
              <span className="font-sans text-sm text-foam">
                Short demo{" "}
                <span className="text-mist">(~5 min)</span>
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="talkFormat"
                value="deep_dive"
                defaultChecked={values.talkFormat === "deep_dive"}
                className="accent-sun-400"
              />
              <span className="font-sans text-sm text-foam">
                Deep dive{" "}
                <span className="text-mist">(~15 min)</span>
              </span>
            </label>
          </div>
          {errors.talkFormat && (
            <p id="speak-talkFormat-err" role="alert" className="label text-flare-500 mt-1">
              {errors.talkFormat}
            </p>
          )}
        </fieldset>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label htmlFor="speak-description" className="label text-mist">
            Description <span aria-hidden="true">*</span>
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
            placeholder="What will you show or explain? What should the audience walk away knowing?"
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
          {isPending ? "Sending…" : "Submit proposal"}
        </button>
      </div>
    </form>
  );
}

"use client";

import { useActionState, useEffect, useRef } from "react";
import { joinAction } from "@/app/actions/join";
import { FormNotice } from "@/components/forms/form-notice";
import { buttonClass } from "@/components/ui/button";
import type { FormState } from "@/lib/forms/types";

const INITIAL: FormState = { status: "idle" };

interface Props {
  /** Where on the site this form sits, for example "home". */
  source?: string;
  /**
   * False when the server has no email list configured. The form then
   * shows a closed notice up front instead of taking an email it cannot store.
   */
  enabled?: boolean;
}

export function JoinForm({ source, enabled = true }: Props) {
  const [state, action, isPending] = useActionState(joinAction, INITIAL);

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
      <FormNotice title="Signups are not open yet" live={enabled}>
        The email list is still being set up, so nothing can be saved right
        now. Check back soon.
      </FormNotice>
    );
  }

  if (state.status === "success") {
    return (
      <FormNotice title="You are on the list" tone="success" live>
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
      {/* Hidden source tracking */}
      {source && (
        <input type="hidden" name="source" value={source} />
      )}

      {/* Honeypot — hidden from real users, invisible to AT */}
      <div aria-hidden="true" style={{ display: "none" }}>
        <label htmlFor="join-website">Website</label>
        <input
          id="join-website"
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

      <div className="flex flex-col gap-4">
        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="join-email" className="label text-mist">
            Email address <span aria-hidden="true">*</span>
          </label>
          <input
            id="join-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-describedby={errors.email ? "join-email-err" : undefined}
            aria-invalid={errors.email ? "true" : undefined}
            className="field"
            defaultValue={values.email ?? ""}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id="join-email-err" role="alert" className="label text-flare-500">
              {errors.email}
            </p>
          )}
        </div>

        {/* First name (optional) */}
        <div className="flex flex-col gap-1">
          <label htmlFor="join-firstName" className="label text-mist">
            First name{" "}
            <span className="text-mist/60">(optional)</span>
          </label>
          <input
            id="join-firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            aria-describedby={errors.firstName ? "join-firstName-err" : undefined}
            aria-invalid={errors.firstName ? "true" : undefined}
            className="field"
            defaultValue={values.firstName ?? ""}
          />
          {errors.firstName && (
            <p id="join-firstName-err" role="alert" className="label text-flare-500">
              {errors.firstName}
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
          {isPending ? "Joining…" : "Join the club"}
        </button>
      </div>
    </form>
  );
}

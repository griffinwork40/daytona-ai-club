/**
 * Shared state types for form server actions.
 * Every action returns FormState so the client can render the right UI.
 */

export type FieldErrors = Record<string, string>;

/**
 * What the visitor typed, echoed back whenever the form is shown again.
 * React resets uncontrolled fields after an action returns, so without
 * this a single mistake would wipe the whole form.
 */
export type FieldValues = Record<string, string>;

export type FormState =
  | { status: "idle" }
  | { status: "not_configured" }
  | { status: "rate_limited"; values: FieldValues }
  | { status: "field_errors"; errors: FieldErrors; values: FieldValues }
  | { status: "error"; message: string; values: FieldValues }
  | { status: "success"; message: string };

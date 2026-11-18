/**
 * Thin wrapper around the Resend SDK.
 *
 * API types confirmed from:
 *   node_modules/resend/dist/index.d.mts
 *
 * Join: resend.contacts.create(CreateContactOptions)
 *   - email: string                    (index.d.mts:1164)
 *   - firstName?: string               (index.d.mts:1167)
 *   - segments?: { id: string }[]      (index.d.mts:1170)
 *   - unsubscribed?: boolean           (index.d.mts:1165)
 *   Returns CreateContactResponse = Response<CreateContactResponseSuccess>
 *   where data.id: string, data.object: 'contact'  (index.d.mts:1179–1182)
 *
 * Speak: resend.emails.send(CreateEmailOptions)
 *   - from: string                     (index.d.mts:563)
 *   - to: string | string[]            (index.d.mts:593)
 *   - subject: string                  (index.d.mts:581)
 *   - text: string (body)              (index.d.mts:608 via RequireAtLeastOne<EmailRenderOptions>)
 *   - replyTo?: string | string[]      (index.d.mts:575)
 *   Returns CreateEmailResponse = Response<CreateEmailResponseSuccess>
 *   where data.id: string              (index.d.mts:617–620)
 *
 * Response<T> shape (index.d.mts:125–133):
 *   { data: T; error: null } | { error: ErrorResponse; data: null }
 *   Always check error before trusting data.
 */

import { Resend } from "resend";
import { formConfig } from "./config";

export interface JoinContactPayload {
  email: string;
  firstName?: string;
  interest?: string;
}

export interface SpeakEmailPayload {
  name: string;
  email: string;
  description: string;
}

export async function addContactToList(
  payload: JoinContactPayload
): Promise<{ ok: true } | { ok: false; message: string }> {
  const { apiKey, segmentId: listId } = formConfig();
  if (!apiKey || !listId) {
    return { ok: false, message: "Resend not configured" };
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.contacts.create({
    email: payload.email,
    firstName: payload.firstName,
    unsubscribed: false,
    segments: [{ id: listId }],
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  if (!data) {
    return { ok: false, message: "No data returned from Resend" };
  }

  return { ok: true };
}

export async function sendSpeakProposal(
  payload: SpeakEmailPayload
): Promise<{ ok: true } | { ok: false; message: string }> {
  const { apiKey, organizerEmail, fromAddress } = formConfig();
  if (!apiKey || !organizerEmail || !fromAddress) {
    return { ok: false, message: "Resend not configured" };
  }

  const body = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    ``,
    `What they want to share:`,
    payload.description,
  ].join("\n");

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from: fromAddress,
    to: organizerEmail,
    replyTo: payload.email,
    subject: `New share request from ${payload.name}`,
    text: body,
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  if (!data) {
    return { ok: false, message: "No data returned from Resend" };
  }

  return { ok: true };
}

export async function sendJoinNotification(
  payload: JoinContactPayload
): Promise<{ ok: true } | { ok: false; message: string }> {
  const { apiKey, organizerEmail, fromAddress } = formConfig();
  if (!apiKey || !organizerEmail || !fromAddress) {
    return { ok: false, message: "Resend not configured" };
  }

  const lines = [
    `Email: ${payload.email}`,
  ];
  if (payload.firstName) lines.push(`Name: ${payload.firstName}`);
  if (payload.interest) {
    lines.push(``, `Interested in:`, payload.interest);
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from: fromAddress,
    to: organizerEmail,
    replyTo: payload.email,
    subject: `New signup: ${payload.email}`,
    text: lines.join("\n"),
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  if (!data) {
    return { ok: false, message: "No data returned from Resend" };
  }

  return { ok: true };
}

/**
 * Form delivery configuration, read from the environment.
 * Kept apart from the Resend client so pages can ask "is this form
 * switched on?" without pulling the SDK into their bundle.
 */
export function formConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY,
    segmentId: process.env.RESEND_SEGMENT_ID,
    organizerEmail: process.env.ORGANIZER_EMAIL,
    fromAddress: process.env.RESEND_FROM_ADDRESS,
  };
}

/** The join form needs only the API key and the segment to add contacts to. */
export function isJoinConfigured(): boolean {
  const { apiKey, segmentId } = formConfig();
  return Boolean(apiKey && segmentId);
}

/** The speak form sends an email, so it needs a sender and a recipient. */
export function isSpeakConfigured(): boolean {
  const { apiKey, organizerEmail, fromAddress } = formConfig();
  return Boolean(apiKey && organizerEmail && fromAddress);
}

/** Notify the organizer when someone signs up. Same requirements as speak. */
export function isNotifyConfigured(): boolean {
  const { apiKey, organizerEmail, fromAddress } = formConfig();
  return Boolean(apiKey && organizerEmail && fromAddress);
}

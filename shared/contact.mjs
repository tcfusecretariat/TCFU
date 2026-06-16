/** @typedef {{ id: string; createdAt: string; name: string; email: string; subject: string; message: string; consent: boolean; locale?: string }} ContactSubmission */

/** @param {Record<string, unknown>} payload */
export function createContactSubmission(payload) {
  const consent = payload.consent === true || payload.consent === "on" || payload["gdpr-consent"] === "on";
  const submission = {
    name: String(payload.name || "").trim(),
    email: String(payload.email || "").trim(),
    subject: String(payload.subject || "").trim(),
    message: String(payload.message || "").trim(),
    consent,
    locale: payload.locale ? String(payload.locale) : undefined
  };

  if (!submission.name || !submission.email || !submission.message || !submission.consent) {
    throw new Error("Missing required fields.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) {
    throw new Error("Invalid email address.");
  }

  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...submission
  };
}

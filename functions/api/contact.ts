import { createContactSubmission } from "../../shared/contact.mjs";

/**
 * Optional contact endpoint for future use.
 *
 * Phase 1: the website uses a mailto link (see ContactForm.astro), so this
 * endpoint is NOT required for the form to work. There is no Cloudflare KV
 * dependency.
 *
 * To enable server-side delivery later, set ONE of the following in
 * Cloudflare Pages → Settings → Environment variables, and point the form at
 * /api/contact instead of using mailto:
 *   - RESEND_API_KEY + CONTACT_TO_EMAIL + CONTACT_FROM_EMAIL   (Resend)
 *   - FORMSPREE_ENDPOINT                                       (Formspree)
 *   - AIRTABLE_TOKEN + AIRTABLE_BASE_ID + AIRTABLE_TABLE       (Airtable)
 */
type Env = {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  FORMSPREE_ENDPOINT?: string;
  AIRTABLE_TOKEN?: string;
  AIRTABLE_BASE_ID?: string;
  AIRTABLE_TABLE?: string;
};

function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { "Content-Type": "application/json; charset=utf-8", ...init.headers }
  });
}

async function readPayload(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return (await request.json()) as Record<string, unknown>;
  }
  const formData = await request.formData();
  return Object.fromEntries(formData.entries()) as Record<string, unknown>;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let submission;
  try {
    submission = createContactSubmission(await readPayload(request));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request.";
    return json({ ok: false, message }, { status: 400 });
  }

  if (env.RESEND_API_KEY && env.CONTACT_TO_EMAIL && env.CONTACT_FROM_EMAIL) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL,
        to: env.CONTACT_TO_EMAIL,
        reply_to: submission.email,
        subject: submission.subject || `Website enquiry from ${submission.name}`,
        text: `${submission.message}\n\n—\n${submission.name}\n${submission.email}`
      })
    });
    return res.ok
      ? json({ ok: true, message: "Message sent." })
      : json({ ok: false, message: "Email provider error." }, { status: 502 });
  }

  if (env.FORMSPREE_ENDPOINT) {
    const res = await fetch(env.FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(submission)
    });
    return res.ok
      ? json({ ok: true, message: "Message sent." })
      : json({ ok: false, message: "Form provider error." }, { status: 502 });
  }

  return json(
    { ok: false, fallback: "mailto", message: "Server delivery is not configured. Use the email link instead." },
    { status: 501 }
  );
};

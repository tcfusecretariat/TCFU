import { createContactSubmission } from "../../shared/contact.mjs";

type Env = {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  REGISTRATION_FROM_EMAIL?: string;
  SECRETARIAT_EMAIL?: string;
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

function contactFromEmail(env: Env) {
  return env.CONTACT_FROM_EMAIL || env.REGISTRATION_FROM_EMAIL;
}

function contactToEmail(env: Env) {
  return env.CONTACT_TO_EMAIL || env.SECRETARIAT_EMAIL;
}

function resendConfigured(env: Env) {
  return Boolean(env.RESEND_API_KEY && contactFromEmail(env) && contactToEmail(env));
}

const successMessages: Record<string, string> = {
  zh: "訊息已成功送出，我們會盡快回覆您。",
  en: "Your message has been sent. We will get back to you as soon as possible.",
  fr: "Votre message a bien été envoyé. Nous vous répondrons dès que possible."
};

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  return json({
    ok: true,
    message: "Contact endpoint is live.",
    configured: {
      resend: resendConfigured(env),
      toEmail: Boolean(contactToEmail(env)),
      fromEmail: Boolean(contactFromEmail(env))
    }
  });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let submission;
  try {
    submission = createContactSubmission(await readPayload(request));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request.";
    return json({ ok: false, message }, { status: 400 });
  }

  if (resendConfigured(env)) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: contactFromEmail(env),
        to: contactToEmail(env),
        reply_to: submission.email,
        subject: submission.subject || `Website enquiry from ${submission.name}`,
        text: `${submission.message}\n\n—\n${submission.name}\n${submission.email}`
      })
    });

    if (!response.ok) {
      const detail = await response.text();
      return json({ ok: false, message: `Email provider error (${response.status}). ${detail}` }, { status: 502 });
    }

    const locale = submission.locale && successMessages[submission.locale] ? submission.locale : "en";
    return json({ ok: true, message: successMessages[locale] });
  }

  if (env.FORMSPREE_ENDPOINT) {
    const res = await fetch(env.FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(submission)
    });
    return res.ok
      ? json({ ok: true, message: successMessages.en })
      : json({ ok: false, message: "Form provider error." }, { status: 502 });
  }

  return json(
    {
      ok: false,
      message: "Contact delivery is not configured. Please email tcfu.secretariat@gmail.com directly."
    },
    { status: 503 }
  );
};

import {
  buildParticipantConfirmationEmail,
  CONFERENCE_TITLE,
  createEventRegistration,
  SYMPOSIUM_EVENT_KEY,
  toSanityDocument
} from "../../shared/event-registration.mjs";

type Env = {
  SANITY_WRITE_TOKEN?: string;
  PUBLIC_SANITY_PROJECT_ID?: string;
  PUBLIC_SANITY_DATASET?: string;
  PUBLIC_SANITY_API_VERSION?: string;
  RESEND_API_KEY?: string;
  REGISTRATION_FROM_EMAIL?: string;
  SECRETARIAT_EMAIL?: string;
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

function sanityConfig(env: Env) {
  return {
    projectId: env.PUBLIC_SANITY_PROJECT_ID || "8f53fq35",
    dataset: env.PUBLIC_SANITY_DATASET || "production",
    apiVersion: env.PUBLIC_SANITY_API_VERSION || "2026-06-15"
  };
}

async function sanityQuery<T>(env: Env, query: string, params: Record<string, unknown>) {
  const { projectId, dataset, apiVersion } = sanityConfig(env);
  const url = new URL(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`);
  url.searchParams.set("query", query);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  }

  const response = await fetch(url.toString(), {
    headers: { Accept: "application/json" }
  });

  if (!response.ok) {
    throw new Error(`Sanity query failed (${response.status}).`);
  }

  const body = (await response.json()) as { result?: T };
  return body.result as T;
}

async function sanityMutate(env: Env, mutations: unknown[]) {
  const { projectId, dataset, apiVersion } = sanityConfig(env);
  const response = await fetch(`https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.SANITY_WRITE_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ mutations })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Sanity mutate failed (${response.status}): ${detail}`);
  }

  return response.json();
}

async function sendResendEmail(env: Env, payload: { to: string; subject: string; text: string; replyTo?: string }) {
  if (!env.RESEND_API_KEY || !env.REGISTRATION_FROM_EMAIL) {
    throw new Error("Resend is not configured.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: env.REGISTRATION_FROM_EMAIL,
      to: payload.to,
      reply_to: payload.replyTo,
      subject: payload.subject,
      text: payload.text
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend error (${response.status}): ${detail}`);
  }
}

function resendConfigured(env: Env) {
  return Boolean(env.RESEND_API_KEY && env.REGISTRATION_FROM_EMAIL);
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  return json({
    ok: true,
    message: "Event registration endpoint is live.",
    configured: {
      storage: Boolean(env.SANITY_WRITE_TOKEN),
      resend: resendConfigured(env),
      fromEmail: Boolean(env.REGISTRATION_FROM_EMAIL),
      secretariatEmail: Boolean(env.SECRETARIAT_EMAIL)
    }
  });
};

function eventTitleForLocale(locale: string) {
  const key = locale in CONFERENCE_TITLE ? locale : "en";
  return CONFERENCE_TITLE[key as keyof typeof CONFERENCE_TITLE];
}

function formatRegistrationSummary(registration: ReturnType<typeof createEventRegistration>, status: string) {
  const fullName = `${registration.givenName} ${registration.familyName}`.trim();
  return [
    `Event: ${eventTitleForLocale(registration.locale)}`,
    `Status: ${status}`,
    `Name: ${fullName}`,
    `Email: ${registration.email}`,
    `Phone: ${registration.phone}`,
    `Passport: ${registration.passportNumber}`,
    `Nationality: ${registration.nationality}`,
    `Category: ${registration.participantCategory}`,
    `Volunteer: ${registration.volunteer ? "Yes" : "No"}`,
    `Attendance: ${registration.attendanceDates}`,
    `Emergency contact: ${registration.emergencyContactName} (${registration.emergencyContactPhone})`,
    registration.specialRequirements ? `Special requirements: ${registration.specialRequirements}` : "",
    registration.messageToCommittee ? `Message: ${registration.messageToCommittee}` : ""
  ]
    .filter(Boolean)
    .join("\n");
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.SANITY_WRITE_TOKEN) {
    return json({ ok: false, message: "Registration storage is not configured." }, { status: 503 });
  }

  let registration;
  try {
    registration = createEventRegistration(await readPayload(request));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request.";
    return json({ ok: false, message }, { status: 400 });
  }

  try {
    const status = "confirmed";
    const submittedAt = new Date().toISOString();
    const documentId = crypto.randomUUID();
    const document = toSanityDocument(registration, {
      status,
      submittedAt,
      confirmationEmailSent: false
    });

    await sanityMutate(env, [{ create: { _id: documentId, ...document } }]);

    let confirmationEmailSent = false;
    const fullName = `${registration.givenName} ${registration.familyName}`.trim();
    const emailLocale = registration.locale in CONFERENCE_TITLE ? registration.locale : "en";
    const participantEmail = buildParticipantConfirmationEmail(emailLocale);

    try {
      await sendResendEmail(env, {
        to: registration.email,
        subject: participantEmail.subject,
        text: participantEmail.text,
        replyTo: env.SECRETARIAT_EMAIL
      });
      confirmationEmailSent = true;
    } catch {
      confirmationEmailSent = false;
    }

    if (env.SECRETARIAT_EMAIL) {
      try {
        await sendResendEmail(env, {
          to: env.SECRETARIAT_EMAIL,
          subject: `[World Peace Forum Registration] ${status.toUpperCase()} — ${fullName}`,
          text: [
            "A new conference registration was submitted.",
            "",
            formatRegistrationSummary(registration, status),
            "",
            `Sanity document ID: ${documentId}`
          ].join("\n"),
          replyTo: registration.email
        });
      } catch {
        // Registration is stored even if the internal alert fails.
      }
    }

    if (confirmationEmailSent) {
      await sanityMutate(env, [
        {
          patch: {
            id: documentId,
            set: { confirmationEmailSent: true }
          }
        }
      ]);
    }

    const locale = registration.locale in CONFERENCE_TITLE ? registration.locale : "en";
    const responseMessages: Record<string, { withEmail: string; withoutEmail: string }> = {
      zh: {
        withEmail: "感謝您。您的報名已成功確認。確認信已寄至您的電郵。",
        withoutEmail: "感謝您。您的報名已成功確認。我們未能自動寄出確認信，秘書處將與您聯繫。"
      },
      en: {
        withEmail: "Registration confirmed. A confirmation email has been sent to your address.",
        withoutEmail:
          "Registration confirmed. We could not send a confirmation email automatically; the Secretariat will contact you."
      },
      fr: {
        withEmail: "Inscription confirmée. Un e-mail de confirmation vous a été envoyé.",
        withoutEmail:
          "Inscription confirmée. Nous n'avons pas pu envoyer d'e-mail de confirmation automatiquement ; le Secrétariat vous contactera."
      }
    };
    const copy = responseMessages[locale] || responseMessages.en;

    return json({
      ok: true,
      status,
      emailSent: confirmationEmailSent,
      message: confirmationEmailSent ? copy.withEmail : copy.withoutEmail
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to complete registration.";
    return json({ ok: false, message }, { status: 502 });
  }
};

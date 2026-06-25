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
  EVENT_REGISTRATION_CAPACITY?: string;
};

const DEFAULT_CAPACITY = 500;

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
    const duplicate = await sanityQuery<{ _id: string } | null>(
      env,
      `*[_type == "eventRegistration" && eventKey == $eventKey && lower(email) == lower($email)][0]{ _id }`,
      { eventKey: registration.eventKey || SYMPOSIUM_EVENT_KEY, email: registration.email }
    );

    if (duplicate?._id) {
      return json(
        { ok: false, message: "A registration with this email address already exists for this event." },
        { status: 409 }
      );
    }

    const confirmedCount = await sanityQuery<number>(
      env,
      `count(*[_type == "eventRegistration" && eventKey == $eventKey && status == "confirmed"])`,
      { eventKey: registration.eventKey || SYMPOSIUM_EVENT_KEY }
    );

    const capacity = Number(env.EVENT_REGISTRATION_CAPACITY || DEFAULT_CAPACITY);
    const status = confirmedCount >= capacity ? "waitlist" : "pending";
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
    const participantEmail = buildParticipantConfirmationEmail(emailLocale, status);

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
    const responseMessages: Record<
      string,
      { waitlistWithEmail: string; waitlistWithoutEmail: string; pendingWithEmail: string; pendingWithoutEmail: string }
    > = {
      zh: {
        waitlistWithEmail: "感謝您。論壇確認名額已滿，您的報名已列入候補。確認信已寄至您的電郵。",
        waitlistWithoutEmail:
          "感謝您。論壇確認名額已滿，您的報名已列入候補。我們未能自動寄出確認信，秘書處將與您聯繫。",
        pendingWithEmail: "感謝您。您的報名已成功確認。確認信已寄至您的電郵。",
        pendingWithoutEmail:
          "感謝您。您的報名已成功確認。我們未能自動寄出確認信，秘書處將與您聯繫。"
      },
      en: {
        waitlistWithEmail:
          "Registration received. You have been placed on the waitlist and will be contacted if a place becomes available. A confirmation email has been sent to your address.",
        waitlistWithoutEmail:
          "Registration received. You have been placed on the waitlist. We could not send a confirmation email automatically; the Secretariat will contact you.",
        pendingWithEmail: "Registration confirmed. A confirmation email has been sent to your address.",
        pendingWithoutEmail:
          "Registration confirmed. We could not send a confirmation email automatically; the Secretariat will contact you."
      },
      fr: {
        waitlistWithEmail:
          "Inscription reçue. Vous avez été placé(e) sur liste d'attente. Un e-mail de confirmation vous a été envoyé.",
        waitlistWithoutEmail:
          "Inscription reçue. Vous avez été placé(e) sur liste d'attente. Nous n'avons pas pu envoyer d'e-mail de confirmation automatiquement ; le Secrétariat vous contactera.",
        pendingWithEmail: "Inscription confirmée. Un e-mail de confirmation vous a été envoyé.",
        pendingWithoutEmail:
          "Inscription confirmée. Nous n'avons pas pu envoyer d'e-mail de confirmation automatiquement ; le Secrétariat vous contactera."
      }
    };
    const copy = responseMessages[locale] || responseMessages.en;

    return json({
      ok: true,
      status,
      emailSent: confirmationEmailSent,
      message:
        status === "waitlist"
          ? confirmationEmailSent
            ? copy.waitlistWithEmail
            : copy.waitlistWithoutEmail
          : confirmationEmailSent
            ? copy.pendingWithEmail
            : copy.pendingWithoutEmail
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to complete registration.";
    return json({ ok: false, message }, { status: 502 });
  }
};

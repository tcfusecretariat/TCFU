import {
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
    const participantSubject =
      status === "waitlist"
        ? "Registration received — waitlist | World Peace Forum 2026"
        : "Registration received | World Peace Forum 2026";
    const participantIntro =
      status === "waitlist"
        ? "Thank you for registering. The conference has reached its confirmed capacity, so your registration has been placed on the waitlist. The Secretariat will contact you if a place becomes available."
        : `Thank you for registering for ${CONFERENCE_TITLE.en}. Your registration has been received and is pending review by the Secretariat.`;

    try {
      await sendResendEmail(env, {
        to: registration.email,
        subject: participantSubject,
        text: [
          `Dear ${fullName},`,
          "",
          participantIntro,
          "",
          "Event details",
          eventTitleForLocale(registration.locale),
          "Dates: 1–2 October 2026",
          "Venue: UNESCO Headquarters, Paris",
          "",
          formatRegistrationSummary(registration, status),
          "",
          "Traditional Culture Foundation at UNESCO",
          "tcfu.secretariat@gmail.com"
        ].join("\n"),
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

    const waitlistMessage =
      "Registration received. You have been placed on the waitlist and will be contacted if a place becomes available.";
    const pendingWithEmail =
      "Registration received. A confirmation email has been sent to your address.";
    const pendingWithoutEmail =
      "Registration received and is pending review. We could not send a confirmation email automatically; the Secretariat will contact you.";

    return json({
      ok: true,
      status,
      emailSent: confirmationEmailSent,
      message:
        status === "waitlist"
          ? confirmationEmailSent
            ? `${waitlistMessage} A confirmation email has been sent to your address.`
            : waitlistMessage
          : confirmationEmailSent
            ? pendingWithEmail
            : pendingWithoutEmail
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to complete registration.";
    return json({ ok: false, message }, { status: 502 });
  }
};

type Env = {
  CONTACT_SUBMISSIONS?: KVNamespace;
};

function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...init.headers
    }
  });
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const formData = await request.formData();
  const submission = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    subject: String(formData.get("subject") || "").trim(),
    message: String(formData.get("message") || "").trim(),
    consent: formData.get("gdpr-consent") === "on"
  };

  if (!submission.name || !submission.email || !submission.message || !submission.consent) {
    return json({ ok: false, message: "Missing required fields." }, { status: 400 });
  }

  if (!env.CONTACT_SUBMISSIONS) {
    return json({ ok: false, message: "Contact storage is not configured." }, { status: 500 });
  }

  await env.CONTACT_SUBMISSIONS.put(submission.id, JSON.stringify(submission), {
    metadata: { createdAt: submission.createdAt, email: submission.email }
  });

  return json({ ok: true, message: "Message received." });
};

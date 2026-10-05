import { REGISTRATION_CLOSED_MESSAGE, REGISTRATION_OPEN } from "../../shared/event-registration.mjs";

function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { "Content-Type": "application/json; charset=utf-8", ...init.headers }
  });
}

async function readLocale(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const payload = (await request.json()) as Record<string, unknown>;
      return typeof payload.locale === "string" ? payload.locale : "en";
    }
    const formData = await request.formData();
    const locale = formData.get("locale");
    return typeof locale === "string" ? locale : "en";
  } catch {
    return "en";
  }
}

function closedMessage(locale?: string) {
  const key = locale && locale in REGISTRATION_CLOSED_MESSAGE ? locale : "en";
  return REGISTRATION_CLOSED_MESSAGE[key as keyof typeof REGISTRATION_CLOSED_MESSAGE];
}

function closedResponse(locale?: string) {
  return json({ ok: false, open: REGISTRATION_OPEN, message: closedMessage(locale) }, { status: 403 });
}

export const onRequestGet: PagesFunction = async () => {
  return json({
    ok: false,
    open: REGISTRATION_OPEN,
    message: closedMessage()
  });
};

export const onRequestPost: PagesFunction = async ({ request }) => {
  const locale = await readLocale(request);
  return closedResponse(locale);
};

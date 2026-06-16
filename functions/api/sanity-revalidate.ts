type Env = {
  SANITY_REVALIDATE_SECRET?: string;
  CLOUDFLARE_DEPLOY_HOOK_URL?: string;
};

function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...init.headers
    }
  });
}

// Health check: GET /api/sanity-revalidate
// Lets you confirm the endpoint is deployed and whether the env vars are set,
// WITHOUT exposing any secret value.
export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  return json({
    ok: true,
    message: "Sanity revalidate endpoint is live. Send a POST from a Sanity webhook to trigger a rebuild.",
    configured: {
      secret: Boolean(env.SANITY_REVALIDATE_SECRET),
      deployHook: Boolean(env.CLOUDFLARE_DEPLOY_HOOK_URL)
    }
  });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // Accept the shared secret from the webhook header or a query string,
  // so it works with either Sanity webhook headers or a plain URL secret.
  const url = new URL(request.url);
  const providedSecret =
    request.headers.get("sanity-webhook-secret") ||
    request.headers.get("x-webhook-secret") ||
    url.searchParams.get("secret");

  if (!env.SANITY_REVALIDATE_SECRET) {
    return json(
      { ok: false, message: "SANITY_REVALIDATE_SECRET is not set in Cloudflare Pages environment variables." },
      { status: 500 }
    );
  }

  if (providedSecret !== env.SANITY_REVALIDATE_SECRET) {
    return json({ ok: false, message: "Unauthorized: missing or invalid webhook secret." }, { status: 401 });
  }

  if (!env.CLOUDFLARE_DEPLOY_HOOK_URL) {
    return json(
      { ok: false, message: "CLOUDFLARE_DEPLOY_HOOK_URL is not set in Cloudflare Pages environment variables." },
      { status: 500 }
    );
  }

  try {
    const deployResponse = await fetch(env.CLOUDFLARE_DEPLOY_HOOK_URL, { method: "POST" });
    if (!deployResponse.ok) {
      return json(
        { ok: false, message: `Deploy hook responded with ${deployResponse.status}.` },
        { status: 502 }
      );
    }
  } catch (error) {
    return json(
      { ok: false, message: `Failed to call deploy hook: ${error instanceof Error ? error.message : "unknown error"}` },
      { status: 502 }
    );
  }

  return json({ ok: true, message: "Cloudflare rebuild triggered. The site will update in 1–3 minutes." });
};

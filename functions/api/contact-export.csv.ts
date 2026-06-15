type Env = {
  CONTACT_SUBMISSIONS?: KVNamespace;
  CONTACT_EXPORT_TOKEN?: string;
};

function csvCell(value: unknown) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!env.CONTACT_EXPORT_TOKEN || token !== env.CONTACT_EXPORT_TOKEN) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!env.CONTACT_SUBMISSIONS) {
    return new Response("CONTACT_SUBMISSIONS KV is not configured.", { status: 500 });
  }

  const rows: unknown[][] = [["createdAt", "name", "email", "subject", "message", "consent"]];
  let cursor: string | undefined;

  do {
    const page = await env.CONTACT_SUBMISSIONS.list({ cursor });
    for (const key of page.keys) {
      const value = await env.CONTACT_SUBMISSIONS.get(key.name, "json") as Record<string, unknown> | null;
      if (value) rows.push([value.createdAt, value.name, value.email, value.subject, value.message, value.consent]);
    }
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);

  return new Response(rows.map((row) => row.map(csvCell).join(",")).join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="contact-submissions.csv"`
    }
  });
};

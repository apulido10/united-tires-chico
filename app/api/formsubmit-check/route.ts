// TEMPORARY diagnostic — delete once the contact form is confirmed working.
// Runs the same request the contact form makes and returns FormSubmit's raw
// reply, so a production failure can be read without dashboard log access.
// Guarded by a token so it isn't a public email-sending endpoint.

const TOKEN = "utw-diag-2026";
const SITE = "https://www.unitedtiresandwheels.com";
const TARGET = process.env.CONTACT_FORM_EMAIL ?? "497c16e3c806f878e2ef29e9d75c9d4e";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("token") !== TOKEN) {
    return new Response("Not found", { status: 404 });
  }

  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(TARGET)}`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: SITE,
        Referer: `${SITE}/contact`,
      },
      body: JSON.stringify({
        Name: "Production Diagnostic",
        Message: "Automated check — safe to ignore.",
        _subject: "Production diagnostic",
        _template: "table",
        _captcha: "false",
      }),
      signal: AbortSignal.timeout(15_000),
    });

    const text = await res.text();

    return Response.json({
      endpoint,
      status: res.status,
      contentType: res.headers.get("content-type"),
      body: text.slice(0, 2000),
    });
  } catch (err) {
    return Response.json({
      endpoint,
      threw: true,
      name: err instanceof Error ? err.name : typeof err,
      message: err instanceof Error ? err.message : String(err),
      cause: err instanceof Error ? String(err.cause ?? "") : "",
    });
  }
}

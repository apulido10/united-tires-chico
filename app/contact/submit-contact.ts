// Runs in the browser, not on the server. FormSubmit is behind Cloudflare,
// which serves a 403 challenge page to requests from datacenter IPs — so the
// same call made from a Vercel function is blocked while a real visitor's
// browser passes straight through. Submitting client-side also means the
// browser supplies Origin and Referer itself, which FormSubmit requires.

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

const ENDPOINT = "https://formsubmit.co/ajax/497c16e3c806f878e2ef29e9d75c9d4e";

const PHONE_FALLBACK = "Please call (530) 809-1976.";

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  if (formData.get("company")) {
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const vehicle = String(formData.get("vehicle") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !message) {
    return { status: "error", message: "Name and message are required." };
  }
  if (!phone && !email) {
    return { status: "error", message: "Give us a phone or email so we can reply." };
  }
  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    return { status: "error", message: "That email address looks off — mind double-checking?" };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Name: name,
        Phone: phone || "—",
        Email: email || "—",
        Vehicle: vehicle || "—",
        Message: message,
        _subject: `Quote request from ${name}`,
        _template: "table",
        // Replying to the notification reaches the customer directly.
        _replyto: email || undefined,
        // Required for the AJAX endpoint — the captcha page can't be shown here.
        _captcha: "false",
      }),
      signal: AbortSignal.timeout(15_000),
    });

    // FormSubmit answers 200 with success:"false" on rejection, so the body
    // has to be checked rather than the status alone.
    const body = await res.json().catch(() => null);
    if (!res.ok || String(body?.success) !== "true") {
      console.error("Contact form: FormSubmit rejected the submission", res.status, body);
      return {
        status: "error",
        message: `Something went wrong sending your message. ${PHONE_FALLBACK}`,
      };
    }

    return { status: "success" };
  } catch (err) {
    console.error("Contact form: request to FormSubmit failed", err);
    return {
      status: "error",
      message: `Something went wrong sending your message. ${PHONE_FALLBACK}`,
    };
  }
}

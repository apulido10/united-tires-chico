"use server";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

// FormSubmit relays the form to the shop inbox — no SMTP credentials needed.
// This is FormSubmit's alias for that inbox rather than the address itself, so
// the destination isn't sitting in the request for scrapers to pick up.
// Set CONTACT_FORM_EMAIL to a plain address to test against a different inbox;
// any new address has to confirm its own activation email before it receives.
const TARGET = process.env.CONTACT_FORM_EMAIL ?? "497c16e3c806f878e2ef29e9d75c9d4e";
const ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(TARGET)}`;

// This request is made server-side, so it carries no Origin/Referer of its own.
// Without them FormSubmit assumes the form was opened as a local file and
// rejects the submission, so identify the site explicitly.
const SITE = "https://www.unitedtiresandwheels.com";

const PHONE_FALLBACK = "Please call (530) 809-1976.";

export async function sendContact(
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
        Origin: SITE,
        Referer: `${SITE}/contact`,
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

    const body = await res.json().catch(() => null);
    const ok = res.ok && String(body?.success) === "true";

    if (!ok) {
      // Until the recipient clicks FormSubmit's activation link, every
      // submission bounces with this. It resolves itself once, on setup.
      if (String(body?.message ?? "").toLowerCase().includes("activation")) {
        console.error(
          `Contact form: ${TARGET} has not activated FormSubmit yet. ` +
            `An 'Activate Form' link was emailed to that inbox — click it, then resubmit.`,
        );
      } else {
        console.error("Contact form: FormSubmit rejected the submission", res.status, body);
      }
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

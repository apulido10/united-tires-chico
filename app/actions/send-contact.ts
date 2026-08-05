"use server";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

// FormSubmit relays the form to this inbox — no SMTP credentials needed.
// The address must confirm the one-time activation email before the first
// real submission goes through. Override locally to test against your own inbox.
const RECIPIENT = process.env.CONTACT_FORM_EMAIL ?? "utwchico@gmail.com";
const ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(RECIPIENT)}`;

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

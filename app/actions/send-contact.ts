"use server";

import nodemailer from "nodemailer";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );

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

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.MAIL_TO;

  if (!user || !pass || !to) {
    console.error("Contact form: missing env vars (GMAIL_USER / GMAIL_APP_PASSWORD / MAIL_TO)");
    return {
      status: "error",
      message: "Email isn't set up yet. Please call us at (530) 809-1976.",
    };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const html = `
    <h2 style="margin:0 0 12px;font-family:system-ui,sans-serif;">New quote request</h2>
    <table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px;">
      <tr><td style="padding:4px 12px 4px 0;color:#666;">Name</td><td>${escapeHtml(name)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666;">Phone</td><td>${escapeHtml(phone) || "—"}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666;">Email</td><td>${escapeHtml(email) || "—"}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666;">Vehicle</td><td>${escapeHtml(vehicle) || "—"}</td></tr>
    </table>
    <p style="margin:16px 0 4px;color:#666;font-family:system-ui,sans-serif;font-size:14px;">Message</p>
    <pre style="white-space:pre-wrap;font-family:system-ui,sans-serif;font-size:14px;margin:0;">${escapeHtml(message)}</pre>
  `;

  const text =
    `New quote request\n\n` +
    `Name: ${name}\n` +
    `Phone: ${phone || "—"}\n` +
    `Email: ${email || "—"}\n` +
    `Vehicle: ${vehicle || "—"}\n\n` +
    `Message:\n${message}\n`;

  try {
    await transporter.sendMail({
      from: `"United Tires and Wheels" <${user}>`,
      to,
      replyTo: email || undefined,
      subject: `Quote request from ${name}`,
      text,
      html,
    });
    return { status: "success" };
  } catch (err) {
    console.error("Contact form: sendMail failed", err);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please call (530) 809-1976.",
    };
  }
}

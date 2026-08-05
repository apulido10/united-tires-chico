"use client";

import Link from "next/link";
import { useActionState, useRef, useEffect } from "react";
import { submitContact, type ContactState } from "./submit-contact";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={action} className="mt-8" noValidate>
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" placeholder="Jane Doe" required />
        <Field label="Phone" name="phone" placeholder="(530) 555-0123" type="tel" />
        <Field
          label="Email"
          name="email"
          placeholder="jane@example.com"
          type="email"
          className="sm:col-span-2"
        />
        <Field
          label="Vehicle (year, make, model)"
          name="vehicle"
          placeholder="2019 Toyota Tacoma"
          className="sm:col-span-2"
        />
        <label className="block sm:col-span-2">
          <span className="text-xs text-[color:var(--muted)]">How can we help?</span>
          <textarea
            name="message"
            rows={5}
            required
            placeholder="Quote for 4 all-terrains, size 265/70R17."
            className="mt-1 w-full rounded-md border border-[color:var(--border)] bg-[color:var(--background)] px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-[color:var(--brand)]"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex items-center rounded-md bg-[color:var(--brand)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[color:var(--brand-strong)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send"}
      </button>

      {state.status === "success" && (
        <p
          role="status"
          className="mt-4 rounded-md border border-[color:var(--brand)]/40 bg-[color:var(--brand)]/10 px-4 py-3 text-sm text-white"
        >
          Thanks — we got it. We&rsquo;ll reply during shop hours.
        </p>
      )}
      {state.status === "error" && (
        <p
          role="alert"
          className="mt-4 rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-white"
        >
          {state.message}
        </p>
      )}

      <p className="mt-4 text-xs leading-5 text-[color:var(--muted)]">
        By sending this, you agree we may contact you about your request. See
        our{" "}
        <Link href="/privacy" className="text-white underline-offset-4 hover:underline">
          Privacy Policy
        </Link>
        .
      </p>

      <p className="mt-3 text-xs text-[color:var(--muted)]">
        Prefer to text?{" "}
        <a
          href="sms:+15308091976"
          className="text-white underline-offset-4 hover:underline"
        >
          (530) 809-1976
        </a>
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  className = "",
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  className?: string;
  required?: boolean;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs text-[color:var(--muted)]">
        {label}
        {required && <span aria-hidden className="ml-1 text-[color:var(--brand)]">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md border border-[color:var(--border)] bg-[color:var(--background)] px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-[color:var(--brand)]"
      />
    </label>
  );
}

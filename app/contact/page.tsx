import type { Metadata } from "next";
import Image from "next/image";
import shopPic from "../../public/Shoppic.jpg";
import { SectionKicker } from "../components/SectionKicker";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact · United Tires and Wheels",
  description: "Get a quote or find the shop. Chico, CA.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={shopPic}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            placeholder="blur"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-[color:var(--background)] via-[color:var(--background)]/80 to-[color:var(--background)]/20"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[color:var(--background)] via-transparent to-transparent"
          />
        </div>
        <div className="mx-auto max-w-6xl px-4 pt-14 pb-20 sm:px-6 md:pt-28 md:pb-36">
          <SectionKicker>Contact</SectionKicker>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Come by or drop us a line.
          </h1>
          <p className="mt-5 max-w-xl text-base text-zinc-300 sm:text-lg">
            Reply within an hour during shop hours. Or just walk in — no
            appointment needed for tires and flats.
          </p>
        </div>
      </section>

      <section className="border-t border-[color:var(--border)] bg-[color:var(--surface)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1.1fr_1fr] md:gap-16 md:py-20">
          <div>
            <SectionKicker>Get a quote</SectionKicker>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Send us the details
            </h2>
            <ContactForm />
          </div>

          <aside className="space-y-8">
            <div className="rounded-md border border-[color:var(--border)] bg-[color:var(--background)] p-6">
              <div className="h-px w-8 bg-[color:var(--brand)]" />
              <h3 className="mt-4 text-xs font-medium uppercase tracking-widest text-[color:var(--muted)]">
                Shop
              </h3>
              <div className="mt-3 text-lg text-white">United Tires and Wheels</div>
              <div className="text-sm text-[color:var(--muted)]">2246 Esplanade</div>
              <div className="text-sm text-[color:var(--muted)]">Chico, CA 95926</div>
              <a
                href="https://maps.google.com/?q=2246+Esplanade+Chico+CA+95926"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm text-[color:var(--brand)] hover:underline"
              >
                Get directions →
              </a>
            </div>

            <div className="rounded-md border border-[color:var(--border)] bg-[color:var(--background)] p-6">
              <div className="h-px w-8 bg-[color:var(--brand)]" />
              <h3 className="mt-4 text-xs font-medium uppercase tracking-widest text-[color:var(--muted)]">
                Talk to us
              </h3>
              <a
                href="tel:+15308091976"
                className="mt-3 block text-2xl font-semibold text-white hover:text-[color:var(--brand)]"
              >
                (530) 809-1976
              </a>
              <a
                href="mailto:hello@unitedtireschico.com"
                className="mt-1 block text-sm text-[color:var(--muted)] hover:text-white"
              >
                hello@unitedtireschico.com
              </a>
            </div>

            <div className="rounded-md border border-[color:var(--border)] bg-[color:var(--background)] p-6">
              <div className="h-px w-8 bg-[color:var(--brand)]" />
              <h3 className="mt-4 text-xs font-medium uppercase tracking-widest text-[color:var(--muted)]">
                Hours
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-[color:var(--muted)]">
                <li className="flex justify-between gap-8">
                  <span>Mon – Fri</span>
                  <span className="text-white">8:30 AM – 5 PM</span>
                </li>
                <li className="flex justify-between gap-8">
                  <span>Saturday</span>
                  <span className="text-white">8:30 AM – 2 PM</span>
                </li>
                <li className="flex justify-between gap-8">
                  <span>Sunday</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

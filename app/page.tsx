import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import rimAndBanner from "../public/rimandbanner.jpg";
import rims from "../public/rims.jpg";
import shopPic from "../public/Shoppic.jpg";
import tires from "../public/tires.jpg";
import { BrandsMarquee } from "./components/BrandsMarquee";
import { SectionKicker } from "./components/SectionKicker";
import { ShopStatus } from "./components/ShopStatus";
import { HOURS_ROWS, openingHoursSpecification } from "./lib/hours";
const services = [
  { title: "New & used tires", body: "Passenger, truck, SUV, and trailer. All major brands." },
  { title: "Alignment", body: "Four-wheel with printed before/after specs." },
  { title: "Brake repair", body: "Pads, rotors, and fluid flush. We show you the parts first." },
  { title: "Suspension work", body: "Shocks, struts, control arms — driving straight again." },
  { title: "Lube & oil filter", body: "Conventional, synthetic blend, or full synthetic." },
  { title: "Engine diagnostics", body: "Check-engine light? We'll pull codes and explain them." },
  { title: "Belts & hoses", body: "Inspection and replacement before they leave you stranded." },
  { title: "Lift kits", body: "Leveling to full lifts. Wheels, tires, and alignment all in-house." },
];

const brands = [
  "Michelin", "BFGoodrich", "Goodyear", "Continental",
  "Bridgestone", "Firestone", "Cooper", "Toyo",
  "Falken", "Yokohama", "Nitto", "Hankook",
  "Kumho", "General", "Nexen", "Pirelli",
];

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const SITE = "https://unitedtireschico.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": `${SITE}/#shop`,
  name: "United Tires and Wheels",
  url: SITE,
  image: `${SITE}/unitedlogo.png`,
  logo: `${SITE}/unitedlogo.png`,
  description:
    "New and used tires, wheels, alignment, brakes, suspension, and oil changes in Chico, CA. Straight prices, walk-ins welcome.",
  telephone: "+15308091976",
  email: "hello@unitedtireschico.com",
  hasMap: "https://maps.google.com/?q=2246+Esplanade+Chico+CA+95926",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2246 Esplanade",
    addressLocality: "Chico",
    addressRegion: "CA",
    postalCode: "95926",
    addressCountry: "US",
  },
  openingHoursSpecification,
  areaServed: ["Chico", "Paradise", "Oroville", "Durham", "Butte County"],
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.body },
    })),
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
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
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-24 sm:px-6 md:pt-36 md:pb-48">
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand)]" />
            <p className="text-xs font-medium uppercase tracking-widest text-[color:var(--brand)] sm:text-sm">
              <ShopStatus /> · Chico, CA
            </p>
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-7xl">
            Tires, wheels, and straight prices.
          </h1>
          <p className="mt-5 max-w-xl text-base text-zinc-300 sm:text-lg">
            New and used tires, alignment, brakes, suspension, and oil changes in
            Chico. We quote before we start. No surprises when you pay.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md bg-[color:var(--brand)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[color:var(--brand-strong)]"
            >
              Get a quote
            </Link>
            <a
              href="tel:+15308091976"
              className="inline-flex items-center rounded-md border border-[color:var(--border)] bg-[color:var(--background)]/50 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/[0.05]"
            >
              (530) 809-1976
            </a>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="scroll-mt-24 border-t border-[color:var(--border)] bg-[color:var(--surface)]"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <SectionKicker>Shop</SectionKicker>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
            What we do
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-[color:var(--muted)] sm:text-base">
            One shop for tires, alignment, brakes, suspension, oil changes, and
            more. Ask us anything — if we can't help, we know who can.
          </p>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-md border border-[color:var(--border)] bg-[color:var(--border)] sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <li
                key={s.title}
                className="group bg-[color:var(--background)] p-6 transition-colors hover:bg-[color:var(--surface)]"
              >
                <div className="h-px w-8 bg-[color:var(--brand)] transition-all group-hover:w-16" />
                <h3 className="mt-4 text-base font-medium text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                  {s.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="tires"
        className="scroll-mt-24 border-t border-[color:var(--border)]"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-16">
            <div>
              <SectionKicker>Tires</SectionKicker>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
                On the shelf, or here tomorrow.
              </h2>
              <p className="mt-5 text-base text-[color:var(--muted)]">
                Hundreds of common sizes in stock for cars, trucks, and SUVs.
                Almost anything else in a day. Not sure what you need? Text a
                photo of the sidewall and we&rsquo;ll tell you what fits.
              </p>
              <p className="mt-4 text-base text-[color:var(--muted)]">
                Used sets are inspected and priced honestly. New sets get free
                rotations for the life of the tread.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="sms:+15308091976"
                  className="inline-flex items-center rounded-md bg-[color:var(--brand)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[color:var(--brand-strong)]"
                >
                  Text a photo
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-md border border-[color:var(--border)] px-5 py-2.5 text-sm font-medium text-white hover:bg-white/[0.05]"
                >
                  Get a quote
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-md border border-[color:var(--border)]">
                <Image
                  src={tires}
                  alt="Rows of new tires in the shop"
                  fill
                  sizes="(min-width: 768px) 22vw, 45vw"
                  className="object-cover"
                  placeholder="blur"
                />
              </div>
              <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-md border border-[color:var(--border)]">
                <Image
                  src={rims}
                  alt="Alloy and chrome wheels in the showroom"
                  fill
                  sizes="(min-width: 768px) 22vw, 45vw"
                  className="object-cover"
                  placeholder="blur"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--border)]">
        <div className="py-10 md:py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionKicker>Brands we carry</SectionKicker>
          </div>
          <div className="mt-8">
            <BrandsMarquee brands={brands} />
          </div>
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="mt-6 text-sm text-[color:var(--muted)]">
              and more — ask us
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--border)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-16">
            <div>
              <SectionKicker>Why</SectionKicker>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
                Why people keep coming back
              </h2>
              <div className="mt-8 space-y-5 text-[color:var(--muted)]">
                <p>
                  Every job is quoted before we start. If something changes mid-way,
                  we call before we touch it.
                </p>
                <p>
                  Tires bought here get free rotations for the life of the tread.
                  Nationwide road-hazard is available on new sets.
                </p>
                <p>
                  Most 4-tire installs are done in half an hour. Come sit inside,
                  coffee&rsquo;s on.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-md border border-[color:var(--border)]">
                <Image
                  src={rimAndBanner}
                  alt="United Tires and Wheels banner with a black off-road wheel"
                  fill
                  sizes="(min-width: 768px) 22vw, 45vw"
                  className="object-cover"
                  placeholder="blur"
                />
              </div>
              <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-md border border-[color:var(--border)]">
                <Image
                  src={shopPic}
                  alt="United Tires and Wheels storefront in Chico"
                  fill
                  sizes="(min-width: 768px) 22vw, 45vw"
                  className="object-cover"
                  placeholder="blur"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="visit"
        className="scroll-mt-24 border-t border-[color:var(--border)] bg-[color:var(--surface)]"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <SectionKicker>Visit</SectionKicker>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
            Find the shop
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-md border border-[color:var(--border)] bg-[color:var(--background)] p-6">
              <div className="h-px w-8 bg-[color:var(--brand)]" />
              <h3 className="mt-4 text-xs font-medium uppercase tracking-widest text-[color:var(--muted)]">
                Address
              </h3>
              <address className="mt-3 not-italic text-lg text-white">
                United Tires and Wheels
                <div className="mt-1 text-sm text-[color:var(--muted)]">2246 Esplanade</div>
                <div className="text-sm text-[color:var(--muted)]">Chico, CA 95926</div>
              </address>
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
                href="sms:+15308091976"
                className="mt-1 block text-sm text-[color:var(--muted)] hover:text-white"
              >
                Text us a sidewall photo
              </a>
            </div>
            <div className="rounded-md border border-[color:var(--border)] bg-[color:var(--background)] p-6">
              <div className="h-px w-8 bg-[color:var(--brand)]" />
              <h3 className="mt-4 text-xs font-medium uppercase tracking-widest text-[color:var(--muted)]">
                Hours
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-[color:var(--muted)]">
                {HOURS_ROWS.map((row) => (
                  <li key={row.label} className="flex justify-between gap-6">
                    <span>{row.label}</span>
                    <span className={row.closed ? undefined : "text-white"}>
                      {row.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 overflow-hidden rounded-md border border-[color:var(--border)]">
            <iframe
              title="Map to United Tires and Wheels — 2246 Esplanade, Chico, CA"
              src="https://www.google.com/maps?q=2246+Esplanade+Chico+CA+95926&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-72 w-full border-0 md:h-96"
            />
          </div>
          <p className="mt-8 max-w-2xl text-sm text-[color:var(--muted)]">
            Serving Chico, Paradise, Oroville, Durham, and the greater Butte County
            area. Walk-ins welcome for tires and flat repair — no appointment needed.
          </p>
        </div>
      </section>
    </>
  );
}

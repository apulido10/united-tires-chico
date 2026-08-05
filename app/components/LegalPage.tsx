import { SectionKicker } from "./SectionKicker";

// Shared chrome for /privacy and /terms so the two stay visually identical.
export function LegalPage({
  kicker,
  title,
  updated,
  children,
}: {
  kicker: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="border-b border-[color:var(--border)] bg-[color:var(--surface)]">
        <div className="mx-auto max-w-3xl px-4 pt-14 pb-12 sm:px-6 md:pt-24 md:pb-16">
          <SectionKicker>{kicker}</SectionKicker>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-[color:var(--muted)]">
            Last updated {updated}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">{children}</div>
    </>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="text-xl font-semibold tracking-tight text-white">{heading}</h2>
      <div className="mt-3 space-y-4 text-sm leading-7 text-[color:var(--muted)]">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2 pl-5">
      {items.map((item, i) => (
        <li key={i} className="list-disc marker:text-[color:var(--brand)]">
          {item}
        </li>
      ))}
    </ul>
  );
}

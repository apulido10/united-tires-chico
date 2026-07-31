import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[color:var(--border)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="text-lg font-semibold text-white">United Tires and Wheels</div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[color:var(--muted)]">
            New and used tires, wheels, alignment, brakes, suspension, and oil changes in Chico, CA.
          </p>
        </div>
        <div className="text-sm text-[color:var(--muted)]">
          <div className="text-white">2246 Esplanade</div>
          <div>Chico, CA 95926</div>
          <a
            href="tel:+15308091976"
            className="mt-3 block text-white hover:text-[color:var(--brand)]"
          >
            (530) 809-1976
          </a>
        </div>
        <div className="text-sm text-[color:var(--muted)]">
          <div className="flex justify-between">
            <span>Mon – Fri</span>
            <span className="text-white">8:30 – 5</span>
          </div>
          <div className="flex justify-between">
            <span>Saturday</span>
            <span className="text-white">8:30 – 2</span>
          </div>
          <div className="flex justify-between">
            <span>Sunday</span>
            <span>Closed</span>
          </div>
        </div>
      </div>
      <div className="border-t border-[color:var(--border)]">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 px-6 py-5 text-xs text-[color:var(--muted)] md:flex-row">
          <p>© {new Date().getFullYear()} United Tires and Wheels.</p>
          <div className="flex gap-5">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/#services" className="hover:text-white">Services</Link>
            <Link href="/#visit" className="hover:text-white">Visit</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

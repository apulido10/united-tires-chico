import type { Metadata } from "next";
import Link from "next/link";
import { LegalList, LegalPage, LegalSection } from "../components/LegalPage";

// `title` is run through the root layout's "%s · United Tires and Wheels"
// template, so it must not repeat the shop name.
export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply to using unitedtiresandwheels.com, including how quotes and estimates work.",
  alternates: { canonical: "/terms" },
};

const UPDATED = "August 4, 2026";

export default function TermsPage() {
  return (
    <LegalPage kicker="Legal" title="Terms of Service" updated={UPDATED}>
      <LegalSection heading="Agreement">
        <p>
          These terms apply to unitedtiresandwheels.com, operated by United
          Tires and Wheels of 2246 Esplanade, Chico, CA 95926. By using the
          site, you agree to them. If you do not agree, please don&rsquo;t use
          the site — you are always welcome to call us at (530) 809-1976
          instead.
        </p>
      </LegalSection>

      <LegalSection heading="What this site is">
        <p>
          This site describes our shop and the services we offer, and lets you
          send us a message. You cannot buy anything, book a guaranteed
          appointment slot, or pay through this site.
        </p>
      </LegalSection>

      <LegalSection heading="Quotes and estimates">
        <p>
          This is the part worth reading closely. Any price, availability, or
          timeframe on this site or in a reply to your message is an{" "}
          <span className="text-white">estimate, not a binding offer</span>. We
          give real numbers only after we see the vehicle, because tire sizes,
          wear, rust, and hidden damage change the job.
        </p>
        <LegalList
          items={[
            "Prices, stock, and lead times change and may be out of date on this site.",
            "A quote given before inspection may change once we inspect the vehicle. We will tell you before doing work that costs more than quoted.",
            "The written work order or invoice you sign at the shop governs the actual work, not this website.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="Using the contact form">
        <p>
          Send us accurate information and use the form only to ask about
          vehicle service. Don&rsquo;t use it to send advertising, anything
          unlawful, or anything designed to harm the site. We handle what you
          send according to our{" "}
          <Link href="/privacy" className="text-white underline-offset-4 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <p>
          Submitting the form does not create a customer relationship or reserve
          your place in line, and we are not responsible if a message fails to
          reach us. If your vehicle is unsafe to drive or you need something
          urgently, call the shop.
        </p>
      </LegalSection>

      <LegalSection heading="Hours, location, and accuracy">
        <p>
          We keep hours, address, and service listings current, but the site may
          contain errors or become out of date, and we may be closed
          unexpectedly. Call ahead if you are making a special trip.
        </p>
      </LegalSection>

      <LegalSection heading="Our content">
        <p>
          The text, photographs, logo, and layout of this site belong to United
          Tires and Wheels, except for tire and vehicle brand names, which
          belong to their respective owners. Naming a brand means we sell or
          service it, not that the brand endorses us. Please don&rsquo;t copy
          the site&rsquo;s content for your own commercial use without asking.
        </p>
      </LegalSection>

      <LegalSection heading="Other websites">
        <p>
          Where we link to another site, such as a map or a manufacturer, we
          don&rsquo;t control it and aren&rsquo;t responsible for its content or
          its privacy practices.
        </p>
      </LegalSection>

      <LegalSection heading="Warranty and liability">
        <p>
          This website is provided as is. We make no warranty that it will be
          available without interruption or free of errors. To the extent the
          law allows, we are not liable for indirect or consequential losses
          arising from use of this website.
        </p>
        <p>
          Nothing here limits your rights regarding work we actually perform on
          your vehicle. Repairs and parts are covered by the terms on your
          invoice, by any applicable parts or manufacturer warranty, and by
          California law, including the Automotive Repair Act.
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          These terms are governed by the laws of the State of California, and
          any dispute about this website will be handled in the state or federal
          courts serving Butte County, California.
        </p>
      </LegalSection>

      <LegalSection heading="Changes">
        <p>
          We may update these terms. The current version always appears here
          with its date, and continuing to use the site means the updated terms
          apply.
        </p>
      </LegalSection>

      <LegalSection heading="Contact us">
        <p>
          United Tires and Wheels, 2246 Esplanade, Chico, CA 95926. Phone (530)
          809-1976. Email{" "}
          <a
            href="mailto:utwchico@gmail.com"
            className="text-white underline-offset-4 hover:underline"
          >
            utwchico@gmail.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { LegalList, LegalPage, LegalSection } from "../components/LegalPage";

// `title` is run through the root layout's "%s · United Tires and Wheels"
// template, so it must not repeat the shop name.
export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How United Tires and Wheels collects, uses, and shares information submitted through unitedtiresandwheels.com.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "August 4, 2026";

export default function PrivacyPage() {
  return (
    <LegalPage kicker="Legal" title="Privacy Policy" updated={UPDATED}>
      <LegalSection heading="Who we are">
        <p>
          United Tires and Wheels operates this website and the shop at 2246
          Esplanade, Chico, CA 95926. You can reach us at (530) 809-1976 or{" "}
          <a
            href="mailto:utwchico@gmail.com"
            className="text-white underline-offset-4 hover:underline"
          >
            utwchico@gmail.com
          </a>
          .
        </p>
        <p>
          This policy explains what we collect through this website, why, and
          who else sees it.
        </p>
      </LegalSection>

      <LegalSection heading="What you give us">
        <p>
          The contact form is the only place this site asks for personal
          information. When you submit it, we receive:
        </p>
        <LegalList
          items={[
            "Your name",
            "Your phone number and email address, whichever you choose to provide",
            "Your vehicle year, make, and model, if you enter it",
            "The message you write",
          ]}
        />
        <p>
          All of it is optional in the sense that you are never required to use
          the form — you can call or walk in instead.
        </p>
      </LegalSection>

      <LegalSection heading="What we collect automatically">
        <p>
          We use Vercel Analytics to count page views and see which pages are
          popular. It reports totals rather than individuals, does not set
          cookies, and does not follow you to other websites. Our hosting
          provider also keeps standard server logs, which include IP addresses,
          for security and troubleshooting.
        </p>
        <p>
          This site sets no advertising or tracking cookies, and we do not run
          ad networks or social media trackers.
        </p>
      </LegalSection>

      <LegalSection heading="How we use it">
        <p>
          We use what you send to answer your question, quote the work, and
          follow up about your vehicle. If you give us a phone number, we may
          call or text you about your request. We do not add you to a marketing
          list or send promotional email.
        </p>
      </LegalSection>

      <LegalSection heading="Who else sees it">
        <p>
          We do not sell or rent your personal information, and we do not share
          it for advertising. A small number of service providers handle it on
          our behalf so the site can function:
        </p>
        <LegalList
          items={[
            <>
              <span className="text-white">FormSubmit</span> — delivers contact
              form submissions to our email inbox. Your submission passes
              through their systems on the way to us.
            </>,
            <>
              <span className="text-white">Google (Gmail)</span> — hosts the
              inbox where submissions arrive and where we reply from.
            </>,
            <>
              <span className="text-white">Vercel</span> — hosts this website
              and provides the analytics described above.
            </>,
          ]}
        />
        <p>
          We may also disclose information if the law requires it, or to protect
          the safety, rights, or property of our customers, our staff, or the
          shop.
        </p>
      </LegalSection>

      <LegalSection heading="How long we keep it">
        <p>
          Contact form submissions stay in our email inbox as part of our
          ordinary business records, so we can look back at what a customer
          asked for and what work was done. Ask us to delete yours and we will,
          unless we need it for a warranty claim, a dispute, or a legal
          obligation.
        </p>
      </LegalSection>

      <LegalSection heading="Your choices">
        <p>
          Write to us at{" "}
          <a
            href="mailto:utwchico@gmail.com"
            className="text-white underline-offset-4 hover:underline"
          >
            utwchico@gmail.com
          </a>{" "}
          or call (530) 809-1976 to ask what we hold about you, to correct it,
          or to have it deleted. California residents have these rights under
          state law, and we apply the same practice to everyone who asks. We
          will not treat you differently for making a request.
        </p>
        <p>
          Because we do not track visitors across other websites, we take no
          action in response to browser &ldquo;Do Not Track&rdquo; signals.
        </p>
      </LegalSection>

      <LegalSection heading="Security">
        <p>
          The site is served over HTTPS, and we limit who at the shop can read
          the inbox. No method of transmitting information over the internet is
          completely secure, so please do not send us sensitive information such
          as payment card, bank account, or Social Security numbers through the
          contact form.
        </p>
      </LegalSection>

      <LegalSection heading="Children">
        <p>
          This site is meant for adults arranging vehicle service and is not
          directed to children under 13. We do not knowingly collect their
          information. If you believe a child has sent us something, contact us
          and we will delete it.
        </p>
      </LegalSection>

      <LegalSection heading="Changes">
        <p>
          If we change this policy we will post the new version here and update
          the date at the top of the page.
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
          . See also our{" "}
          <Link href="/terms" className="text-white underline-offset-4 hover:underline">
            Terms of Service
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}

import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LegalContact from '@/components/LegalContact';
import type { Metadata } from 'next';
import { business, operatorName } from '@/lib/business';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy — Aerial Aura',
  description: 'How Aerial Aura Studio handles personal data, under the Swiss Data Protection Act (FADP) and the GDPR.',
};

// Written for the Swiss Federal Act on Data Protection (FADP / nDSG, in force since
// 1 September 2023), with the GDPR points that apply to visitors from the EU/EEA.
// Business details come from lib/business.ts. If a new service is added to the site
// (analytics, chat, embedded maps, a booking tool), add it to "Service providers" below.

const providers: { name: string; purpose: string; location: string }[] = [
  { name: 'Vercel Inc.',  purpose: 'Website hosting and delivery. The contact form is processed on servers in Frankfurt, Germany.', location: 'USA (servers worldwide, form processing in the EU)' },
  { name: 'Resend',       purpose: 'Delivers contact-form enquiries to our inbox by email.', location: 'USA (sending from servers in Ireland, EU)' },
  { name: 'Mux, Inc.',    purpose: 'Streams the portfolio films when you press play.', location: 'USA (servers worldwide)' },
];

export default function PrivacyPage() {
  const b = business;
  const siteHost = new URL(SITE_URL).host;

  return (
    <>
      <Nav />
      <main className="legal-page">
        <div className="wrap">
          <header className="legal-page__header">
            <p className="eyebrow">Legal</p>
            <h1 className="display legal-page__title">Privacy Policy</h1>
            <p className="legal-page__date">Last updated: November 2026</p>
          </header>

          <div className="legal-page__body">
            <p>
              This policy explains what personal data we process when you visit {siteHost}, contact us
              or book a shoot, why we do it, who helps us, and what your rights are. It is written for
              the Swiss Federal Act on Data Protection (FADP) and, for visitors from the EU or EEA, the
              General Data Protection Regulation (GDPR).
            </p>

            <h2>1. Who is responsible</h2>
            <p>
              The controller responsible for your personal data is:<br />
              {operatorName}{b.legalName && <>, trading as {b.brand}</>}
              {b.street && <><br />{b.street}</>}
              {b.postcodeCity && <><br />{b.postcodeCity}</>}
              <br />{b.country}
              <br />Email: <LegalContact />
            </p>
            <p>Full business details are in the <Link href="/legal/notice">legal notice</Link>.</p>

            <h2>2. Visiting the website</h2>
            <p>
              When you open a page, our hosting provider automatically processes technical data that
              your browser sends: your IP address, the date and time, the page requested, the referring
              page, and your browser and device type. This is needed to deliver the website, keep it
              secure and investigate attacks. The hosting provider keeps these server logs only for a
              short period.
            </p>
            <p>
              This website does not use cookies, analytics, advertising trackers or social-media
              plugins. Fonts are served from our own domain, so no data goes to Google or other font
              services.
            </p>

            <h2>3. Contact form, email and WhatsApp</h2>
            <p>
              If you send an enquiry through the form, we receive your name, email address, project
              type, preferred shoot date and message. We use them only to answer you and, if you wish,
              to prepare a quote. The form is delivered to our inbox by email; the website does not
              store it in a database. To block automated spam, your IP address is held briefly in the
              server&apos;s memory (for at most 10 minutes) and then discarded.
            </p>
            <p>
              If you email us{b.whatsapp && ' or message us on WhatsApp'}, we receive the details you
              send.{b.whatsapp && ' WhatsApp is operated by WhatsApp Ireland Ltd. (part of Meta); its own privacy policy applies to messages sent through it.'}
            </p>

            <h2>4. Portfolio films</h2>
            <p>
              Portfolio films are streamed by Mux. Nothing is loaded from Mux until you press play.
              When a film plays, Mux receives your IP address and technical playback data (device,
              browser, buffering and quality events) to deliver the video and measure streaming
              quality. Mux&apos;s viewer cookie is switched off on this website.
            </p>

            <h2>5. Clients</h2>
            <p>
              If you book a shoot, we process the details needed to plan, deliver and invoice it:
              contact details, shoot location and date, the agreed scope, and payment records. Films
              may show people and private property; we agree with you in advance who and what may be
              filmed, and we only publish work in our portfolio as set out in our{' '}
              <Link href="/legal/terms">terms of engagement</Link>.
            </p>

            <h2>6. Service providers and transfers abroad</h2>
            <p>We work with the following providers, who process data only on our behalf and for the purposes stated:</p>
            <ul className="legal-page__list">
              {providers.map(p => (
                <li key={p.name}>
                  <strong>{p.name}</strong>: {p.purpose} <em>Location: {p.location}.</em>
                </li>
              ))}
            </ul>
            <p>
              Some of these providers are based in the USA or may process data there. The Swiss
              Federal Council recognises the USA as providing adequate protection only for companies
              certified under the Swiss-U.S. Data Privacy Framework. Where a provider is not certified,
              the transfer is protected by standard contractual clauses recognised by the Federal Data
              Protection and Information Commissioner (FDPIC). We do not sell your data or share it
              for marketing.
            </p>

            <h2>7. How long we keep data</h2>
            <p>
              Enquiries that do not lead to a booking are deleted after at most 3 years. Records of
              bookings and invoices are kept for 10 years, as Swiss accounting law requires (Art. 958f
              of the Code of Obligations). Server logs are kept by the hosting provider only for a
              short period.
            </p>

            <h2>8. Legal basis (visitors from the EU/EEA)</h2>
            <p>
              Under the GDPR we rely on: taking steps at your request before a contract and performing
              it (Art. 6(1)(b)), for enquiries and bookings; our legitimate interest in running a secure
              website and answering messages (Art. 6(1)(f)); and legal obligations such as record
              keeping (Art. 6(1)(c)).
            </p>

            <h2>9. Your rights</h2>
            <p>
              You can ask us at any time what personal data we hold about you, and have it corrected,
              deleted or handed over in a common electronic format. You can object to processing and,
              where you gave consent, withdraw it. Write to <LegalContact />; we may ask you to confirm
              your identity and will reply within 30 days.
            </p>
            <p>
              You can also complain to the Swiss Federal Data Protection and Information Commissioner
              (FDPIC, <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener noreferrer">edoeb.admin.ch</a>).
              If you live in the EU or EEA, you can contact the data protection authority in your country.
            </p>

            <h2>10. Security</h2>
            <p>
              The website is served only over encrypted HTTPS connections and uses current security
              protections. We make no automated decisions about you and do not build profiles.
            </p>

            <h2>11. Changes</h2>
            <p>
              We update this policy when our services or the law change. The date at the top shows
              the latest version.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

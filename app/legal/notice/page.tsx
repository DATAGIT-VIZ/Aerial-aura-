import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LegalContact from '@/components/LegalContact';
import type { Metadata } from 'next';
import { business, operatorName } from '@/lib/business';

export const metadata: Metadata = {
  title: 'Legal Notice — Aerial Aura',
  description: 'Legal notice (Impressum) for Aerial Aura Studio.',
};

// Swiss law (Unfair Competition Act, Art. 3 para. 1 lit. s) requires businesses that sell
// online to state who they are and how to reach them. All details come from lib/business.ts.

export default function LegalNoticePage() {
  const b = business;
  const register = [
    b.uid && ['Business ID (UID)', b.uid],
    b.vatNumber && ['VAT number', b.vatNumber],
    b.commercialRegister && ['Commercial register', b.commercialRegister],
    b.focaOperatorId && ['FOCA drone operator no.', b.focaOperatorId],
  ].filter(Boolean) as [string, string][];

  return (
    <>
      <Nav />
      <main className="legal-page">
        <div className="wrap">
          <header className="legal-page__header">
            <p className="eyebrow">Legal</p>
            <h1 className="display legal-page__title">Legal Notice</h1>
            <p className="legal-page__date">Impressum</p>
          </header>

          <div className="legal-page__body">
            <h2>Operator of this website</h2>
            <p>
              {operatorName}
              {b.legalName && b.legalForm && <>, {b.legalForm}</>}
              {b.legalName && <><br />trading as {b.brand}</>}
              {b.street && <><br />{b.street}</>}
              {b.postcodeCity && <><br />{b.postcodeCity}</>}
              <br />{b.country}
            </p>

            <h2>Contact</h2>
            <p>
              Email: <LegalContact />
              {b.phone && <><br />Phone: <a href={`tel:${b.phone.replace(/\s+/g, '')}`}>{b.phone}</a></>}
            </p>

            {register.length > 0 && (
              <>
                <h2>Registration</h2>
                <p>
                  {register.map(([label, value], i) => (
                    <span key={label}>{i > 0 && <br />}{label}: {value}</span>
                  ))}
                </p>
              </>
            )}

            <h2>Responsible for content</h2>
            <p>{operatorName}, address as above.</p>

            <h2>Disclaimer</h2>
            <p>
              We take great care over the information on this website but cannot guarantee that it is
              accurate, complete or up to date. Offers on this website are not binding; a booking is
              confirmed only by a signed quote, as set out in our <Link href="/legal/terms">terms of engagement</Link>.
            </p>
            <p>
              This website links to third-party sites. We have no influence over their content and
              accept no responsibility for it; the operator of each site is responsible for its content.
            </p>

            <h2>Copyright</h2>
            <p>
              All films, photographs, text and graphics on this website belong to {operatorName} or
              are used with permission. Copying or reuse requires prior written consent.
            </p>

            <h2>Data protection</h2>
            <p>How we handle personal data is explained in our <Link href="/legal/privacy">privacy policy</Link>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Aerial Aura',
  description: 'Book a drone shoot or send an enquiry. Based in Switzerland, available worldwide.',
};

const WA_BASE = 'https://wa.me/41XXXXXXXXX';

const packages = [
  { label: 'Wedding / Event', msg: 'Hi%2C+I%27m+interested+in+drone+coverage+for+my+wedding+%2F+event' },
  { label: 'Real Estate',     msg: 'Hi%2C+I%27d+like+aerial+footage+for+a+real+estate+listing' },
  { label: 'Brand / Social',  msg: 'Hi%2C+I+need+drone+footage+for+a+brand+or+social+campaign' },
  { label: 'Custom Project',  msg: 'Hi%2C+I%27d+like+to+discuss+a+custom+drone+project' },
];

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <header className="page-hero">
          <p className="eyebrow">Get in touch</p>
          <h1 className="display page-hero__title">File a Flight Plan</h1>
          <p className="page-hero__sub">
            Tell me your shoot — I&apos;ll handle permit, airspace and execution.
          </p>
        </header>

        <section className="section contact-page-section">
          <div className="wrap">
            <div className="contact-page__grid">

              {/* Left — WhatsApp CTAs */}
              <div className="contact-page__primary">
                <h2 className="display contact-page__heading">Quick&nbsp;Enquiry</h2>
                <p className="contact-page__sub">
                  Choose your project type and open a pre-filled WhatsApp message — fastest way to land in my inbox.
                </p>

                <div className="contact-page__wa-list">
                  {packages.map(p => (
                    <Link
                      key={p.label}
                      href={`${WA_BASE}?text=${p.msg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-page__wa-item"
                    >
                      <span className="contact-page__wa-label">{p.label}</span>
                      <svg className="contact-page__wa-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </Link>
                  ))}
                </div>

                <p className="contact-page__or eyebrow">or</p>

                <Link href="mailto:hello@aerialaura.ch" className="btn" style={{ width: '100%', justifyContent: 'center' }}>
                  Send an Email
                </Link>
              </div>

              {/* Right — info */}
              <div className="contact-page__info">
                <div className="contact-page__info-block">
                  <p className="eyebrow" style={{ marginBottom: '0.8em' }}>Response time</p>
                  <p className="contact-page__info-body">
                    I aim to reply within 24 hours on weekdays. For urgent shoot requests WhatsApp is fastest.
                  </p>
                </div>

                <div className="contact-page__info-block">
                  <p className="eyebrow" style={{ marginBottom: '0.8em' }}>Based in</p>
                  <p className="contact-page__info-body">
                    Switzerland — available across the EU and beyond for the right project. Travel costs are discussed per shoot.
                  </p>
                </div>

                <div className="contact-page__info-block">
                  <p className="eyebrow" style={{ marginBottom: '0.8em' }}>Before you write</p>
                  <ul className="contact-page__checklist">
                    <li>Your date and location (approximate is fine)</li>
                    <li>What you&apos;re capturing — wedding, listing, brand, other</li>
                    <li>Any reference footage or mood you have in mind</li>
                  </ul>
                </div>

                <div className="contact-page__info-block">
                  <p className="eyebrow" style={{ marginBottom: '0.8em' }}>Policies</p>
                  <p className="contact-page__info-body">
                    <Link href="/legal/privacy" className="contact-page__legal-link">Privacy policy</Link>
                    {' · '}
                    <Link href="/legal/terms" className="contact-page__legal-link">Terms of engagement</Link>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

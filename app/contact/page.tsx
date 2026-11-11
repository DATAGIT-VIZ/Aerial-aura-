import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { business, whatsappLink } from '@/lib/business';

export const metadata: Metadata = {
  title: 'Contact — Aerial Aura',
  description: 'Book a drone shoot or send an enquiry. Based in Switzerland, available worldwide.',
};

const packages = [
  { label: 'Wedding / Event', msg: "Hi, I'm interested in drone coverage for my wedding / event" },
  { label: 'Real Estate',     msg: "Hi, I'd like aerial footage for a real estate listing" },
  { label: 'Brand / Social',  msg: 'Hi, I need drone footage for a brand or social campaign' },
  { label: 'Custom Project',  msg: "Hi, I'd like to discuss a custom drone project" },
];
const hasWhatsApp = Boolean(whatsappLink());

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

              {/* Left — WhatsApp shortcuts (once a number is set), then the enquiry form */}
              <div className="contact-page__primary">
                {hasWhatsApp && (
                  <>
                    <h2 className="display contact-page__heading">Quick&nbsp;Enquiry</h2>
                    <p className="contact-page__sub">
                      Choose your project type and open a pre-filled WhatsApp message — fastest way to land in my inbox.
                    </p>

                    <div className="contact-page__wa-list">
                      {packages.map(p => (
                        <Link
                          key={p.label}
                          href={whatsappLink(p.msg)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="contact-page__wa-item"
                        >
                          <span className="contact-page__wa-label">{p.label}</span>
                          <WhatsAppIcon size={20} className="contact-page__wa-icon" />
                        </Link>
                      ))}
                    </div>

                    <p className="contact-page__or eyebrow">or send the details</p>
                  </>
                )}

                {!hasWhatsApp && (
                  <>
                    <h2 className="display contact-page__heading">Send an Enquiry</h2>
                    <p className="contact-page__sub">
                      Tell me the date, the place and what you need captured — I&apos;ll come back with availability and a quote within 48 hours.
                    </p>
                  </>
                )}

                <ContactForm />

                {business.email && (
                  <p className="contact-page__mail">
                    Prefer email? <a href={`mailto:${business.email}`}>{business.email}</a>
                  </p>
                )}
              </div>

              {/* Right — info */}
              <div className="contact-page__info">
                <div className="contact-page__info-block">
                  <p className="eyebrow" style={{ marginBottom: '0.8em' }}>Response time</p>
                  <p className="contact-page__info-body">
                    I aim to reply within 24 hours on weekdays.{hasWhatsApp && ' For urgent shoot requests WhatsApp is fastest.'}
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
                    {' · '}
                    <Link href="/legal/notice" className="contact-page__legal-link">Legal notice</Link>
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

import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { business, whatsappLink } from '@/lib/business';

const WA = whatsappLink("Hi, I'd like to enquire about aerial cinematography. Here are my details:");

export default function ContactCTA() {
  return (
    <section className="section contact" id="contact">
      <div className="wrap contact__grid">

        {/* Left: headline + quick contact buttons */}
        <div className="contact__left">
          <p className="eyebrow">Get in touch</p>
          <h2 className="display contact__title">File a<br />flight plan</h2>
          <p className="contact__sub">
            Tell me the date, the place and what you need captured — I&apos;ll come back
            with availability and a quote within 48 hours.
          </p>
          {(WA || business.email) && (
            <div className="contact__actions">
              {WA && (
                <Link href={WA} className="btn btn--solid contact__wa" target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon />
                  Message on WhatsApp
                </Link>
              )}
              {business.email && (
                <Link href={`mailto:${business.email}`} className="btn contact__email">
                  {business.email}
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Right: contact form */}
        <div className="contact__right">
          <ContactForm />
        </div>

      </div>
    </section>
  );
}

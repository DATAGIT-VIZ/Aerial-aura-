import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { business, whatsappLink, formatPrice, priceVatNote } from '@/lib/business';

export const metadata: Metadata = {
  title: 'Services — Aerial Aura',
  description: 'The Flight Menu — FPV & cinematic drone packages for weddings, real estate and brands. Switzerland-based, available worldwide.',
};


const courses = [
  {
    course: 'FIRST COURSE',
    name: 'The Appetiser',
    tagline: 'Brand & Social',
    desc: 'One location, half-day shoot, one polished 60–90 s cut delivered in vertical and landscape formats. Ideal for a product reveal, brand campaign, or Instagram hero moment.',
    specs: [
      { label: 'Duration', value: '½ day' },
      { label: 'Deliverables', value: '1 × master + 2 formats' },
      { label: 'Turnaround', value: '5 working days' },
      { label: 'Raw footage', value: 'On request' },
    ],
    price: formatPrice(business.prices.appetiser) ?? 'On request',
    note: business.prices.appetiser == null ? 'Tailored quote' : (priceVatNote || 'Starting price'),
    accent: 'var(--sky)',
    msg: "Hi, I'm interested in The Appetiser package",
  },
  {
    course: 'MAIN COURSE',
    name: 'The Signature',
    tagline: 'Weddings & Events',
    desc: 'Full-day coverage of your ceremony and reception from the air. Two cinematic cuts — a 3–4 min main film and a 60 s social highlight — graded to match the mood of your day.',
    specs: [
      { label: 'Duration', value: 'Full day' },
      { label: 'Deliverables', value: 'Main film + highlight' },
      { label: 'Turnaround', value: '10 working days' },
      { label: 'Music licensing', value: 'Included' },
    ],
    price: formatPrice(business.prices.signature) ?? 'On request',
    note: business.prices.signature == null ? 'Tailored quote' : (priceVatNote || 'Starting price'),
    accent: 'var(--copper-soft)',
    msg: "Hi, I'm interested in The Signature package",
  },
  {
    course: 'CHEF\'S SPECIAL',
    name: 'The Tasting Menu',
    tagline: 'Real Estate & Architecture',
    desc: 'Multi-location shoot across a property or development. Adaptive bitrate 4K delivery, a custom-cut listing video, and vertical social cuts included. Built for agents who close on feeling.',
    specs: [
      { label: 'Duration', value: 'Multi-day' },
      { label: 'Deliverables', value: 'Listing film + socials + stills' },
      { label: 'Turnaround', value: '7 working days' },
      { label: 'Drone permit', value: 'Handled' },
    ],
    price: formatPrice(business.prices.tastingMenu) ?? 'On request',
    note: business.prices.tastingMenu == null ? 'Tailored quote' : (priceVatNote || 'Starting price'),
    accent: 'var(--sky)',
    msg: "Hi, I'm interested in The Tasting Menu package",
  },
  {
    course: 'BESPOKE',
    name: 'The Open Kitchen',
    tagline: 'Custom Projects',
    desc: 'Documentary series, music video, feature support, or a multi-day expedition. If it requires a drone pilot who\'s also a storyteller with a Michelin-grade eye for detail — this is the conversation to have.',
    specs: [
      { label: 'Duration', value: 'Custom' },
      { label: 'Deliverables', value: 'Fully scoped' },
      { label: 'Turnaround', value: 'Agreed per project' },
      { label: 'Location', value: 'Worldwide' },
    ],
    price: 'Custom',
    note: 'Let\'s talk',
    accent: 'var(--copper-soft)',
    msg: "Hi, I'd like to discuss a custom project",
  },
];

const hasWhatsApp = Boolean(whatsappLink());

const faqs = [
  {
    q: 'Do you handle Swiss drone permits?',
    a: 'Yes — all necessary FOCA authorisations, A2 operator certification, and liability insurance are covered. You don\'t need to touch the paperwork.',
  },
  {
    q: 'How far in advance should I book?',
    a: 'Weddings: 3–6 months minimum. Brand and real estate shoots can often be arranged within 2–3 weeks depending on schedule.',
  },
  {
    q: 'Can you travel outside Switzerland?',
    a: 'Absolutely. Most work is in Switzerland and the EU, but I\'ve shot across Europe and am happy to discuss international projects.',
  },
  {
    q: 'What happens if weather grounds the shoot?',
    a: 'Safety first, always. We reschedule at no additional cost — the day is blocked for your project regardless.',
  },
  {
    q: 'What format are deliverables in?',
    a: 'Masters in ProRes or H.265. Delivery via private link in H.264/H.265 at the resolution matching your source — 1080p60 minimum, 4K60 where captured.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <header className="page-hero">
          <p className="eyebrow">Services & Pricing</p>
          <h1 className="display page-hero__title">The Flight Menu</h1>
          <p className="page-hero__sub">
            Four courses. Each one engineered for a different kind of story.
          </p>
        </header>

        {/* Menu */}
        <section className="section services-section">
          <div className="wrap">
            <div className="services-menu">
              {courses.map((c) => (
                <div key={c.name} className="services-item">
                  <div className="services-item__top">
                    <span className="services-item__course" style={{ color: c.accent }}>{c.course}</span>
                    <div className="services-item__price">
                      <span>{c.price}</span>
                      <small>{c.note}</small>
                    </div>
                  </div>

                  <h2 className="display services-item__name">{c.name}</h2>
                  <p className="services-item__tagline eyebrow" style={{ color: c.accent }}>{c.tagline}</p>
                  <p className="services-item__desc">{c.desc}</p>

                  <ul className="services-item__specs">
                    {c.specs.map(s => (
                      <li key={s.label}>
                        <span className="services-item__spec-label">{s.label}</span>
                        <span className="services-item__spec-val" style={{ color: c.accent }}>{s.value}</span>
                      </li>
                    ))}
                  </ul>

                  {hasWhatsApp ? (
                  <Link href={whatsappLink(c.msg)} target="_blank" rel="noopener noreferrer" className="btn btn--wa">
                    <WhatsAppIcon />
                    Enquire on WhatsApp
                  </Link>
                  ) : (
                    <Link href="/contact" className="btn">Enquire about this package →</Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section services-faq-section">
          <div className="wrap">
            <div className="section__head">
              <h2 className="display section__title">Flight Briefing</h2>
              <p className="section__note">Common questions before we take off</p>
            </div>
            <div className="services-faq">
              {faqs.map((f, i) => (
                <div key={i} className="services-faq__item">
                  <h3 className="services-faq__q">{f.q}</h3>
                  <p className="services-faq__a">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section services-cta-section">
          <div className="wrap services-cta">
            <p className="eyebrow">Ready to fly?</p>
            <h2 className="display services-cta__title">Let&apos;s plan your shoot.</h2>
            <p className="services-cta__sub">Tell me your date, location, and vision — I&apos;ll handle the rest from permit to final cut.</p>
            <div className="services-cta__actions">
              {hasWhatsApp ? (
              <Link href={whatsappLink("Hi, I'd like to book a shoot")} target="_blank" rel="noopener noreferrer" className="btn btn--wa">
                <WhatsAppIcon />
                Book via WhatsApp
              </Link>
              ) : (
                <Link href="/contact" className="btn btn--solid">Send an enquiry →</Link>
              )}
              {business.email && (
                <Link href={`mailto:${business.email}`} className="btn">
                  Send an Email
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

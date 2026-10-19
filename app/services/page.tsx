import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services — Aerial Aura',
  description: 'The Flight Menu — FPV & cinematic drone packages for weddings, real estate and brands. Switzerland-based, available worldwide.',
};

const WA = 'https://wa.me/41XXXXXXXXX';

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
    price: 'CHF —',
    note: 'Price on application',
    accent: 'var(--sky)',
    wa: `${WA}?text=Hi%2C+I%27m+interested+in+The+Appetiser+package`,
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
    price: 'CHF —',
    note: 'Price on application',
    accent: 'var(--copper-soft)',
    wa: `${WA}?text=Hi%2C+I%27m+interested+in+The+Signature+package`,
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
    price: 'CHF —',
    note: 'Price on application',
    accent: 'var(--sky)',
    wa: `${WA}?text=Hi%2C+I%27m+interested+in+The+Tasting+Menu+package`,
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
    wa: `${WA}?text=Hi%2C+I%27d+like+to+discuss+a+custom+project`,
  },
];

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

                  <Link href={c.wa} target="_blank" rel="noopener noreferrer" className="btn btn--wa">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Enquire on WhatsApp
                  </Link>
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
              <Link href={`${WA}?text=Hi%2C+I%27d+like+to+book+a+shoot`} target="_blank" rel="noopener noreferrer" className="btn btn--wa">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Book via WhatsApp
              </Link>
              <Link href="mailto:hello@aerialaura.ch" className="btn">
                Send an Email
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

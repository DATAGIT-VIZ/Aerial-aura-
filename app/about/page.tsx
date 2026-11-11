import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { whatsappLink } from '@/lib/business';

export const metadata: Metadata = {
  title: 'About — Aerial Aura',
  description: 'A former Michelin-trained chef who traded the pass for FPV controllers. Switzerland-based drone cinematographer with FOCA A2 certification.',
};

const WA = whatsappLink("Hi, I'd like to work together");

const creds = [
  { label: 'Certification', value: 'FOCA A2 Drone Operator' },
  { label: 'Insurance',     value: 'Full UAV liability cover' },
  { label: 'Based in',      value: 'Switzerland · EU flights OK' },
  { label: 'Languages',     value: 'EN · FR · DE' },
];

const stats = [
  { num: '200+', label: 'Shoots completed' },
  { num: '4K60', label: 'Native capture' },
  { num: '48H',  label: 'Rush turnaround' },
  { num: '5★',   label: 'Average rating' },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <header className="page-hero">
          <p className="eyebrow">The pilot</p>
          <h1 className="display page-hero__title">From the Pass<br />to the Sky</h1>
        </header>

        {/* Story */}
        <section className="section about-page-section">
          <div className="wrap">
            <div className="about-page__grid">

              {/* Visual */}
              <div className="about-page__visual">
                <svg viewBox="0 0 480 560" aria-hidden="true">
                  <defs>
                    <radialGradient id="aGlow" cx="50%" cy="40%" r="55%">
                      <stop offset="0%" stopColor="var(--copper)" stopOpacity="0.18"/>
                      <stop offset="100%" stopColor="transparent"/>
                    </radialGradient>
                  </defs>
                  <rect width="480" height="560" fill="var(--panel-2)"/>
                  <rect width="480" height="560" fill="url(#aGlow)"/>
                  {/* Horizon lines */}
                  <line x1="0" y1="320" x2="480" y2="320" stroke="var(--line)" strokeWidth="1"/>
                  <line x1="0" y1="330" x2="480" y2="330" stroke="var(--line)" strokeWidth="0.5"/>
                  {/* Crosshair */}
                  <circle cx="240" cy="240" r="80" fill="none" stroke="var(--copper)" strokeWidth="0.8" opacity="0.3"/>
                  <circle cx="240" cy="240" r="4" fill="var(--copper)" opacity="0.6"/>
                  <line x1="140" y1="240" x2="200" y2="240" stroke="var(--copper)" strokeWidth="0.8" opacity="0.5"/>
                  <line x1="280" y1="240" x2="340" y2="240" stroke="var(--copper)" strokeWidth="0.8" opacity="0.5"/>
                  <line x1="240" y1="140" x2="240" y2="200" stroke="var(--copper)" strokeWidth="0.8" opacity="0.5"/>
                  <line x1="240" y1="280" x2="240" y2="340" stroke="var(--copper)" strokeWidth="0.8" opacity="0.5"/>
                  {/* Telemetry text */}
                  <text x="24" y="48"  fontFamily="var(--mono)" fontSize="10" fill="var(--sky)" opacity="0.7">ALT 124M</text>
                  <text x="24" y="64"  fontFamily="var(--mono)" fontSize="10" fill="var(--sky)" opacity="0.7">SPD 89KPH</text>
                  <text x="24" y="504" fontFamily="var(--mono)" fontSize="10" fill="var(--dim)">46.52°N 8.14°E</text>
                  <text x="280" y="48" fontFamily="var(--mono)" fontSize="10" fill="var(--copper-soft)" opacity="0.8">● REC 04:32</text>
                  {/* Mountains silhouette */}
                  <path d="M0,420 L60,320 L120,370 L180,290 L240,350 L300,280 L360,340 L420,300 L480,360 L480,560 L0,560Z" fill="var(--ink-2)" opacity="0.9"/>
                  <path d="M0,460 L80,380 L160,420 L240,370 L320,410 L400,360 L480,400 L480,560 L0,560Z" fill="var(--ink)" opacity="0.95"/>
                </svg>
                <div className="about-page__visual-label">
                  <span className="eyebrow">Aerial Aura — Pilot</span>
                </div>
              </div>

              {/* Copy */}
              <div className="about-page__copy">
                <p className="about__lede">
                  &ldquo;I spent a decade chasing perfection in Michelin kitchens. Then I picked up a controller, and realised the sky had the same demands — precision, timing, and the discipline to make something beautiful under pressure.&rdquo;
                </p>

                <p className="about__body">
                  I&apos;m based in Switzerland and have been flying FPV and cinematic drones professionally since 2020. Before that, I worked as a chef — which sounds unrelated until you watch footage that&apos;s composed rather than just captured. Every shot is a dish: framed, timed, and finished with intention.
                </p>
                <p className="about__body" style={{ marginTop: '1em' }}>
                  I work with wedding couples who want their ceremony remembered in motion, real estate agents who know that a property sells faster when buyers can feel it, and brands who need an aerial perspective that actually tells a story rather than just orbiting a building.
                </p>
                <p className="about__body" style={{ marginTop: '1em' }}>
                  My kit is 4K60 capable across both FPV and stabilised cinematic platforms. I handle permits, airspace authorisations, and insurance — you handle the vision, I&apos;ll handle the execution.
                </p>

                {/* Credentials */}
                <ul className="about-page__creds">
                  {creds.map(c => (
                    <li key={c.label}>
                      <span className="about-page__cred-label">{c.label}</span>
                      <span className="about-page__cred-val">{c.value}</span>
                    </li>
                  ))}
                </ul>

                {WA ? (
                  <Link href={WA} target="_blank" rel="noopener noreferrer" className="btn btn--wa">
                    <WhatsAppIcon />
                    Let&apos;s work together
                  </Link>
                ) : (
                  <Link href="/contact" className="btn btn--solid">Let&apos;s work together →</Link>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="about-page__stats">
              {stats.map(s => (
                <div key={s.label} className="about-page__stat">
                  <b className="display">{s.num}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

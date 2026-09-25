import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Aerial Aura',
  description: 'A former Michelin-trained chef who traded the pass for FPV controllers. Switzerland-based drone cinematographer with FOCA A2 certification.',
};

const WA = 'https://wa.me/41XXXXXXXXX';

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

                <Link
                  href={`${WA}?text=Hi%2C+I%27d+like+to+work+together`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn--wa"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Let&apos;s work together
                </Link>
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

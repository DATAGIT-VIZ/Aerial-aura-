import Link from 'next/link';
import HeroDrone from './HeroDrone';
import Hyperspeed from './Hyperspeed';

export default function Hero() {
  return (
    <header className="hero" id="top">

      {/* ── Hyperspeed road background ── */}
      <Hyperspeed />

      {/* ── Film grain ── */}
      <div className="hero__grain" aria-hidden="true" />

      {/* ── Atmospheric SVG paths ── */}
      <svg className="hero__path" viewBox="0 0 1200 800" preserveAspectRatio="none" aria-hidden="true">
        <path className="p1" d="M -50,600 C 200,500 300,700 550,450 S 900,150 1250,300" />
        <path className="p2" d="M -50,200 C 250,300 400,80 700,220 S 1000,500 1250,420" />
      </svg>

      {/* ── Corner frame marks (editorial) ── */}
      <span className="hero__corner hero__corner--tl" aria-hidden="true" />
      <span className="hero__corner hero__corner--tr" aria-hidden="true" />
      <span className="hero__corner hero__corner--bl" aria-hidden="true" />
      <span className="hero__corner hero__corner--br" aria-hidden="true" />

      {/* ── HUD telemetry ── */}
      <div className="hud">
        <div className="hud__group">
          <span>ALT 118M</span>
          <span>SPD 94KM/H</span>
          <span>46.9°N 7.4°E</span>
        </div>
        <div className="hud__rec">
          <span className="hud__dot" />REC
        </div>
      </div>

      {/* ── Massive split headline ── */}
      <div className="hero__headline" aria-label="Precision at altitude">
        <div className="hero__line hero__line--1" aria-hidden="true">
          <span>PRECISION</span>
        </div>
        <div className="hero__line hero__line--2" aria-hidden="true">
          <span>AT ALTITUDE</span>
        </div>
      </div>

      {/* ── Interactive drone — centered between headline lines ── */}
      <HeroDrone />

      {/* ── Bottom strip ── */}
      <div className="hero__strip">
        <p className="hero__strip-copy">
          FPV &amp; cinematic drone films — weddings, real estate, brands.
        </p>
        <div className="hero__strip-actions">
          <Link href="#work" className="btn btn--solid">Watch the reel</Link>
          <Link href="/contact" className="btn">File a flight plan →</Link>
        </div>
        <div className="hero__strip-scroll" aria-label="Scroll down">
          <span>SCROLL</span>
          <span className="hero__strip-line" aria-hidden="true" />
        </div>
      </div>

    </header>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { business, whatsappLink } from '@/lib/business';

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-wrap">

      {/* ── Top CTA ── */}
      <div className="footer-cta">
        <svg
          className="footer-cta__paths"
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className="fp1" d="M -50,300 C 200,220 400,350 600,200 S 950,50 1250,180" />
          <path className="fp2" d="M -50,100 C 300,160 500,60 750,140 S 1050,280 1250,220" />
        </svg>

        <p className="eyebrow footer-cta__sub">
          Based in Switzerland &middot; Available worldwide
        </p>
        <h2 className="display footer-cta__title">
          Ready for<br />takeoff?
        </h2>
        <Link href="/contact" className="btn btn--solid">
          Book a shoot
        </Link>
      </div>

      {/* ── Main columns ── */}
      <div className="footer-main">

        {/* Brand */}
        <div className="footer-brand">
          <Link href="/" className="footer-logo" aria-label="Aerial Aura Studio — home">
            <Image
              src="/logos/logo-horizontal-gold.svg"
              alt="Aerial Aura Studio"
              className="footer-logo__img"
              width={186}
              height={56}
            />
          </Link>
          <p className="footer-brand__bio">
            FPV &amp; cinematic drone films for weddings, real estate and
            brands — shot, graded and delivered by a former chef who traded
            the pass for a controller.
          </p>
          <span className="eyebrow footer-brand__coords">46.9°N &nbsp;7.4°E</span>
        </div>

        {/* Navigate */}
        <div className="footer-col">
          <h3 className="footer-col__label">Navigate</h3>
          <nav className="footer-nav">
            <Link href="/work">Work</Link>
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>

        {/* Connect: each link only shows once its detail is filled in (lib/business.ts) */}
        <div className="footer-col">
          <h3 className="footer-col__label">Connect</h3>
          <nav className="footer-nav">
            {business.email && <a href={`mailto:${business.email}`}>{business.email}</a>}
            {business.whatsapp && <a href={whatsappLink()} {...ext}>WhatsApp</a>}
            {business.instagram && <a href={business.instagram} {...ext}>Instagram</a>}
            {business.youtube && <a href={business.youtube} {...ext}>YouTube</a>}
            <Link href="/contact">Enquiry form</Link>
          </nav>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bar">
        <span>&copy;&nbsp;{year} {business.brand}. All rights reserved.</span>
        <span className="footer-bar__hud" aria-hidden="true">
          SPD&nbsp;0&nbsp;&middot;&nbsp;ALT&nbsp;0&nbsp;&middot;&nbsp;STANDBY
        </span>
        <span className="footer-bar__legal">
          <Link href="/legal/privacy">Privacy</Link>
          <span aria-hidden="true">&nbsp;&middot;&nbsp;</span>
          <Link href="/legal/terms">Terms</Link>
          <span aria-hidden="true">&nbsp;&middot;&nbsp;</span>
          <Link href="/legal/notice">Legal notice</Link>
        </span>
      </div>

    </footer>
  );
}

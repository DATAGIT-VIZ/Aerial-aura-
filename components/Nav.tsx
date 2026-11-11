'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getLenis } from '@/lib/lenis';
import { business } from '@/lib/business';

const LINKS = [
  { href: '/work',     label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about',    label: 'About' },
  { href: '/contact',  label: 'Contact' },
];

export default function Nav() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // While the phone menu is open: freeze the page behind it and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Close the menu if the screen grows past the phone/tablet breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 820px)');
    const onChange = () => { if (mq.matches) setOpen(false); };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <nav className={`nav${open ? ' nav--open' : ''}${scrolled ? ' nav--scrolled' : ''}`} id="nav">
      <Link href="/" className="nav__mark" aria-label="Aerial Aura Studio — home" onClick={closeMenu}>
        <Image
          src="/logos/logo-monogram-gold.svg"
          alt="Aerial Aura Studio"
          className="nav__logo"
          width={73}
          height={60}
          priority
        />
      </Link>

      <div className="nav__links" id="navLinks">
        {LINKS.map((l, i) => (
          <Link key={l.href} href={l.href} onClick={closeMenu} style={{ '--i': i } as React.CSSProperties}>
            <span className="nav__link-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            {l.label}
          </Link>
        ))}
        {/* Phone/tablet menu only */}
        <div className="nav__panel-foot">
          <Link href="/contact" className="btn btn--solid" onClick={closeMenu}>Book a Shoot</Link>
          {business.email && (
            <a href={`mailto:${business.email}`} className="nav__panel-mail">{business.email}</a>
          )}
        </div>
      </div>

      <Link href="/contact" className="btn btn--solid nav__cta">Book a Shoot</Link>

      <button
        className="nav__toggle"
        id="navToggle"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="navLinks"
        onClick={() => setOpen(o => !o)}
      >
        <span /><span /><span />
      </button>
    </nav>
  );
}

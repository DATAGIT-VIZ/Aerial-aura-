'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (open && !(e.target as Element).closest('.nav__links') && !(e.target as Element).closest('.nav__toggle')) {
        setOpen(false);
      }
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <nav className={`nav${open ? ' nav--open' : ''}${scrolled ? ' nav--scrolled' : ''}`} id="nav">
      <Link href="/" className="nav__mark">
        Aerial<span>_</span>Aura
      </Link>

      <div className="nav__links" id="navLinks">
        <Link href="/work"     onClick={closeMenu}>Work</Link>
        <Link href="/services" onClick={closeMenu}>Services</Link>
        <Link href="/about"    onClick={closeMenu}>About</Link>
        <Link href="/contact"  onClick={closeMenu}>Contact</Link>
      </div>

      <Link href="/contact" className="btn btn--solid nav__cta">Book a Shoot</Link>

      <button
        className="nav__toggle"
        id="navToggle"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span /><span /><span />
      </button>
    </nav>
  );
}

'use client';
import { useEffect } from 'react';

const SELECTORS = [
  '.marquee',
  '.work',
  '.about',
  '.menu',
  '.testi',
  '.contact',
  '.footer-wrap',
].join(', ');

export default function RevealOnScroll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTORS));

    // Tag everything as pending before first paint
    els.forEach(el => el.classList.add('reveal-pending'));

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          // Stagger child cards/items a bit
          const children = el.querySelectorAll<HTMLElement>(
            '.card, .menu__item, .testi__card, .testi__featured, .about__stat, .about__cert'
          );
          children.forEach((child, i) => {
            child.style.transitionDelay = `${i * 60}ms`;
          });
          el.classList.add('reveal-done');
          el.classList.remove('reveal-pending');
          io.unobserve(el);
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -48px 0px' }
    );

    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}

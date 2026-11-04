'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { setLenis } from '@/lib/lenis';

// Site-wide smooth scrolling. Mouse wheels and trackpads get Lenis's eased scrolling; touch
// screens keep native scrolling (iOS/Android momentum is already smooth, and taking it over
// feels laggy). Lenis moves the real window scroll, so GSAP ScrollTrigger keeps working as is.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.085,     // lower = silkier/longer glide (Lenis default is 0.1)
      anchors: true,   // smooth-scroll in-page links like #work
    });
    setLenis(lenis);
    return () => { setLenis(null); lenis.destroy(); };
  }, []);

  return null;
}

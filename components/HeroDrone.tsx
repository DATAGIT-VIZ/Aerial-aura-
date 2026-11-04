'use client';

import { useEffect, useRef } from 'react';

// Must match the mobile breakpoint for .drone-anchor in globals.css.
const MOBILE_QUERY = '(max-width: 600px)';

// Mobile files are cropped tight around the drone (960×448) so it can fill the screen width,
// and are ~4× smaller than the desktop ones.
const VARIANTS = {
  mobile: {
    webm: '/video/drone-gold-mobile.webm',
    hevc: '/video/drone-gold-mobile.mov',
    poster: '/video/drone-gold-mobile-poster.webp',
  },
  desktop: {
    webm: '/video/drone-gold.webm',
    hevc: '/video/drone-gold.mov',
    poster: '/video/drone-gold-poster.webp',
  },
};

// Safari, and every iOS browser (all run on WebKit), can't show transparency in WebM video,
// so they get the HEVC-with-alpha version instead. Chrome/Firefox/Edge get WebM.
// Checks the engine vendor rather than the user agent: Chrome's iPhone emulation fakes the
// UA but is still Chrome, and can't show HEVC transparency.
function needsHevcAlpha() {
  return navigator.vendor.startsWith('Apple');
}

// Data Saver on, or reduced motion requested → show the still image only, skip the video download.
function wantsStill() {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return Boolean(conn?.saveData) || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function HeroDrone() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const mobile = window.matchMedia(MOBILE_QUERY);
    const hevc = needsHevcAlpha();
    const still = wantsStill();
    let inView = true;

    const play = () => {
      if (inView && video.getAttribute('src')) video.play().catch(() => {});
    };

    const load = () => {
      const variant = VARIANTS[mobile.matches ? 'mobile' : 'desktop'];
      video.poster = variant.poster;
      if (still) return;
      const src = hevc ? variant.hevc : variant.webm;
      if (video.getAttribute('src') !== src) video.src = src;
      play();
    };

    // Pause while the hero is scrolled out of view.
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) play();
      else video.pause();
    });

    video.muted = true; // required for autoplay on iOS
    observer.observe(video);
    load();
    mobile.addEventListener('change', load);
    return () => {
      observer.disconnect();
      mobile.removeEventListener('change', load);
    };
  }, []);

  return (
    <div className="drone-anchor" aria-hidden="true">
      <div className="drone-bob">
        <video ref={videoRef} className="drone-video" muted loop playsInline preload="auto" />
      </div>
    </div>
  );
}

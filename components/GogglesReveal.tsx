'use client';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { getLenis } from '@/lib/lenis';

const GogglesSequence = dynamic(() => import('./GogglesSequence'), { ssr: false });

/* Mutable bridge — no React state, no re-renders */
const scrollProg = { value: 0 };

// Share of the section's scroll spent turning the goggles; the zoom into the lens starts here.
const TURN_END = 0.70;

export default function GogglesReveal() {
  const sectionRef    = useRef<HTMLElement>(null);
  const labelRef      = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const videoWrapRef  = useRef<HTMLDivElement>(null);
  const videoRef      = useRef<HTMLVideoElement>(null);
  const hudRef        = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const vid = videoRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Only start downloading the POV video once its section scrolls into view, so the hero
    // gets the bandwidth on first load (the video itself shows ~80% through the section).
    // Phones get a 720p file instead of the 27 MB 1440p one; browsers that can't play WebM
    // (older iPhones) get MP4.
    let loadObserver: IntersectionObserver | null = null;
    if (vid && sectionRef.current) {
      const isMobile = window.matchMedia('(max-width: 600px)').matches;
      const hasWebm  = vid.canPlayType('video/webm; codecs="vp9"') !== '';
      // Mobile files are a portrait crop (664×1440) so the video can fill the phone screen sharply.
      const src = isMobile ? (hasWebm ? '/video/ex-mobile.webm' : '/video/ex-mobile.mp4')
                           : (hasWebm ? '/video/ex.webm'        : '/video/ex.mp4');
      vid.muted = true; // required for autoplay on iOS
      loadObserver = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        loadObserver?.disconnect();
        vid.src = src;
        vid.load();
        if (reducedMotion) vid.play().catch(() => {});
      });
      loadObserver.observe(sectionRef.current);
    }

    if (reducedMotion) {
      scrollProg.value = 1;
      if (videoWrapRef.current) videoWrapRef.current.style.opacity = '1';
      if (hudRef.current)       hudRef.current.style.opacity       = '1';
      return () => { loadObserver?.disconnect(); };
    }

    const l  = labelRef.current;
    const cw = canvasWrapRef.current;
    const vw = videoWrapRef.current;
    const h  = hudRef.current;
    const section = sectionRef.current;
    if (!l || !cw || !vw || !h || !section) return () => { loadObserver?.disconnect(); };

    scrollProg.value = 0;
    vw.style.opacity = '0';
    h.style.opacity  = '0';
    cw.style.transformOrigin = '50% 47%';

    const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

    // Phones: the video first appears as a landscape strip inside the lens (58vw tall, like the
    // goggles frame), then opens up to fill the whole screen. `stripInset` is how much to clip
    // off the top and bottom of the full-screen video to show just that strip.
    const mobileQuery = window.matchMedia('(max-width: 600px)');
    let stripInset = 0;
    const measure = () => {
      stripInset = mobileQuery.matches ? Math.max(0, (vw.clientHeight - window.innerWidth * 0.58) / 2) : 0;
    };
    measure();
    window.addEventListener('resize', measure);
    const smooth  = (x: number) => x * x * (3 - 2 * x);   // ease in-out

    // Applies every scroll-driven visual from one progress value (0–1).
    // Timeline: turn 0–70% · zoom into the lens 70–84% · video fades in 78–84% ·
    // HUD 85–89% · video holds full-screen 89–100% (room to watch before the next section).
    const apply = (p: number) => {
      // "Strap in." label drifts up and fades while the goggles turn
      const lp = smooth(clamp01((p - 0.40) / 0.22));
      l.style.opacity   = (1 - lp).toString();
      l.style.transform = `translateX(-50%) translateY(${-32 * lp}px)`;

      // Zoom punches through the lens — eased in, so it accelerates into the eyepiece
      const zp = clamp01((p - TURN_END) / 0.14);
      cw.style.transform = `scale(${1 + zp * zp * 6}) translateY(${zp * -5}%)`;   // 1× → 7×
      // ...and the magnified goggles dissolve to black as the video arrives, so on phones
      // (where the video is a landscape frame) nothing is left around it
      cw.style.opacity = (1 - smooth(clamp01((p - 0.79) / 0.05))).toString();

      // Video dissolves in over the last part of the zoom, then the HUD
      vw.style.opacity = smooth(clamp01((p - 0.78) / 0.06)).toString();
      h.style.opacity  = smooth(clamp01((p - 0.85) / 0.04)).toString();

      // Phones: strip → full screen (82–89%, finishing as the auto-glide lands)
      if (stripInset > 0) {
        const y = stripInset * (1 - smooth(clamp01((p - 0.82) / 0.07)));
        vw.style.clipPath = y > 0.5 ? `inset(${y.toFixed(1)}px 0)` : '';
      } else if (vw.style.clipPath) {
        vw.style.clipPath = '';
      }

      // Video: start from frame 0 as the zoom begins (so it's playing by the time it shows),
      // reset on the way back up
      if (vid) {
        if (p > TURN_END + 0.01 && vid.paused) {
          vid.currentTime = 0;
          vid.play().catch(() => {});
        } else if (p <= TURN_END - 0.04 && !vid.paused) {
          vid.pause();
          vid.currentTime = 0;
        }
      }
    };

    // Scroll sets a target; a frame loop eases the shown progress toward it. This makes the
    // goggles turn, zoom and fade glide smoothly however the page is scrolled — a fast thumb
    // flick or a mouse wheel notch is spread over several frames instead of jumping.
    let target = 0;
    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 1 / 60;
      last = now;
      const diff = target - scrollProg.value;
      scrollProg.value = Math.abs(diff) < 0.0002 ? target : scrollProg.value + diff * (1 - Math.exp(-dt * 9));
      apply(scrollProg.value);
      raf = scrollProg.value === target ? 0 : requestAnimationFrame(tick);   // sleep once settled
    };
    const wake = () => {
      if (!raf) { last = 0; raf = requestAnimationFrame(tick); }
    };

    // ── Scroll lock for the lens → video transition ──────────────────────────
    // When someone scrolls down past the end of the turn, the page takes over: it glides
    // through the zoom and video fade on its own, holds on the video for a moment, then hands
    // scrolling back. Scroll input is blocked meanwhile, so a fast flick can't skip the video.
    const REVEAL_DURATION = 1.6;   // s — glide from end of turn to the video
    const HOLD_DURATION   = 1800;  // ms — video stays locked on screen after arriving
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const SCROLL_KEYS = new Set([' ', 'PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Home', 'End']);

    let revealState: 'idle' | 'running' | 'done' = 'idle';
    let holdTimer = 0;
    let lastUserInput = 0;
    const noteInput = () => { lastUserInput = performance.now(); };
    const noteKey   = (e: KeyboardEvent) => { if (SCROLL_KEYS.has(e.key)) noteInput(); };
    const block     = (e: Event) => { e.preventDefault(); };
    const blockKey  = (e: KeyboardEvent) => { if (SCROLL_KEYS.has(e.key)) e.preventDefault(); };

    window.addEventListener('wheel', noteInput, { passive: true });
    window.addEventListener('touchmove', noteInput, { passive: true });
    window.addEventListener('keydown', noteKey);

    const lock = () => {
      getLenis()?.stop();   // Lenis handles wheel itself, so it has to be paused too
      window.addEventListener('wheel', block, { passive: false });
      window.addEventListener('touchmove', block, { passive: false });
      window.addEventListener('keydown', blockKey);
      // On touch screens this also stops any momentum fling still in progress. (On <body>,
      // not <html> — overflow on <html> breaks the sticky pinning of this scene.)
      if (isTouch) { document.body.style.overflow = 'hidden'; document.body.style.touchAction = 'none'; }
    };
    const unlock = () => {
      getLenis()?.start();
      window.removeEventListener('wheel', block);
      window.removeEventListener('touchmove', block);
      window.removeEventListener('keydown', blockKey);
      if (isTouch) { document.body.style.overflow = ''; document.body.style.touchAction = ''; }
    };

    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
    let fallbackRaf = 0;
    const glideTo = (y: number, onDone: () => void) => {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(y, { duration: REVEAL_DURATION, easing: easeInOutCubic, lock: true, force: true, onComplete: onDone });
        return;
      }
      // No Lenis (shouldn't happen outside reduced motion) — animate the scroll ourselves
      const from = window.scrollY, t0 = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / (REVEAL_DURATION * 1000));
        window.scrollTo(0, from + (y - from) * easeInOutCubic(t));
        if (t < 1) fallbackRaf = requestAnimationFrame(step); else onDone();
      };
      fallbackRaf = requestAnimationFrame(step);
    };

    const startReveal = (start: number, end: number) => {
      revealState = 'running';
      lock();
      glideTo(start + 0.89 * (end - start), () => {
        holdTimer = window.setTimeout(() => { unlock(); revealState = 'done'; }, HOLD_DURATION);
      });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null;

    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            target = self.progress;
            wake();

            // Re-arm once they've scrolled back up into the turn
            if (revealState === 'done' && self.progress < TURN_END - 0.15) revealState = 'idle';

            // Only for the visitor's own downward scroll: not page-load scroll restoration or
            // a nav link passing through (no recent wheel/touch/key input).
            const userScrolling = performance.now() - lastUserInput < 1500;
            if (
              revealState === 'idle' && userScrolling && self.direction === 1 &&
              self.progress >= TURN_END && self.progress < 0.89
            ) {
              startReveal(self.start, self.end);
            }
          },
        });
      });
    })();

    return () => {
      loadObserver?.disconnect();
      cancelAnimationFrame(raf);
      cancelAnimationFrame(fallbackRaf);
      clearTimeout(holdTimer);
      unlock();
      window.removeEventListener('resize', measure);
      window.removeEventListener('wheel', noteInput);
      window.removeEventListener('touchmove', noteInput);
      window.removeEventListener('keydown', noteKey);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      className="goggles-scene"
      id="goggles-scene"
      ref={sectionRef}
      aria-label="Pilot's perspective reveal"
    >
      <div className="goggles-scene__sticky">

        {/* "STRAP IN." label */}
        <div className="goggles-label" ref={labelRef} id="gogglesLabel">
          <p className="eyebrow">The pilot&apos;s perspective</p>
          <h2 className="display goggles-label__title">Strap&nbsp;in.</h2>
        </div>

        {/* PNG sequence — zooms in via CSS on scroll */}
        <div ref={canvasWrapRef} className="seq-wrap" aria-hidden="true">
          <GogglesSequence scrollProg={scrollProg} turnEnd={TURN_END} />
        </div>

        {/* FPV video — fades in once zoom is complete */}
        <div
          ref={videoWrapRef}
          className="seq-video-wrap"
          aria-hidden="true"
        >
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>

        {/* HUD overlay */}
        <div className="seq-hud" ref={hudRef} id="seqHud">
          <div className="pov-hud__tl">
            <div className="pov-hud__rec"><span className="pov-hud__dot" />REC</div>
            <div>04:32:11</div>
          </div>
          <div className="pov-hud__tr">
            <div>ALT&nbsp;&nbsp;124M</div>
            <div>SPD&nbsp;&nbsp;89K/H</div>
            <div>BAT&nbsp;&nbsp;&nbsp;78%</div>
          </div>
          <div className="pov-hud__bl">
            <div>CH · ALPS</div>
            <div>46.52°N 8.14°E</div>
          </div>
          <div className="pov-hud__br">
            <div>AERIAL AURA</div>
            <div>FPV SYSTEM</div>
          </div>
        </div>

      </div>
    </section>
  );
}

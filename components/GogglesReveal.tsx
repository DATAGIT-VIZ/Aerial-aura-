'use client';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const GogglesSequence = dynamic(() => import('./GogglesSequence'), { ssr: false });

/* Mutable bridge — no React state, no re-renders */
const scrollProg = { value: 0 };

export default function GogglesReveal() {
  const sectionRef    = useRef<HTMLElement>(null);
  const labelRef      = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const videoWrapRef  = useRef<HTMLDivElement>(null);
  const videoRef      = useRef<HTMLVideoElement>(null);
  const hudRef        = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      scrollProg.value = 1;
      if (videoWrapRef.current) videoWrapRef.current.style.opacity = '1';
      if (hudRef.current)       hudRef.current.style.opacity       = '1';
      return;
    }

    // Pre-buffer the video so it's ready when the zoom completes
    const vid = videoRef.current;
    if (vid) { vid.load(); }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null;

    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const l   = labelRef.current;
      const cw  = canvasWrapRef.current;
      const vw  = videoWrapRef.current;
      const h   = hudRef.current;
      if (!l || !cw || !vw || !h) return;

      scrollProg.value = 0;
      vw.style.opacity = '0';
      h.style.opacity  = '0';

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,           // was 1.2 — much more responsive
            onUpdate: (self) => {
              scrollProg.value = self.progress;

              // ── Phase 2 (82–96%): CSS zoom punches through the lens ──
              const zp    = Math.max(0, (self.progress - 0.82) / 0.14);
              const scale = 1 + zp * 6;          // 1× → 7×
              const ty    = zp * -5;
              cw.style.transform       = `scale(${scale}) translateY(${ty}%)`;
              cw.style.transformOrigin = '50% 47%';

              // ── Video bleeds in (91%→96%) ──
              const vp = Math.max(0, Math.min(1, (self.progress - 0.91) / 0.05));
              vw.style.opacity = vp.toString();

              // ── HUD appears after video is up ──
              const hp = Math.max(0, Math.min(1, (self.progress - 0.96) / 0.03));
              h.style.opacity = hp.toString();

              // Video control: always restart from frame 0 on enter, reset on back
              if (vid) {
                if (self.progress > 0.83 && vid.paused) {
                  vid.currentTime = 0;
                  vid.play().catch(() => {});
                } else if (self.progress <= 0.80 && !vid.paused) {
                  vid.pause();
                  vid.currentTime = 0;
                }
              }
            },
          },
        });

        tl
          .to(l, { opacity: 0, y: -32, ease: 'power1.in', duration: 1.5 }, 0);
      });
    })();

    return () => { ctx?.revert(); };
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
          <GogglesSequence scrollProg={scrollProg} />
        </div>

        {/* FPV video — fades in once zoom is complete */}
        <div
          ref={videoWrapRef}
          className="seq-video-wrap"
          aria-hidden="true"
        >
          <video
            ref={videoRef}
            src="/video/ex.webm"
            autoPlay
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

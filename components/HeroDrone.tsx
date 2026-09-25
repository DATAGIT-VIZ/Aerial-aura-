'use client';
import { useRef, useEffect } from 'react';

export default function HeroDrone() {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef   = useRef<number>(0);

  // Current interpolated values
  const cur = useRef({ x: 0, y: 0, tilt: 0, scale: 1 });
  // Target values driven by pointer
  const tgt = useRef({ x: 0, y: 0, tilt: 0, scale: 1 });

  useEffect(() => {
    const hero = document.getElementById('top');
    if (!hero) return;

    const onMove = (e: PointerEvent) => {
      const wrap = wrapRef.current;
      if (!wrap) return;

      const hr  = hero.getBoundingClientRect();
      const wr  = wrap.getBoundingClientRect();

      // Pointer relative to hero centre
      const hcx = hr.left + hr.width  / 2;
      const hcy = hr.top  + hr.height / 2;
      const dx  = (e.clientX - hcx) / (hr.width  / 2); // –1 → +1
      const dy  = (e.clientY - hcy) / (hr.height / 2); // –1 → +1

      // Drone centre
      const dcx = wr.left + wr.width  / 2;
      const dcy = wr.top  + wr.height / 2;
      const ddx = e.clientX - dcx;
      const ddy = e.clientY - dcy;
      const dist = Math.sqrt(ddx * ddx + ddy * ddy);
      const proximity = Math.max(0, 1 - dist / 500); // 1 = right on top, 0 = far away

      // Translate: drone drifts toward cursor (max ±40px)
      tgt.current.x     = dx * 38;
      tgt.current.y     = dy * 22;
      // Tilt: lean in direction of horizontal movement
      tgt.current.tilt  = dx * 8;
      // Scale: subtle grow when cursor is close
      tgt.current.scale = 1 + proximity * 0.06;
    };

    const onLeave = () => {
      tgt.current = { x: 0, y: 0, tilt: 0, scale: 1 };
    };

    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);

    // RAF lerp loop — runs independently of React renders
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const EASE = 0.072; // lower = more lag = dreamier

    const tick = () => {
      const c = cur.current;
      const t = tgt.current;

      c.x     = lerp(c.x,     t.x,     EASE);
      c.y     = lerp(c.y,     t.y,     EASE);
      c.tilt  = lerp(c.tilt,  t.tilt,  EASE);
      c.scale = lerp(c.scale, t.scale, EASE);

      const wrap = wrapRef.current;
      if (wrap) {
        wrap.style.transform =
          `translate3d(${c.x.toFixed(2)}px, ${c.y.toFixed(2)}px, 0)` +
          ` rotate(${c.tilt.toFixed(3)}deg)` +
          ` scale(${c.scale.toFixed(4)})`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="drone-anchor" aria-hidden="true">
      {/* Outer: receives the pointer-driven lerp transform */}
      <div ref={wrapRef} className="drone-interactive">
        {/* Inner: the CSS bob animation lives here, layered on top */}
        <div className="drone-bob">
          <video
            ref={videoRef}
            className="drone-video"
            src="/video/drone.webm"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
      </div>
    </div>
  );
}

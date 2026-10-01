'use client';
import { useRef, useEffect } from 'react';

export default function HeroDrone() {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef   = useRef<number>(0);

  const cur = useRef({ x: 0, y: 0, rotZ: 0, rotX: 0, scale: 1 });
  const tgt = useRef({ x: 0, y: 0, rotZ: 0, rotX: 0, scale: 1 });

  useEffect(() => {
    const hero = document.getElementById('top');
    if (!hero) return;

    const onMove = (e: PointerEvent) => {
      const wrap = wrapRef.current;
      if (!wrap) return;

      const hr  = hero.getBoundingClientRect();
      const wr  = wrap.getBoundingClientRect();

      // Normalised pointer position within hero: –1 → +1
      const nx = (e.clientX - (hr.left + hr.width  / 2)) / (hr.width  / 2);
      const ny = (e.clientY - (hr.top  + hr.height / 2)) / (hr.height / 2);

      // Proximity to drone centre (0 = far, 1 = on top)
      const ddx = e.clientX - (wr.left + wr.width  / 2);
      const ddy = e.clientY - (wr.top  + wr.height / 2);
      const proximity = Math.max(0, 1 - Math.sqrt(ddx * ddx + ddy * ddy) / 480);

      // Agile: large range + 3D banking
      tgt.current.x    = nx * 72;          // ±72px horizontal drift
      tgt.current.y    = ny * 50;          // ±50px vertical drift
      tgt.current.rotZ = nx * 22;          // roll: bank into horizontal movement
      tgt.current.rotX = -ny * 14;         // pitch: nose up when cursor above
      tgt.current.scale = 1 + proximity * 0.1;
    };

    const onLeave = () => {
      tgt.current = { x: 0, y: 0, rotZ: 0, rotX: 0, scale: 1 };
    };

    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const EASE = 0.19; // snappy — reaches target in ~15 frames

    const tick = () => {
      const c = cur.current;
      const t = tgt.current;

      c.x     = lerp(c.x,     t.x,     EASE);
      c.y     = lerp(c.y,     t.y,     EASE);
      c.rotZ  = lerp(c.rotZ,  t.rotZ,  EASE);
      c.rotX  = lerp(c.rotX,  t.rotX,  EASE);
      c.scale = lerp(c.scale, t.scale, EASE);

      const wrap = wrapRef.current;
      if (wrap) {
        wrap.style.transform =
          `translate3d(${c.x.toFixed(2)}px, ${c.y.toFixed(2)}px, 0)` +
          ` perspective(800px)` +
          ` rotateX(${c.rotX.toFixed(3)}deg)` +
          ` rotateZ(${c.rotZ.toFixed(3)}deg)` +
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
      <div ref={wrapRef} className="drone-interactive">
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

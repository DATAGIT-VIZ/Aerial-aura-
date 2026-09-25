'use client';
import { useRef, useCallback, useEffect } from 'react';

export default function Drone() {
  const dragRef   = useRef<HTMLDivElement>(null);
  const dragging  = useRef(false);
  const startX    = useRef(0);
  const startY    = useRef(0);
  const rafId     = useRef<number>(0);
  const t0        = useRef(Date.now());

  /* ── autonomous figure-8 flight path ── */
  useEffect(() => {
    const fly = () => {
      if (!dragging.current) {
        const el = dragRef.current;
        if (el) {
          const elapsed = (Date.now() - t0.current) / 1000;
          const x = Math.sin(elapsed * 0.38) * 38;          // ±38 px horizontal
          const y = Math.sin(elapsed * 0.76) * 22;          // ±22 px vertical (2× freq → figure-8)
          const tilt = Math.cos(elapsed * 0.38) * 6;         // gentle bank ±6°
          el.style.transition = 'none';
          el.style.transform  = `translate3d(${x}px,${y}px,0) rotate(${tilt}deg)`;
        }
      }
      rafId.current = requestAnimationFrame(fly);
    };
    rafId.current = requestAnimationFrame(fly);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  /* ── parallax on pointer hover (hero section) ── */
  const onPointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (dragging.current) return;
    const el = dragRef.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const dx = Math.max(-22, Math.min(22, (e.clientX - (r.left + r.width  / 2)) / 16));
    const dy = Math.max(-16, Math.min(16, (e.clientY - (r.top  + r.height / 2)) / 16));
    el.style.transition = 'transform 0.35s ease-out';
    el.style.transform  = `translate3d(${dx}px,${dy}px,0) rotate(${dx / 6}deg)`;
  }, []);

  const onPointerLeave = useCallback(() => {
    if (dragging.current) return;
    // snap back — autonomous loop takes over immediately
    const el = dragRef.current;
    if (el) { el.style.transition = 'transform 0.5s ease-out'; }
  }, []);

  /* ── drag interaction ── */
  const onDragStart = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = dragRef.current;
    if (!el) return;
    dragging.current = true;
    el.setPointerCapture(e.pointerId);
    startX.current  = e.clientX;
    startY.current  = e.clientY;
    el.style.transition = 'none';
  }, []);

  const onDragMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = dragRef.current;
    if (!el || !dragging.current) return;
    const dx = Math.max(-100, Math.min(100, e.clientX - startX.current));
    const dy = Math.max(-75,  Math.min(75,  e.clientY - startY.current));
    el.style.transform = `translate3d(${dx}px,${dy}px,0) rotate(${dx / 8}deg)`;
  }, []);

  const onDragEnd = useCallback(() => {
    const el = dragRef.current;
    if (!el) return;
    dragging.current = false;
    // smooth spring-back; autonomous loop resumes on next RAF tick
    el.style.transition = 'transform 0.7s cubic-bezier(.2,1.4,.4,1)';
    el.style.transform  = 'translate3d(0,0,0) rotate(0deg)';
  }, []);

  return (
    <div
      className="drone-anchor"
      id="droneAnchor"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div
        className="drone-drag"
        ref={dragRef}
        id="droneDrag"
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={onDragEnd}
        onPointerCancel={onDragEnd}
      >
        <div className="drone-float">
          {/* 20 % bigger: was 160×130, now 200×162 */}
          <svg width="200" height="162" viewBox="0 0 200 162" aria-hidden="true">
            <defs>
              <radialGradient id="droneGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#59D6F2" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#59D6F2" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* ground glow */}
            <ellipse className="drone-glow" cx="100" cy="128" rx="52" ry="13" fill="url(#droneGlow)" />

            {/* arms */}
            <g stroke="var(--dim)" strokeWidth="2">
              <line x1="100" y1="88" x2="38"  y2="44" />
              <line x1="100" y1="88" x2="162" y2="44" />
              <line x1="100" y1="88" x2="38"  y2="112" />
              <line x1="100" y1="88" x2="162" y2="112" />
            </g>

            {/* rotor TL — sky blue */}
            <g transform="translate(38,44)">
              <g className="rotor-spin">
                <circle r="16" fill="none" stroke="var(--sky)" strokeWidth="1.5" opacity="0.78" />
                <line x1="-16" y1="0" x2="16" y2="0" stroke="var(--sky)" strokeWidth="1.2" />
                <line x1="0" y1="-16" x2="0" y2="16" stroke="var(--sky)" strokeWidth="1.2" />
              </g>
            </g>

            {/* rotor TR — sky blue */}
            <g transform="translate(162,44)">
              <g className="rotor-spin">
                <circle r="16" fill="none" stroke="var(--sky)" strokeWidth="1.5" opacity="0.78" />
                <line x1="-16" y1="0" x2="16" y2="0" stroke="var(--sky)" strokeWidth="1.2" />
                <line x1="0" y1="-16" x2="0" y2="16" stroke="var(--sky)" strokeWidth="1.2" />
              </g>
            </g>

            {/* rotor BL — copper */}
            <g transform="translate(38,112)">
              <g className="rotor-spin">
                <circle r="16" fill="none" stroke="var(--copper-soft)" strokeWidth="1.5" opacity="0.78" />
                <line x1="-16" y1="0" x2="16" y2="0" stroke="var(--copper-soft)" strokeWidth="1.2" />
                <line x1="0" y1="-16" x2="0" y2="16" stroke="var(--copper-soft)" strokeWidth="1.2" />
              </g>
            </g>

            {/* rotor BR — copper */}
            <g transform="translate(162,112)">
              <g className="rotor-spin">
                <circle r="16" fill="none" stroke="var(--copper-soft)" strokeWidth="1.5" opacity="0.78" />
                <line x1="-16" y1="0" x2="16" y2="0" stroke="var(--copper-soft)" strokeWidth="1.2" />
                <line x1="0" y1="-16" x2="0" y2="16" stroke="var(--copper-soft)" strokeWidth="1.2" />
              </g>
            </g>

            {/* body */}
            <rect x="73" y="70" width="54" height="32" rx="8" fill="var(--panel-2)" stroke="var(--paper)" strokeWidth="1.4" />
            {/* camera lens */}
            <circle cx="100" cy="107" r="8" fill="var(--ink)" stroke="var(--copper-soft)" strokeWidth="1.4" />
            {/* status LED */}
            <circle className="drone-light" cx="118" cy="77" r="3" fill="var(--copper)" />
          </svg>
        </div>
        <div className="drone-hint">drag me</div>
      </div>
    </div>
  );
}

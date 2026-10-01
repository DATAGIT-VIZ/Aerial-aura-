'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos     = useRef({ x: -100, y: -100 });
  const ring    = useRef({ x: -100, y: -100 });
  const rafRef  = useRef<number>(0);

  useEffect(() => {
    // Don't activate on touch-only devices
    if (window.matchMedia('(hover: none)').matches) return;

    const dot  = dotRef.current!;
    const ringEl = ringRef.current!;

    const onMove = (e: PointerEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onDown  = () => dot.classList.add('cursor-dot--click');
    const onUp    = () => dot.classList.remove('cursor-dot--click');

    const onEnterLink = () => ringEl.classList.add('cursor-ring--hover');
    const onLeaveLink = () => ringEl.classList.remove('cursor-ring--hover');

    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('pointerup',   onUp);

    const links = document.querySelectorAll<HTMLElement>('a, button, [role="button"], .card');
    links.forEach(el => {
      el.addEventListener('pointerenter', onEnterLink);
      el.addEventListener('pointerleave', onLeaveLink);
    });

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const RING_EASE = 0.12;

    const tick = () => {
      const { x, y } = pos.current;
      dot.style.transform  = `translate(${x}px, ${y}px)`;

      ring.current.x = lerp(ring.current.x, x, RING_EASE);
      ring.current.y = lerp(ring.current.y, y, RING_EASE);
      ringEl.style.transform = `translate(${ring.current.x.toFixed(2)}px, ${ring.current.y.toFixed(2)}px)`;

      rafRef.current = requestAnimationFrame(tick);
    };

    // Show cursors
    dot.style.opacity   = '1';
    ringEl.style.opacity = '1';
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerup',   onUp);
      links.forEach(el => {
        el.removeEventListener('pointerenter', onEnterLink);
        el.removeEventListener('pointerleave', onLeaveLink);
      });
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}

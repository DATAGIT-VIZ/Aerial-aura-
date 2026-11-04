'use client';
import { useEffect, useRef, useState } from 'react';

const TOTAL = 58;
const PAD   = (n: number) => String(n).padStart(3, '0');
// WebP frames (~25 KB each vs ~180 KB PNG). Phones get an 896px-wide set, which is still
// 2× the on-screen size there. Source PNGs stay in /frames for re-exporting.
const urls  = (folder: string) =>
  Array.from({ length: TOTAL }, (_, i) => `/frames/${folder}/goggles_${PAD(i + 1)}.webp`);

interface Props {
  scrollProg: { value: number };
  turnEnd: number;   // progress at which the turn finishes (holds on the last frame after)
}

export default function GogglesSequence({ scrollProg, turnEnd }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded,   setLoaded]   = useState(false);
  const [progress, setProgress] = useState(0);

  // ── Preload all frames (after the page's first load, so the hero goes first) ──
  useEffect(() => {
    let cancelled = false;
    const folder = window.matchMedia('(max-width: 600px)').matches ? 'webp-mobile' : 'webp';

    const start = () => {
      let done = 0;
      const imgs: HTMLImageElement[] = new Array(TOTAL);
      urls(folder).forEach((src, i) => {
        const img = new window.Image();
        const finish = () => {
          if (cancelled) return;
          imgs[i] = img;
          done++;
          setProgress(Math.round((done / TOTAL) * 100));
          if (done === TOTAL) { imagesRef.current = imgs; setLoaded(true); }
        };
        img.onload = () => {
          // Warm the decode in the background so drawing a frame mid-scroll doesn't stall.
          // Not awaited: browsers may postpone decode() (e.g. in a background tab).
          img.decode().catch(() => {});
          finish();
        };
        img.onerror = finish;
        img.src = src;
      });
    };

    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    return () => { cancelled = true; window.removeEventListener('load', start); };
  }, []);

  // ── Draw loop ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let raf = 0;
    let lastW = 0, lastH = 0, lastDpr = 0;
    let lastPos = -1;

    const draw = () => {
      raf = requestAnimationFrame(draw);

      // Scroll 0→turnEnd turns the goggles through every frame, then holds on the last one.
      // `pos` is fractional (e.g. 12.4 = frame 12 blended 40% into frame 13).
      const pos = Math.min(scrollProg.value / turnEnd, 1) * (TOTAL - 1);

      const cssW = canvas.clientWidth;
      const cssH = canvas.clientHeight;
      const dpr  = Math.min(window.devicePixelRatio || 1, 2); // cap at 2× for perf

      // Resize the backing store when needed (this resets the context state)
      if (cssW !== lastW || cssH !== lastH || dpr !== lastDpr) {
        canvas.width  = Math.round(cssW * dpr);
        canvas.height = Math.round(cssH * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        lastW = cssW; lastH = cssH; lastDpr = dpr;
        lastPos = -1; // force redraw
      }

      if (Math.abs(pos - lastPos) < 0.001) return;
      lastPos = pos;

      const i0   = Math.floor(pos);
      const i1   = Math.min(i0 + 1, TOTAL - 1);
      const frac = pos - i0;
      const a = imagesRef.current[i0];
      const b = imagesRef.current[i1];
      if (!a?.naturalWidth) return;

      // Dark background (frames are transparent)
      ctx.fillStyle = '#0B0D10';
      ctx.fillRect(0, 0, cssW, cssH);

      // Mobile canvas is landscape-sized (58vw tall): fill it edge-to-edge
      const fill  = cssW < 640 ? 1.0 : 0.90;
      const scale = Math.min((cssW * fill) / a.naturalWidth, (cssH * fill) / a.naturalHeight);
      const dw = a.naturalWidth  * scale;
      const dh = a.naturalHeight * scale;
      const dx = (cssW - dw) / 2;
      const dy = (cssH - dh) / 2;

      // Cross-fade into the next frame for in-between positions — the turn reads as
      // continuous motion instead of 58 separate steps.
      ctx.globalAlpha = 1;
      ctx.drawImage(a, dx, dy, dw, dh);
      if (frac > 0.01 && b?.naturalWidth && b !== a) {
        ctx.globalAlpha = frac;
        ctx.drawImage(b, dx, dy, dw, dh);
        ctx.globalAlpha = 1;
      }
    };

    // Only run the loop while the canvas is on screen.
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) { lastPos = -1; raf = requestAnimationFrame(draw); }
    });
    observer.observe(canvas);

    return () => { observer.disconnect(); cancelAnimationFrame(raf); };
  }, [loaded, scrollProg, turnEnd]);

  return (
    <>
      {!loaded && (
        <div className="seq-loading">
          <span className="eyebrow">Preparing · {progress}%</span>
          <div className="seq-loading__bar">
            <div className="seq-loading__fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="seq-canvas"
        aria-hidden="true"
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </>
  );
}

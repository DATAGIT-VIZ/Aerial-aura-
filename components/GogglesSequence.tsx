'use client';
import { useEffect, useRef, useState } from 'react';

const TOTAL  = 58;
const FOLDER = '/frames';
const PAD    = (n: number) => String(n).padStart(3, '0');
const SRC    = (n: number) => `${FOLDER}/goggles_${PAD(n)}_rgba.png`;
const URLS   = Array.from({ length: TOTAL }, (_, i) => SRC(i + 1));

interface Props { scrollProg: { value: number } }

export default function GogglesSequence({ scrollProg }: Props) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const imagesRef  = useRef<HTMLImageElement[]>([]);
  const rafRef     = useRef<number>(0);
  const frameRef   = useRef<number>(-1);
  const dprRef     = useRef<number>(1);
  const [loaded,   setLoaded]   = useState(false);
  const [progress, setProgress] = useState(0);

  // ── Preload all frames ──────────────────────────────────────────────────
  useEffect(() => {
    let done = 0;
    const imgs: HTMLImageElement[] = new Array(TOTAL);

    URLS.forEach((src, i) => {
      const img = new window.Image();
      img.decoding = 'async';
      img.src = src;
      const finish = () => {
        imgs[i] = img;
        done++;
        setProgress(Math.round((done / TOTAL) * 100));
        if (done === TOTAL) { imagesRef.current = imgs; setLoaded(true); }
      };
      img.onload  = finish;
      img.onerror = finish;
    });
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Draw loop ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Best possible image rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    let lastW = 0, lastH = 0;

    const draw = () => {
      // Map scroll: 0–80% → frames 0–71, hold on 71 after that
      const p      = Math.min(scrollProg.value / 0.80, 1);
      const target = Math.round(p * (TOTAL - 1));
      const img    = imagesRef.current[target];

      const cssW = canvas.clientWidth;
      const cssH = canvas.clientHeight;
      const dpr  = Math.min(window.devicePixelRatio || 1, 2); // cap at 2× for perf

      // Resize canvas backing store when needed — resets ctx transform
      if (cssW !== lastW || cssH !== lastH || dpr !== dprRef.current) {
        canvas.width  = Math.round(cssW * dpr);
        canvas.height = Math.round(cssH * dpr);
        ctx.scale(dpr, dpr);
        // Re-apply quality settings after resize (ctx is reset)
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        lastW = cssW; lastH = cssH; dprRef.current = dpr;
        frameRef.current = -1; // force redraw
      }

      if (!img || target === frameRef.current) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      frameRef.current = target;

      // Dark background (image is RGBA transparent)
      ctx.fillStyle = '#0B0D10';
      ctx.fillRect(0, 0, cssW, cssH);

      // Mobile canvas is landscape-sized (58vw tall): fill it edge-to-edge
      const fill  = cssW < 640 ? 1.0 : 0.90;
      const scale = Math.min(
        (cssW * fill) / img.naturalWidth,
        (cssH * fill) / img.naturalHeight,
      );
      const dw = img.naturalWidth  * scale;
      const dh = img.naturalHeight * scale;
      const dx = (cssW - dw) / 2;
      const dy = (cssH - dh) / 2;

      ctx.drawImage(img, dx, dy, dw, dh);

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loaded, scrollProg]);

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

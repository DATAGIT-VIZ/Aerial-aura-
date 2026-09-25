'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { portfolio, PortfolioItem, Category } from '@/content/portfolio';

const CATS: ('All' | Category)[] = ['All', 'Weddings', 'Real Estate', 'Freestyle', 'Cinematic'];

const ACCENT: Record<Category, string> = {
  Weddings:    'var(--copper-soft)',
  'Real Estate': 'var(--sky)',
  Freestyle:   'var(--sky)',
  Cinematic:   'var(--copper-soft)',
};

function PlaceholderArt({ item }: { item: PortfolioItem }) {
  const color = ACCENT[item.category];
  return (
    <div className="card__art" style={{ '--card-accent': color } as React.CSSProperties}>
      <svg className="card__path" viewBox="0 0 400 500" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-20,400 Q100,200 200,250 Q300,300 420,100" />
        <path d="M-20,460 Q120,300 220,340 Q320,380 420,200" opacity="0.5" />
      </svg>
    </div>
  );
}

function Lightbox({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', esc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="lightbox__inner">
        <button className="lightbox__close" onClick={onClose} aria-label="Close">✕</button>

        <div className="lightbox__player">
          {item.muxPlaybackId ? (
            // @ts-expect-error — mux-player custom element
            <mux-player
              playback-id={item.muxPlaybackId}
              metadata-video-title={item.title}
              accent-color="var(--copper)"
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <div className="lightbox__placeholder">
              <PlaceholderArt item={item} />
              <p className="lightbox__placeholder-msg">
                Footage coming soon — Mux playback ID not yet set.
              </p>
            </div>
          )}
        </div>

        <div className="lightbox__meta">
          <span className="eyebrow" style={{ color: ACCENT[item.category] }}>{item.category}</span>
          <h2 className="lightbox__title display">{item.title}</h2>
          <p className="lightbox__log">{item.flightLog}</p>
        </div>
      </div>
    </div>
  );
}

export default function WorkClient() {
  const [filter, setFilter] = useState<'All' | Category>('All');
  const [active, setActive] = useState<PortfolioItem | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const filtered = filter === 'All' ? portfolio : portfolio.filter(p => p.category === filter);

  const open  = useCallback((item: PortfolioItem) => setActive(item), []);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      {/* Filter bar */}
      <div className="work-filter" ref={filterRef}>
        {CATS.map(cat => (
          <button
            key={cat}
            className={`work-filter__btn${filter === cat ? ' active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="work-grid-full">
        {filtered.map(item => (
          <button
            key={item.id}
            className="card"
            style={{ '--card-accent': ACCENT[item.category] } as React.CSSProperties}
            onClick={() => open(item)}
            aria-label={`View ${item.title}`}
          >
            <PlaceholderArt item={item} />
            <span className="card__tag">{item.category}</span>
            <span className="card__play" aria-hidden="true" />
            <div className="card__meta">
              <div className="card__title">{item.title}</div>
              <div className="card__log">{item.flightLog}</div>
            </div>
          </button>
        ))}
      </div>

      {active && <Lightbox item={active} onClose={close} />}
    </>
  );
}

import type { PortfolioItem } from '@/content/portfolio';

type Props = { item: PortfolioItem };

export default function Card({ item }: Props) {
  const pathD: Record<string, string> = {
    'alpine-chalet':    'M -20,300 C 80,250 120,340 200,180 S 320,60 340,20',
    'lakeside-villa':   'M -20,80 C 100,120 140,20 260,90 S 320,300 340,340',
    'freeride-line':    'M -20,340 C 120,300 60,120 220,140 S 300,40 340,10',
    'glacier-line':     'M -20,200 C 100,60 160,340 260,200 S 320,120 340,160',
    'vineyard-terraces':'M -20,60 C 120,140 80,300 240,260 S 300,340 340,320',
    'rooftop-reception':'M -20,320 C 140,340 100,140 220,120 S 320,180 340,140',
  };

  const accentMap: Record<string, string> = {
    Weddings:    'var(--copper)',
    'Real Estate':'var(--sky)',
    Freestyle:   'var(--copper-soft)',
    Cinematic:   'var(--sky-dim)',
  };

  const accent = accentMap[item.category] ?? 'var(--sky)';

  return (
    <article
      className="card"
      style={{ '--card-accent': accent } as React.CSSProperties}
    >
      <div className="card__art" />
      <svg className="card__path" viewBox="0 0 300 375" aria-hidden="true">
        <path d={pathD[item.id] ?? 'M -20,200 C 100,100 200,300 340,200'} />
      </svg>
      <span className="card__tag">{item.category}</span>
      <div className="card__play" aria-hidden="true" />
      <div className="card__meta">
        <div className="card__title">{item.title}</div>
        <div className="card__log">{item.flightLog}</div>
      </div>
    </article>
  );
}

import Link from 'next/link';
import { portfolio } from '@/content/portfolio';
import Card from './Card';

export default function WorkGrid() {
  return (
    <section className="section work" id="work">
      <div className="wrap">
        <div className="work__head">
          <div className="work__head-left">
            <span className="work__count">06</span>
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="display work__title">The reel</h2>
            </div>
          </div>
          <Link href="/work" className="btn work__all">
            View all flights →
          </Link>
        </div>
        <div className="work__grid">
          {portfolio.map((item, i) => (
            <Card key={item.id} item={item} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

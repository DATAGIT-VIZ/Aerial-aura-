import { testimonials } from '@/content/testimonials';

export default function Testimonials() {
  const [featured, ...rest] = testimonials;

  return (
    <section className="testi">
      <div className="wrap">
        <p className="eyebrow testi__eyebrow">Word from the ground</p>

        {/* Featured quote — full width, cinematic */}
        {featured && (
          <blockquote className="testi__featured">
            <span className="testi__open-quote" aria-hidden="true">&ldquo;</span>
            <p className="testi__featured-text">{featured.quote}</p>
            <footer className="testi__featured-foot">
              <cite className="testi__by">— {featured.by}</cite>
              {featured.category && (
                <span className="testi__cat">{featured.category}</span>
              )}
            </footer>
          </blockquote>
        )}

        {/* Supporting quotes */}
        {rest.length > 0 && (
          <div className="testi__grid">
            {rest.map((t, i) => (
              <blockquote key={t.id} className="testi__card">
                <span className="testi__index" aria-hidden="true">0{i + 2}</span>
                <p className="testi__text">&ldquo;{t.quote}&rdquo;</p>
                <footer className="testi__foot">
                  <cite className="testi__by">— {t.by}</cite>
                  {t.category && <span className="testi__cat">{t.category}</span>}
                </footer>
              </blockquote>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

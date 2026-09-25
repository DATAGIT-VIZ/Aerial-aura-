import { testimonials } from '@/content/testimonials';

export default function Testimonials() {
  return (
    <section className="testi">
      <div className="wrap">
        <p className="eyebrow testi__eyebrow">Word from the ground</p>
        <div className="testi__grid">
          {testimonials.map((t, i) => (
            <blockquote key={t.id} className="testi__card">
              <span className="testi__index" aria-hidden="true">0{i + 1}</span>
              <p className="testi__text">&ldquo;{t.quote}&rdquo;</p>
              <footer className="testi__foot">
                <cite className="testi__by">— {t.by}</cite>
                {t.category && <span className="testi__cat">{t.category}</span>}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="wrap about__grid">

        {/* Portrait placeholder — swap src when photo is ready */}
        <div className="about__visual" aria-hidden="true">
          <span className="about__corner about__corner--tl" />
          <span className="about__corner about__corner--tr" />
          <span className="about__corner about__corner--bl" />
          <span className="about__corner about__corner--br" />
          <div className="about__photo-placeholder">
            <svg viewBox="0 0 360 480" className="about__svg">
              <line x1="0"   y1="240" x2="360" y2="240" stroke="var(--line)" strokeWidth="0.6" />
              <line x1="180" y1="0"   x2="180" y2="480" stroke="var(--line)" strokeWidth="0.6" />
              <circle cx="180" cy="240" r="110" fill="none" stroke="var(--line)" strokeWidth="0.7" />
              <circle cx="180" cy="240" r="58"  fill="none" stroke="var(--line-strong)" strokeWidth="0.6" strokeDasharray="4 6" />
              <path d="M 50,290 C 110,170 250,320 310,160" fill="none" stroke="var(--copper)" strokeWidth="1.2" opacity="0.7" />
              <path d="M 80,390 L 180,100 L 280,390 Z" fill="none" stroke="var(--sky)" strokeWidth="0.8" opacity="0.4" />
              <circle cx="180" cy="240" r="4" fill="var(--copper)" />
              <circle cx="180" cy="240" r="1.5" fill="var(--paper)" />
            </svg>
            <span className="about__photo-label">Portrait · Pending</span>
          </div>
          <span className="about__vl about__vl--tl">46.9°N</span>
          <span className="about__vl about__vl--tr">7.4°E</span>
          <span className="about__vl about__vl--bl">ALT 118M</span>
          <span className="about__vl about__vl--br">SPD 94</span>
        </div>

        <div className="about__content">
          <p className="eyebrow">The pilot</p>

          <blockquote className="about__lede">
            &ldquo;Ten years in a kitchen taught me that a half-second late
            is a ruined plate. Flying FPV is the same discipline at 90&nbsp;km/h.&rdquo;
          </blockquote>

          <p className="about__body">
            Trained and working as a chef in Switzerland, [Pilot Name] picked up a drone to
            unwind between services — and it took over. What began as freestyle clips for friends
            turned into wedding flyovers, real estate walkthroughs and brand films shared with a
            growing audience on YouTube and Instagram. Still cooking. Flying a lot more now.
          </p>

          <div className="about__stats">
            <div className="about__stat">
              <b>60+</b>
              <span>Flights logged</span>
            </div>
            <div className="about__stat">
              <b>4</b>
              <span>Disciplines</span>
            </div>
            <div className="about__stat">
              <b>CH</b>
              <span>Based, EU-wide</span>
            </div>
          </div>

          <div className="about__certs">
            <span className="about__cert">A1/A3 Certified</span>
            <span className="about__cert">A2 Licensed</span>
            <span className="about__cert">Fully Insured</span>
          </div>
        </div>

      </div>
    </section>
  );
}

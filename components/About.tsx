export default function About() {
  return (
    <section className="section about" id="about">
      <div className="wrap about__grid">

        <div className="about__visual" aria-hidden="true">
          <span className="about__corner about__corner--tl" />
          <span className="about__corner about__corner--tr" />
          <span className="about__corner about__corner--bl" />
          <span className="about__corner about__corner--br" />
          <svg viewBox="0 0 400 400" className="about__svg">
            <line x1="0" y1="200" x2="400" y2="200" stroke="var(--line)" strokeWidth="0.7" />
            <line x1="200" y1="0" x2="200" y2="400" stroke="var(--line)" strokeWidth="0.7" />
            <circle cx="200" cy="200" r="130" fill="none" stroke="var(--line)" strokeWidth="0.8" />
            <circle cx="200" cy="200" r="68"  fill="none" stroke="var(--line-strong)" strokeWidth="0.7" strokeDasharray="5 7" />
            <path d="M 60,240 C 120,120 260,300 340,140" fill="none" stroke="var(--copper)" strokeWidth="1.4" />
            <path d="M 100,340 L 200,88 L 300,340 Z" fill="none" stroke="var(--sky)" strokeWidth="1" opacity="0.55" />
            <circle cx="200" cy="200" r="5" fill="var(--copper)" />
            <circle cx="200" cy="200" r="2" fill="var(--paper)" />
          </svg>
          <span className="about__vl about__vl--tl">46.9°N</span>
          <span className="about__vl about__vl--tr">7.4°E</span>
          <span className="about__vl about__vl--bl">ALT 118M</span>
          <span className="about__vl about__vl--br">SPD 94</span>
        </div>

        <div className="about__content">
          <p className="eyebrow">The pilot</p>
          <p className="about__lede">
            &ldquo;Ten years in a kitchen taught me that a half-second late is a ruined plate.
            Flying FPV is the same discipline at 90&nbsp;km/h.&rdquo;
          </p>
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
              <span>Based, travels EU-wide</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

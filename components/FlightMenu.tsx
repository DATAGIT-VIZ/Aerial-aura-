import Link from 'next/link';

const WHATSAPP = '41XXXXXXXXX';

const packages = [
  {
    course: '01',
    label: 'Apéritif',
    name: 'Social Reel',
    desc: 'A single-location flight built for Instagram and Shorts — fast turnaround, high-impact cuts.',
    specs: ['1 location', '2H flight window', '3 vertical edits'],
    price: 'CHF —',
    turnaround: '48H turnaround',
    waMessage: "Hi%2C+I%27m+interested+in+the+Social+Reel+package.",
  },
  {
    course: '02',
    label: 'Tasting Menu',
    name: 'Real Estate / Brand',
    desc: 'Half-day cinematic walkthrough with aerial stills, built to sell a space or a story.',
    specs: ['Half-day shoot', '1 long-form film', '3 cutdowns'],
    price: 'CHF —',
    turnaround: '5-day turnaround',
    waMessage: "Hi%2C+I%27m+interested+in+the+Real+Estate+%2F+Brand+package.",
  },
  {
    course: '03',
    label: 'Grand Menu',
    name: 'Full Wedding Coverage',
    desc: 'Ground and aerial coverage across the full day — ceremony flyover, highlight film, raw archive.',
    specs: ['Full-day coverage', 'Ground + air', 'Highlight film'],
    price: 'CHF —',
    turnaround: '3-week turnaround',
    waMessage: "Hi%2C+I%27m+interested+in+the+Full+Wedding+Coverage+package.",
  },
];

export default function FlightMenu() {
  return (
    <section className="section menu" id="menu">
      <div className="wrap">
        <div className="menu__head">
          <div className="menu__head-left">
            <span className="menu__count">03</span>
            <div>
              <p className="eyebrow">Packages</p>
              <h2 className="display menu__title">The flight menu</h2>
            </div>
          </div>
          <p className="menu__note">
            Pricing confirmed once scope is locked. All packages include colour grade and delivery.
          </p>
        </div>

        <div className="menu__list">
          {packages.map(pkg => (
            <div className="menu__item" key={pkg.course}>
              <div className="menu__accent" aria-hidden="true" />

              {/* Course column */}
              <div className="menu__course-col">
                <span className="menu__num">{pkg.course}</span>
                <span className="menu__label">{pkg.label}</span>
              </div>

              {/* Body column */}
              <div className="menu__body">
                <h3 className="menu__name">{pkg.name}</h3>
                <p className="menu__desc">{pkg.desc}</p>
                <ul className="menu__specs">
                  {pkg.specs.map(s => <li key={s}>{s}</li>)}
                </ul>
              </div>

              {/* CTA column */}
              <div className="menu__cta-col">
                <div className="menu__price-block">
                  <span className="menu__from">From</span>
                  <span className="menu__price">{pkg.price}</span>
                  <span className="menu__turnaround">{pkg.turnaround}</span>
                </div>
                <Link
                  href={`https://wa.me/${WHATSAPP}?text=${pkg.waMessage}`}
                  className="btn btn--solid menu__book"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book this package →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="menu__footer-note">
          Custom scopes welcome — describe what you need and we&apos;ll build a bespoke package.
        </p>
      </div>
    </section>
  );
}

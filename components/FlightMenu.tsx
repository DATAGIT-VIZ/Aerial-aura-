import Link from 'next/link';

const WHATSAPP = '41XXXXXXXXX';

const packages = [
  {
    course: '01',
    label: 'Apéritif',
    name: 'Social Reel',
    desc: 'A single-location flight built for Instagram and Shorts — fast turnaround, high-impact cuts.',
    specs: ['1 location', '2H flight window', '3 vertical edits'],
    price: 'From CHF —',
    turnaround: '48H turnaround',
    waMessage: "Hi%2C+I%27m+interested+in+the+Social+Reel+package.",
  },
  {
    course: '02',
    label: 'Tasting Menu',
    name: 'Real Estate / Brand',
    desc: 'Half-day cinematic walkthrough with aerial stills, built to sell a space or a story.',
    specs: ['Half-day shoot', '1 long-form film', '3 cutdowns'],
    price: 'From CHF —',
    turnaround: '5-day turnaround',
    waMessage: "Hi%2C+I%27m+interested+in+the+Real+Estate+%2F+Brand+package.",
  },
  {
    course: '03',
    label: 'Grand Menu',
    name: 'Full Wedding Coverage',
    desc: 'Ground and aerial coverage across the full day — ceremony flyover, highlight film, raw archive.',
    specs: ['Full-day coverage', 'Ground + air', 'Highlight film'],
    price: 'From CHF —',
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
            Course names on purpose. Pricing confirmed once scope is locked with the client.
          </p>
        </div>

        <div className="menu__list">
          {packages.map(pkg => (
            <div className="menu__item" key={pkg.course}>
              <div className="menu__accent" aria-hidden="true" />
              <div className="menu__course-col">
                <span className="menu__num">{pkg.course}</span>
                <span className="menu__label">{pkg.label}</span>
              </div>
              <div className="menu__body">
                <div className="menu__name">{pkg.name}</div>
                <p className="menu__desc">{pkg.desc}</p>
                <ul className="menu__specs">
                  {pkg.specs.map(s => <li key={s}>{s}</li>)}
                </ul>
              </div>
              <div className="menu__cta-col">
                <div className="menu__price">
                  {pkg.price}
                  <small>{pkg.turnaround}</small>
                </div>
                <Link
                  href={`https://wa.me/${WHATSAPP}?text=${pkg.waMessage}`}
                  className="btn btn--solid menu__book"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

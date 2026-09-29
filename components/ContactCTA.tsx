import Link from 'next/link';

const WA_NUMBER = '41XXXXXXXXX';
const WA_MSG = encodeURIComponent("Hi, I'd like to enquire about aerial cinematography. Here are my details:");
const MAILTO  = 'hello@aerialaura.ch';

export default function ContactCTA() {
  return (
    <section className="section contact" id="contact">
      <div className="wrap contact__grid">

        {/* Left: headline + WhatsApp CTA */}
        <div className="contact__left">
          <p className="eyebrow">Get in touch</p>
          <h2 className="display contact__title">File a<br />flight plan</h2>
          <p className="contact__sub">
            Tell me the date, the place and what you need captured — I&apos;ll come back
            with availability and a quote within 48 hours.
          </p>
          <div className="contact__actions">
            <Link
              href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
              className="btn btn--solid contact__wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Message on WhatsApp
            </Link>
            <Link href={`mailto:${MAILTO}`} className="btn contact__email">
              {MAILTO}
            </Link>
          </div>
        </div>

        {/* Right: Netlify contact form */}
        <div className="contact__right">
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="contact__form"
          >
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="bot-field" />

            <div className="contact__row-fields">
              <div className="contact__field">
                <label className="contact__label" htmlFor="cf-name">Name</label>
                <input
                  id="cf-name"
                  name="name"
                  type="text"
                  className="contact__input"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="contact__field">
                <label className="contact__label" htmlFor="cf-email">Email</label>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  className="contact__input"
                  placeholder="you@email.com"
                  required
                />
              </div>
            </div>

            <div className="contact__row-fields">
              <div className="contact__field">
                <label className="contact__label" htmlFor="cf-type">Project type</label>
                <select id="cf-type" name="type" className="contact__input contact__select">
                  <option value="">Select…</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Brand">Brand film</option>
                  <option value="Freestyle">Freestyle / FPV</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="contact__field">
                <label className="contact__label" htmlFor="cf-date">Shoot date</label>
                <input
                  id="cf-date"
                  name="date"
                  type="text"
                  className="contact__input"
                  placeholder="e.g. June 2026"
                />
              </div>
            </div>

            <div className="contact__field">
              <label className="contact__label" htmlFor="cf-msg">Details</label>
              <textarea
                id="cf-msg"
                name="message"
                className="contact__input contact__textarea"
                placeholder="Location, special requirements, anything else…"
                rows={4}
                required
              />
            </div>

            <button type="submit" className="btn btn--solid contact__submit">
              Send flight plan →
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}

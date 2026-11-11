'use client';
import { useState } from 'react';
import Link from 'next/link';
import { business } from '@/lib/business';

// Enquiry form, sent by app/api/contact/route.ts. Used on the home page and the contact page.

type Status = 'idle' | 'sending' | 'sent' | 'error';

const ERRORS: Record<string, string> = {
  invalid:      'Please add your name, a valid email and a few details.',
  rate_limited: 'Too many messages in a short time. Please try again in a few minutes.',
};

const alternatives = [
  business.email && `email ${business.email}`,
  business.whatsapp && 'message on WhatsApp',
].filter(Boolean).join(' or ');

const FALLBACK = alternatives
  ? `Couldn't send right now. Please ${alternatives}.`
  : "Couldn't send right now. Please try again in a few minutes.";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error,  setError]  = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending'); setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) { setStatus('sent'); form.reset(); return; }
      setError(ERRORS[data.error] ?? FALLBACK);
    } catch {
      setError(FALLBACK);
    }
    setStatus('error');
  }

  if (status === 'sent') {
    return (
      <div className="contact__sent" role="status">
        <p className="eyebrow">Flight plan received</p>
        <p className="contact__sent-title display">Thank you — I&apos;ll be in touch within 48 hours.</p>
        <button type="button" className="btn" onClick={() => setStatus('idle')}>Send another</button>
      </div>
    );
  }

  return (
    <form method="POST" action="/api/contact" className="contact__form" onSubmit={onSubmit}>
      {/* Spam trap: hidden from people, bots fill it in */}
      <div className="contact__trap" aria-hidden="true">
        <label htmlFor="cf-bot">Leave this empty</label>
        <input id="cf-bot" name="bot-field" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="contact__row-fields">
        <div className="contact__field">
          <label className="contact__label" htmlFor="cf-name">Name</label>
          <input
            id="cf-name"
            name="name"
            type="text"
            className="contact__input"
            placeholder="Your name"
            autoComplete="name"
            maxLength={120}
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
            autoComplete="email"
            inputMode="email"
            maxLength={200}
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
            placeholder="e.g. June 2027"
            maxLength={80}
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
          maxLength={4000}
          required
        />
      </div>

      <button type="submit" className="btn btn--solid contact__submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send flight plan →'}
      </button>
      <p className="contact__form-privacy">
        Your details are only used to answer your enquiry. See the <Link href="/legal/privacy">privacy policy</Link>.
      </p>
      <p className="contact__error" role="alert" aria-live="assertive">
        {status === 'error' ? error : ''}
      </p>
    </form>
  );
}

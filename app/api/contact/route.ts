// Contact form endpoint: validates the enquiry and emails it via Resend (resend.com).
//
// Environment variables (set in the host's dashboard, never in the code):
//   RESEND_API_KEY      required. Without it the form answers "not configured" and the
//                       page tells visitors to use email or WhatsApp instead.
//   CONTACT_TO_EMAIL    where enquiries go. Defaults to the email in lib/business.ts.
//   CONTACT_FROM_EMAIL  sender, on a domain verified in Resend,
//                       e.g. "Aerial Aura Website <website@aerialaurastudio.com>".
//                       Defaults to Resend's test sender, which only delivers to the
//                       Resend account owner's own address.

import { business } from '@/lib/business';

const TO   = process.env.CONTACT_TO_EMAIL   || business.email;
const FROM = process.env.CONTACT_FROM_EMAIL || 'Aerial Aura Website <onboarding@resend.dev>';

const TYPES = new Set(['', 'Wedding', 'Real Estate', 'Brand', 'Freestyle', 'Other']);
const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]{2,}$/;

// Best-effort rate limit: 5 enquiries per visitor per 10 minutes. It lives in memory, so
// each server instance keeps its own count, which is enough to stop casual flooding.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(t => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return recent.length > MAX_PER_WINDOW;
}

const oneLine = (v: unknown, max: number) =>
  String(v ?? '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);

const escapeHtml = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const json = (body: object, status = 200) => Response.json(body, { status });

export async function POST(request: Request) {
  // Only accept submissions from this site's own pages.
  const origin = request.headers.get('origin');
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  if (origin && host && new URL(origin).host !== host) {
    return json({ ok: false, error: 'forbidden' }, 403);
  }

  const isJson = (request.headers.get('content-type') ?? '').includes('application/json');
  let raw: Record<string, unknown>;
  try {
    raw = isJson
      ? await request.json()
      : Object.fromEntries((await request.formData()).entries());
  } catch {
    return json({ ok: false, error: 'invalid' }, 400);
  }

  // Without JavaScript the browser posts the form directly; send the visitor somewhere useful.
  const done = (status: number, body: object) =>
    isJson ? json(body, status) : Response.redirect(new URL('/contact', request.url), 303);

  // Spam trap: real visitors never see or fill this field. Pretend it worked.
  if (oneLine(raw['bot-field'], 200)) return done(200, { ok: true });

  const name    = oneLine(raw.name, 120);
  const email   = oneLine(raw.email, 200);
  const type    = oneLine(raw.type, 40);
  const date    = oneLine(raw.date, 80);
  const message = String(raw.message ?? '').trim().slice(0, 4000);

  if (!name || !EMAIL_RE.test(email) || !message || !TYPES.has(type)) {
    return done(400, { ok: false, error: 'invalid' });
  }

  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) return done(429, { ok: false, error: 'rate_limited' });

  const key = process.env.RESEND_API_KEY;
  if (!key || !TO) return done(503, { ok: false, error: 'not_configured' });

  const rows: [string, string][] = [
    ['Name', name], ['Email', email], ['Project type', type || '—'], ['Shoot date', date || '—'],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\n${message}\n`;
  const html =
    `<table cellpadding="4">${rows.map(([k, v]) =>
      `<tr><td><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`).join('')}</table>` +
    `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `Flight plan: ${name}${type ? ` (${type})` : ''}`,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error('Contact form: Resend returned', res.status, await res.text().catch(() => ''));
      return done(502, { ok: false, error: 'send_failed' });
    }
  } catch (err) {
    console.error('Contact form: send failed', err);
    return done(502, { ok: false, error: 'send_failed' });
  }

  return done(200, { ok: true });
}

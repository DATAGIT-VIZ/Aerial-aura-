// Pre-launch check: lists the business details still missing from lib/business.ts and any
// placeholder text left in the site. Run with `npm run launch-check`.
// Exits with an error while anything required is missing, so it can gate a launch.

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { business } from '../lib/business.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
const red = s => `\x1b[31m${s}\x1b[0m`, yellow = s => `\x1b[33m${s}\x1b[0m`, green = s => `\x1b[32m${s}\x1b[0m`;

const blockers = [];
const advice = [];

// 1. Required for the legal notice and privacy policy (Swiss law).
const required = {
  legalName: "owner's full name or company name",
  street: 'street and number',
  postcodeCity: 'postcode and town',
  canton: 'canton',
  email: 'public contact email (a working inbox)',
};
for (const [key, label] of Object.entries(required)) {
  if (!String(business[key] ?? '').trim()) blockers.push(`lib/business.ts → ${key}: ${label}`);
}

// 2. Format checks on what is filled in.
if (business.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(business.email)) blockers.push(`email looks wrong: "${business.email}"`);
if (business.whatsapp && !/^[1-9]\d{7,14}$/.test(business.whatsapp)) blockers.push(`whatsapp must be digits only with country code, e.g. 41791234567 (got "${business.whatsapp}")`);
for (const key of ['instagram', 'youtube']) {
  if (business[key] && !/^https:\/\//.test(business[key])) blockers.push(`${key} must be a full https:// URL`);
}
if (business.pilotPhoto && !existsSync(join(root, 'public', business.pilotPhoto))) blockers.push(`pilotPhoto file not found in /public: ${business.pilotPhoto}`);

// 3. Recommended: the site works without these, but looks more complete with them.
if (!business.whatsapp) advice.push('whatsapp: WhatsApp buttons are hidden until a number is set');
if (!business.pilotName) advice.push('pilotName: the About section uses neutral wording');
if (!business.pilotPhoto) advice.push('pilotPhoto: the About section shows a graphic instead of a portrait');
if (!business.instagram && !business.youtube) advice.push('instagram / youtube: no social links shown');
const unpriced = Object.entries(business.prices).filter(([, v]) => v == null).map(([k]) => k);
if (unpriced.length) advice.push(`prices show "On request" for: ${unpriced.join(', ')}`);
if (!business.uid && !business.vatNumber) advice.push('uid / vatNumber: add if the business is registered (leave empty if not)');

// 4. Placeholder text anywhere in the site source.
const PLACEHOLDERS = [/X{6,}/, /\[Pilot Name\]/i, /Portrait · Pending/, /CHF —/, /aerialaura\.ch/, /lorem ipsum/i, /\bTODO\b/];
function* files(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* files(p);
    else if (/\.(tsx?|css|md)$/.test(name)) yield p;
  }
}
for (const dir of ['app', 'components', 'content', 'lib']) {
  for (const file of files(join(root, dir))) {
    readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
      if (PLACEHOLDERS.some(re => re.test(line))) blockers.push(`placeholder in ${relative(root, file)}:${i + 1}: ${line.trim().slice(0, 90)}`);
    });
  }
}

// Report
console.log('\nAerial Aura launch check\n');
if (blockers.length) {
  console.log(red(`✗ ${blockers.length} blocker(s):`));
  blockers.forEach(b => console.log(red(`  • ${b}`)));
} else {
  console.log(green('✓ All required business details are filled in and no placeholders remain.'));
}
if (advice.length) {
  console.log(yellow(`\n! Optional (${advice.length}):`));
  advice.forEach(a => console.log(yellow(`  • ${a}`)));
}
console.log(`
Also confirm by hand before launch:
  • Vercel env vars set: RESEND_API_KEY, CONTACT_FROM_EMAIL (verified domain), CONTACT_TO_EMAIL
  • Test enquiry sent from the live site arrives in the inbox
  • Claims are true: certifications (A1/A3, A2), insurance, "200+ shoots", "5★", "since 2020", Michelin background
  • Testimonials are from real clients who agreed to be quoted
  • People and private property shown in portfolio films have consented
  • Vercel project is on a commercial (Pro) plan
`);
process.exit(blockers.length ? 1 : 0);

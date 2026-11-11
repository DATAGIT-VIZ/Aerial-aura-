# Aerial Aura — launch checklist

Everything still needed before the site is officially live, in one place.
Run `npm run launch-check` at any time: it lists what is missing and exits with an error until the required items are done.

## 1. Details to get from the client

All of these go into **`lib/business.ts`**. Nothing else in the code needs editing.

### Required by Swiss law (legal notice and privacy policy)
| Field in `lib/business.ts` | What to ask for | Example |
|---|---|---|
| `legalName` | Owner's full legal name, or the registered company name | `Max Muster` |
| `street` | Business street address | `Musterstrasse 12` |
| `postcodeCity` | Postcode and town | `3011 Bern` |
| `canton` | Canton of that address (sets the court in the terms) | `Bern` |
| `email` | Public email address. **It must be a working inbox.** | `hello@aerialaurastudio.com` |

### Only if they apply
| Field | Ask | Example |
|---|---|---|
| `legalForm` | Sole proprietorship, GmbH, …? | `Sole proprietorship` |
| `uid` | Swiss business ID, if registered | `CHE-123.456.789` |
| `vatNumber` | VAT number, if VAT-registered (prices then show "incl. VAT") | `CHE-123.456.789 MWST` |
| `commercialRegister` | Commercial register entry, if registered | `Commercial Register of the Canton of Bern` |
| `phone` | Public phone number, if wanted | `+41 79 123 45 67` |
| `focaOperatorId` | FOCA drone operator registration number (builds trust) | from the UAS.gate portal |

### Recommended (the site hides these until they're filled in)
| Field | Ask | Example |
|---|---|---|
| `whatsapp` | WhatsApp number, digits only with country code | `41791234567` |
| `instagram`, `youtube` | Full profile links, **confirmed as theirs** | `https://instagram.com/…` |
| `pilotName` | Name to show in the About section | `Max` |
| `pilotPhoto` | Portrait photo, placed in `public/images/` | `/images/pilot.jpg` |
| `prices.*` | Starting price per package in CHF: the final price including VAT if registered. Leave `null` for "On request". | `1200` |

### Claims the client must confirm are true
Swiss unfair-competition law forbids false or misleading claims, so each of these must be accurate or removed:
- A1/A3 certified, A2 licensed, "fully insured" (About section, About page, Services FAQ, Terms §7)
- "200+ shoots completed", "60+ flights logged", "5★ average rating", "flying professionally since 2020", "Michelin kitchens"
- "Music licensing included" (Services: The Signature)
- **Testimonials** (`content/testimonials.ts`): real clients who agreed to be quoted. Remove any that aren't.
- People and private property in portfolio films have consented to being shown.

## 2. Accounts and settings to set up

- [ ] **Email inbox** for the address above. `aerialaurastudio.com` has no email yet; set it up with GoDaddy, Google Workspace or Zoho, or use an existing inbox.
- [ ] **Resend**: add the domain `aerialaurastudio.com` (region: Ireland), add its DNS records in GoDaddy, verify, and create an API key.
- [ ] **Vercel → aerial-aura-studio → Settings → Environment Variables**:
  - `RESEND_API_KEY`
  - `CONTACT_FROM_EMAIL` = `Aerial Aura <website@aerialaurastudio.com>`
  - `CONTACT_TO_EMAIL` = the inbox enquiries should go to
  - Redeploy after adding them.
- [ ] **Vercel plan → Pro.** The free Hobby plan is for non-commercial use only.
- [ ] Send a test enquiry from the live contact page and check it arrives.

## 3. Security housekeeping

- [ ] Make the GitHub repo **private** (GitHub → repo → Settings → General → Danger Zone → Change visibility).
- [ ] Turn on **two-factor login** for GitHub, Vercel, GoDaddy and Resend.
- [ ] GoDaddy: turn on **auto-renew** and **domain lock** for `aerialaurastudio.com`.
- [ ] Delete the old copies: the Netlify site `lighthearted-biscuit-7793ee` and the old Vercel project `aerial-aura`.

## Already done
- HTTPS on `aerialaurastudio.com` and `www`. Certificates renew automatically.
- Security headers (CSP, HSTS, anti-clickjacking).
- Legal notice page at `/legal/notice`.
- Privacy policy rewritten for the Swiss Data Protection Act, with GDPR notes for EU visitors.
- Contact form processed in Frankfurt (EU).
- Video player cookie switched off, so no cookie banner is needed.
- Placeholders removed from the site; missing details hide cleanly instead.

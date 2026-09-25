# Aerial Aura — Claude Code Kickoff Brief

Drop this file, `mise-en-vol-portfolio-mockup.html`, and `aerial-aura-website-prd.md` into the same project folder before starting Claude Code. Then paste the prompt in §4 as your first message.

---

## 1. Stack (per PRD §12)

- **Frontend:** Next.js, App Router, deployed on Vercel
- **Video:** Mux, Pay as you go tier
- **Backend:** None for V1 — portfolio/testimonial content lives in a code-managed config file; booking enquiries go straight to WhatsApp (`wa.me` links) and email (`mailto:`), not a database. Simpler to build, nothing to run or secure, and it matches how the client — who isn't technical — actually wants to receive leads.
- **Images:** Next.js Image optimization, AVIF/WebP

## 2. Suggested project structure

```
/app
  /page.tsx           → Home
  /work/page.tsx       → Full portfolio, filterable
  /services/page.tsx   → The Flight Menu
  /about/page.tsx
  /contact/page.tsx
/components
  Nav.tsx
  Hero.tsx
  Drone.tsx            → the interactive hero drone, ported from the mockup
  WorkGrid.tsx / Card.tsx
  FlightMenu.tsx
  Testimonials.tsx
  ContactCTA.tsx        → wa.me + mailto: links, no form/backend
  Footer.tsx
/content
  portfolio.ts          → typed array: title, category, Mux playback ID, flight-log stats
  testimonials.ts
/lib
  mux.ts
/styles
  globals.css          → design tokens (CSS variables) ported 1:1 from the mockup
```

## 3. Build order (mirrors PRD §20, Phase 1)

1. Scaffold the Next.js project; port the mockup's CSS variables, fonts, and design tokens into `globals.css` exactly — this is the one place nothing should drift from the approved design.
2. Componentize the Home page first, matching the mockup's markup/behavior 1:1 (including the drag/parallax drone interaction).
3. Build out `/work`, `/services`, `/about`, `/contact` per the PRD's page-by-page functional requirements (§6).
4. Create `content/portfolio.ts` and `content/testimonials.ts` as the single source of truth for portfolio pieces — no database, just a typed config file the site reads at build time.
5. Replace placeholder video cards with a real Mux player component (adaptive bitrate, hover-scrub thumbnails, custom-themed chrome — no default Mux branding).
6. Wire the booking CTAs to `wa.me` links with pre-filled, package-specific message templates, plus a `mailto:` fallback.
7. SEO metadata, Open Graph video tags, accessibility pass, privacy/cookie baseline (PRD §13–15).
8. Deploy to Vercel; connect Mux environment variables.

## 4. First prompt to give Claude Code

```
I'm building a website called Aerial Aura. Read aerial-aura-website-prd.md
for the full requirements and mise-en-vol-portfolio-mockup.html for the
exact design system, layout, copy, and interactions to preserve — nothing
about the visual design should change from the mockup.

Scaffold a Next.js (App Router) project that reproduces the mockup as
componentized React, preserving all CSS variables, fonts, spacing, and
the interactive hero drone exactly. Start with the Home page only — don't
build the other routes yet. There's no database for this project — portfolio
content lives in a typed config file, and booking CTAs are wa.me/mailto:
links, not a form. Leave a clear placeholder for Mux video integration
(I'll provide API keys separately).

Once Home is done, stop and show me before moving to the next page.
```

Keep it to one page at a time like that — it forces a review checkpoint instead of Claude Code running ahead and building five pages on an assumption you haven't confirmed yet.

## 5. Before you start

- Create the Vercel and Mux accounts under the client's billing (per the earlier billing-structure discussion) — set these up before Phase 1 coding starts, not after, so there's no account-transfer scramble at launch. No Supabase account needed.
- Have the Mux API key ready as an environment variable; don't hardcode it, and don't hand it to Claude Code in plaintext in the chat — use a local `.env.local` file it can reference by name.
- Get the client's WhatsApp Business number confirmed early — it's now a load-bearing part of the site (the primary booking CTA), not just a footer link.

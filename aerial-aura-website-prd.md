# Aerial Aura — Website PRD

**Prepared by:** Aixture
**Version:** 1.0 — Draft
**Date:** August 25, 2026
**Status:** For client sign-off before development starts

---

## 1. Executive Summary

Aerial Aura is a portfolio and booking website for a Switzerland-based FPV drone cinematographer and chef, built to convert three audiences — wedding couples, real estate agents/brands, and fellow creators — into inbound enquiries. The site's entire value proposition is **experiential**: visitors need to feel the footage the way they would on a cinema screen, not a compressed, buffering embed. Every decision in this PRD is subordinate to that one requirement. Where a tradeoff exists between "cheaper/faster to build" and "video looks and plays flawlessly," this document defaults to the latter.

Design direction (dark cinematic theme, chef/pilot duality, "flight menu" services framing, interactive hero drone) is already validated in the approved mockup — `mise-en-vol-portfolio-mockup.html`, since renamed to the Aerial Aura brand. This PRD scopes what it takes to turn that into a real, production-grade site.

---

## 2. Goals & Success Metrics

| Goal | Metric | Target |
|---|---|---|
| Convert visitors into enquiries | Contact/booking form submissions | ≥ 3% of sessions |
| Deliver a lag-free video experience | Largest Contentful Paint (mobile, 4G) | < 2.5s |
| Deliver a lag-free video experience | Time-to-first-frame on hero loop | < 1s |
| Deliver a lag-free video experience | Rebuffer rate on portfolio playback | < 1% of plays |
| Earn referral traffic | Instagram/YouTube → site click-throughs | Tracked baseline in month 1, grow monthly |
| Support the "premium" upsell case | Lighthouse performance score (mobile) | ≥ 90 |

---

## 3. Audience & Personas

1. **The couple** — browsing on a phone, often at night, comparing 3–4 videographers' sites in one sitting. They decide on *feel* within the first 10 seconds.
2. **The real estate agent/brand** — browsing on desktop, judging production quality against competitors' listing videos, wants proof of turnaround speed.
3. **The referral/creator audience** — arriving from an Instagram bio link or YouTube description, already primed by the reel they just watched; they're evaluating whether the full site matches that quality bar.

All three share one behavior: they will bounce within seconds if video is slow to start or stutters. This governs nearly every requirement below.

---

## 4. Scope

**In scope (V1):**
- Home (the immersive single-scroll experience from the mockup)
- Work / full portfolio gallery, filterable by category, with a lightbox player
- Services & pricing ("The Flight Menu")
- About
- Contact / booking flow
- Video hosting & delivery pipeline
- Lightweight content-management so the client can add new work without a developer
- Analytics, SEO, accessibility, and privacy compliance baseline

**Out of scope (V1) — candidates for a later phase:**
- Multi-language site (see §18)
- Blog/journal for SEO and behind-the-scenes content
- Client galleries / private delivery portal for finished wedding films
- Online payment/deposit collection
- Advanced 3D/WebGL hero (the current SVG drone interaction stays for V1; a richer 3D model is a phase 2 upsell, as already flagged)

---

## 5. Information Architecture

| Page | Purpose | Notes |
|---|---|---|
| `/` Home | Hero + reel + highlights, drives to Work and Contact | This is the mockup, extended with real video |
| `/work` | Full filterable portfolio (Weddings / Real Estate / Freestyle / Cinematic) | Each card opens a lightbox player, not a page navigation, to keep momentum |
| `/services` | The Flight Menu packages, deliverables, turnaround | Pricing filled in once client confirms |
| `/about` | Chef-to-pilot story, credentials (drone operator license, insurance) | Trust-building for wedding/real estate clients |
| `/contact` | Flight-plan booking form | Auto-confirmation email + notification to client |
| `/legal/privacy`, `/legal/terms` | GDPR/FADP requirement | See §16 |

---

## 6. Page-by-Page Functional Requirements

**Home**
- Hero: looping background reel (not the SVG placeholder — real graded footage), interactive drone element retained, headline, dual CTA (Watch reel / Book).
- Marquee category strip, linking to filtered `/work` views.
- 6–8 card teaser grid pulling the newest/featured pieces from the content store.
- About teaser + Flight Menu teaser, each linking to their full pages.
- Testimonial carousel, pulling from the content store (see §10).
- Footer contact strip.

**Work**
- Category filter (client-side, instant, no page reload).
- Each card: autoplay-muted preview on hover (desktop) / tap (mobile), category tag, flight-log caption.
- Click opens a full-bleed lightbox player with the graded, full-length cut, captions toggle, and share link.

**Contact**
- Fields: name, email, event type, date, location, message (as in the mockup).
- Server-side validation and spam protection (honeypot + rate limiting; no CAPTCHA friction unless abuse appears).
- On submit: confirmation email to the enquirer, notification email/Slack to the client, and a record stored for follow-up.

---

## 7. Video & CDN Strategy — Highest Priority

This is the section everything else is built around. The site succeeds or fails on this.

### 7.1 What "top-notch" means in practice

- **Adaptive bitrate streaming (HLS)** for every portfolio piece — never a single flat MP4 forcing a phone on weak hotel wifi to download a 4K file to play a 400px card.
- **Sub-1-second time-to-first-frame** on the hero loop, and near-instant start on hover-preview clips.
- **Zero visible rebuffering** under normal conditions — this is the single fastest way to lose a browsing couple.
- **Frame-accurate playback of FPV footage.** Freestyle FPV lives and dies on smoothness — 60fps source should stay 60fps in delivery wherever the viewer's bandwidth allows, not get flattened to 24fps to save encoding cost.
- **A custom-branded player** — no third-party logo, no "watch on X" chrome breaking the immersion, matching the dark/copper/sky design system.

### 7.2 CDN / video-hosting comparison

| Option | Strengths | Watch-outs | Fit |
|---|---|---|---|
| **Mux Video** | Best-in-class per-view quality-of-experience analytics, excellent Next.js SDK, built-in hover-scrub thumbnail sprites, generous Pay-as-you-go tier ($20/mo included usage credit typically covers this site's real traffic) | Costs scale with heavy volume, though not a concern at this project's size | **Recommended primary.** Client confirmed quality/analytics matter more than shaving cost, and the real pricing checks out affordable at this scale |
| **Bunny.net Stream** | EU-based edge nodes, automatic adaptive bitrate, very low cost per GB, simple API | Analytics are basic compared to Mux | Solid budget fallback if costs ever need trimming |
| **Cloudflare Stream** | Huge global edge network, predictable flat pricing, easy to bundle if the rest of the site also sits behind Cloudflare | Player customization is slightly less flexible than Mux's | Alternative, especially if Cloudflare is already the DNS/CDN layer |
| **Vimeo Pro/Business (embed)** | Fastest to set up, zero infrastructure work | Hard to fully theme the player to match the brand; native hover-scrub previews aren't supported the way this design needs | Fallback only if timeline is extremely tight |
| **Self-hosted (S3 + CloudFront + own HLS packaging)** | Full control, cheapest at very high volume | Real engineering overhead to build and maintain a packaging pipeline | Not worth it at this stage |

**Recommendation: Mux, on the Pay as you go tier**, set up under the client's own billing. It integrates cleanly with the Next.js frontend, and at this project's realistic traffic the bundled $20/month credit is expected to cover most or all of the actual bill.

### 7.3 Encoding & delivery pipeline

1. Client delivers masters at the highest quality available — ideally 4K60 or at minimum 1080p60; frame rate matters more than resolution for FPV smoothness.
2. Upload triggers automatic adaptive-bitrate transcoding (240p → 4K ladder, capped to source quality) via the chosen CDN's API.
3. Auto-generated poster frame + scrub-thumbnail sprite per video, used for card hover-preview without loading the full stream.
4. Hero background loop is a **separate, deliberately lightweight** 8–15 second cut (not the full-length piece), preloaded and served muted/autoplay/loop, with an automatic fallback to a static poster image on `prefers-reduced-data` or a detected slow connection.
5. Below-the-fold and off-screen video is lazy-loaded — nothing streams until it's in view or hovered.
6. Captions/on-screen text are added to portfolio pieces where relevant, both for accessibility and because a large share of social-referred visitors browse muted by default.

### 7.4 Performance budget

| Metric | Target |
|---|---|
| Hero payload (initial) | < 3 MB before any video starts streaming |
| LCP (mobile, 4G) | < 2.5s |
| Hero first frame | < 1s |
| Rebuffer rate | < 1% of plays |
| Lighthouse performance (mobile) | ≥ 90 |

---

## 8. Design System Reference

Carried over from the approved mockup — dark cinematic base (`#0B0D10`), dual accent system (copper `#C1682E` for the chef thread, sky blue `#59D6F2` for the drone/telemetry thread), condensed display type paired with a warm serif and a monospace utility face, flight-log captioning as a recurring motif, and the interactive draggable hero drone. No changes proposed here — this PRD assumes that direction is locked.

---

## 9. Content & Asset Requirements

From the client, before development can start on real (non-placeholder) content:
- Graded masters for 8–12 launch portfolio pieces across all four categories
- A short-form (8–15s) hero loop cut
- Bio copy and 3–5 real photos (headshot + behind-the-scenes)
- Real testimonials (with permission to publish names/initials)
- Drone operator license/insurance details, if he wants them displayed for trust (common ask from wedding/real estate clients)
- Final brand decision: confirm "Aerial Aura" as the legal/working name, and check domain availability (aerialaura.ch / .com)

---

## 10. Content Management

The client isn't technical and won't log into a dashboard to manage his own content — so building a CMS/admin panel for him would be effort spent on a feature he'll never use. Instead:
- Portfolio entries, testimonials, and services live in a simple config file in the codebase (e.g., a typed JSON/TS array) — no database required.
- New work gets added by sending the client's footage and details to Abhi (via WhatsApp/email, same as any other request), who updates the config and redeploys. This is a natural line item under the monthly retainer rather than a self-serve feature.
- This removes a vendor relationship and its cost entirely — no database is needed for V1.

---

## 11. Booking & Lead Capture

The client checks WhatsApp constantly and won't check a web dashboard — so the flow is built around where he'll actually see the lead, not around storing it in a database he'll never open.

- **Primary CTA — WhatsApp click-to-chat.** "Book a Shoot" and each package's CTA are `wa.me` links with a pre-filled message template (e.g., pre-filled with the package/event type the visitor clicked from), opening directly into WhatsApp on mobile or web.whatsapp.com on desktop. No form, no backend, no database — the enquiry lands exactly where he already works.
- **Secondary — a plain `mailto:` link** for enquirers who prefer email or don't use WhatsApp (common for real estate/brand contacts wanting a paper trail).
- Nothing needs to be stored server-side for this to work reliably — there's no submission to lose, because the message goes straight into his own WhatsApp/email, not through a third-party system that could fail silently.
- Consider a calendar-scheduling link (e.g., Cal.com) as a later addition for prospects who want to lock a call directly — a phase 1.1 nice-to-have, not a blocker for launch.

---

## 12. Technical Architecture

- **Frontend:** Next.js (App Router), deployed on Vercel for edge caching of static assets and easy CDN integration.
- **Video:** Mux (Pay as you go), abstracted behind a player component so swapping providers later doesn't require a redesign.
- **Data/backend:** None for V1 — portfolio/testimonial content lives in a code-managed config file (§10), and booking enquiries go straight to WhatsApp/email (§11). No database to run, secure, or pay for at this stage; one can be added later if the site grows into needing dynamic content or stored leads.
- **Images:** Served via Next.js Image optimization or the CDN's image layer, AVIF/WebP with fallbacks.

---

## 13. SEO & Social Sharing

- Per-page metadata, Open Graph and Twitter Card tags — including Open Graph video tags so shared links preview a playable clip, not a dead thumbnail.
- `sitemap.xml` and `robots.txt`.
- Structured data (schema.org `LocalBusiness`/`VideoObject`) to help portfolio pieces surface in video-rich search results.

---

## 14. Accessibility

- WCAG 2.1 AA baseline: keyboard-navigable, visible focus states, captions on video, color contrast checked against the dark theme.
- `prefers-reduced-motion` respected sitewide (already built into the mockup's CSS).
- The interactive hero drone is treated as decorative/progressive-enhancement — core content and navigation never depend on it.

---

## 15. Privacy, Compliance & Legal

Because the primary audience is Swiss/EU:
- Cookie consent banner before any non-essential tracking loads.
- Privacy policy covering data collected via the contact form and any analytics/CDN vendor.
- Confirm data-residency posture of the chosen CDN and analytics tool (a factor already weighing in favor of an EU-based option like Bunny.net).
- GDPR + Swiss FADP baseline compliance — this should be reviewed with the client/legal counsel before launch, not treated as a pure engineering checkbox.

---

## 16. Analytics & Reporting

- Privacy-friendly analytics (e.g., Plausible or Fathom) to avoid heavy cookie-consent friction while still tracking sessions, referral sources, and conversion events.
- Video-level engagement data pulled from the CDN's own analytics (play rate, average watch %, drop-off points) — this is where Mux's deeper analytics becomes a compelling upgrade once volume grows.

---

## 17. Localization

Switzerland has four national languages, and this client's audience also skews international (wedding/real estate clients, plus a global FPV/YouTube following). **Open decision for the client:** ship V1 in English only (fastest, matches the international/creator audience) versus English + French/German from day one. Recommendation is English-only for V1 to keep scope tight, with French/German added in phase 2 once there's real traffic data showing where enquiries originate.

---

## 18. Browser & Device Support

- Latest two versions of Chrome, Safari, Firefox, Edge on desktop and mobile.
- iOS Safari and Android Chrome specifically tested for video autoplay/lazy-load behavior, since mobile is the primary browsing context for the couple persona.

---

## 19. Non-Functional Requirements

- **Scalability:** a single Instagram/YouTube feature could spike traffic overnight — CDN and hosting choices above are both built for elastic scaling without manual intervention.
- **Uptime:** target 99.9%, standard for Vercel + managed CDN/DB stack.
- **Security:** form input sanitized/rate-limited, admin area authenticated, no secrets exposed client-side.

---

## 20. Phased Rollout

| Phase | Scope | Status |
|---|---|---|
| 0 — Design | Mockup, design system, brand direction | ✅ Done |
| 1 — MVP Build | Home, Work, Services, About, Contact, real video pipeline on CDN, content admin, analytics, privacy baseline | Next |
| 1.1 — Enhancements | Calendar booking link, richer video analytics (Mux evaluation) | Post-launch |
| 2 — Premium Upsell | Richer 3D/WebGL hero, blog/journal, multi-language | On client demand |

---

## 21. Pricing Tier Mapping

Maps back to the two-tier approach already discussed with the client:

- **Base tier (lower price point):** Everything in Phase 1 above, on Bunny.net Stream, custom admin, single language.
- **Premium tier (add-on):** Deeper video analytics (Mux), calendar-integrated booking, multi-language, richer hero animation/3D — priced and scoped separately once the client has seen the base build live.

---

## 22. Risks & Open Questions

- Client needs to supply graded footage at sufficient resolution/frame rate — final video quality is capped by what he delivers, not just the pipeline.
- Domain and final brand name ("Aerial Aura") need confirming before DNS/CDN setup.
- Music licensing for any soundtracked reels needs to be cleared before publishing (YouTube/Instagram content ID issues aside, a standalone site has its own licensing exposure).
- Who owns the ongoing CDN/hosting bill post-launch — client or bundled into a retainer — should be settled before Phase 1 kickoff.
- GDPR/FADP sign-off should involve the client's own review, not rest solely on this document.

---

## Appendix

- Approved visual mockup: `mise-en-vol-portfolio-mockup.html` (Aerial Aura branding applied)

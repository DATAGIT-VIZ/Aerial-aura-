import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Aerial Aura',
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="legal-page">
        <div className="wrap">
          <header className="legal-page__header">
            <p className="eyebrow">Legal</p>
            <h1 className="display legal-page__title">Privacy Policy</h1>
            <p className="legal-page__date">Last updated: November 2026</p>
          </header>

          <div className="legal-page__body">
            <h2>1. Who we are</h2>
            <p>Aerial Aura is a sole-trader drone cinematography business operated from Switzerland. References to &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo; in this policy refer to the operator of this site.</p>

            <h2>2. What data we collect</h2>
            <p>When you contact us via the contact form, WhatsApp or email, you provide your name, contact details, and any information you choose to include in your message.</p>
            <p>Messages sent through the contact form are delivered to our inbox by email via our email provider, Resend. The website itself does not store form submissions in a database.</p>
            <p>This site does not use analytics, advertising trackers or tracking cookies.</p>

            <h2>3. How we use your data</h2>
            <p>We use contact information solely to respond to your enquiry and, if you become a client, to manage our working relationship. We do not use it for marketing, and we do not sell or share it with third parties.</p>

            <h2>4. Video delivery</h2>
            <p>Portfolio videos are hosted on a third-party CDN (Mux). Mux&apos;s privacy policy governs data processed in connection with video delivery. Playback data (play events, buffering metrics) is collected by Mux in aggregated, anonymised form to optimise delivery quality.</p>

            <h2>5. Your rights (GDPR / Swiss FADP)</h2>
            <p>You have the right to access, correct, or request deletion of any personal data we hold about you. To exercise these rights, contact us at <a href="mailto:hello@aerialaura.ch">hello@aerialaura.ch</a>. We will respond within 30 days.</p>

            <h2>6. Data retention</h2>
            <p>Enquiry correspondence is retained for up to 3 years for business record purposes. Client project data (contracts, delivery records) is retained for 7 years in line with Swiss accounting requirements.</p>

            <h2>7. Contact</h2>
            <p>For any privacy-related questions, email <a href="mailto:hello@aerialaura.ch">hello@aerialaura.ch</a>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

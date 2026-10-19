import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Engagement — Aerial Aura',
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="legal-page">
        <div className="wrap">
          <header className="legal-page__header">
            <p className="eyebrow">Legal</p>
            <h1 className="display legal-page__title">Terms of Engagement</h1>
            <p className="legal-page__date">Last updated: September 2026</p>
          </header>

          <div className="legal-page__body">
            <h2>1. Booking & deposit</h2>
            <p>A shoot date is only confirmed upon receipt of a signed quote and a 30% deposit. Dates are held on a first-deposit basis.</p>

            <h2>2. Cancellation</h2>
            <p>Cancellations made more than 28 days before the shoot date forfeit the deposit. Cancellations within 28 days are charged at 50% of the agreed fee. Cancellations within 7 days are charged at 100%.</p>

            <h2>3. Weather & force majeure</h2>
            <p>If conditions are unsafe to fly (wind, rain, restricted airspace activation), the shoot will be rescheduled at no additional cost. The pilot has final discretion on whether conditions meet safety standards.</p>

            <h2>4. Deliverables & turnaround</h2>
            <p>Agreed deliverables and turnaround times are specified in the project quote. Delivery is made via private download link. The client has 14 days to request revisions; files are retained for 60 days post-delivery.</p>

            <h2>5. Intellectual property</h2>
            <p>Aerial Aura retains copyright in all footage. Upon final payment the client receives a non-exclusive licence to use the delivered edits for the agreed purpose (personal, listing, campaign, etc.). Re-editing raw footage or sub-licensing requires prior written agreement.</p>

            <h2>6. Portfolio use</h2>
            <p>Unless otherwise agreed in writing, Aerial Aura may use delivered work in its portfolio, website, and social channels. Clients who require confidentiality must request this before the shoot date.</p>

            <h2>7. Liability</h2>
            <p>The pilot carries full UAV third-party liability insurance. Aerial Aura&apos;s liability is limited to the value of the agreed project fee. We are not liable for consequential losses (missed listing deadlines, etc.).</p>

            <h2>8. Governing law</h2>
            <p>These terms are governed by Swiss law. Any disputes are subject to the jurisdiction of the courts of the canton where the operator is registered.</p>

            <h2>9. Contact</h2>
            <p>Questions about these terms: <a href="mailto:hello@aerialaura.ch">hello@aerialaura.ch</a>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

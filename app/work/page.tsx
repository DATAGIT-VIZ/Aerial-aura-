import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WorkClient from '@/components/work/WorkClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work — Aerial Aura',
  description: 'FPV & cinematic drone portfolio — weddings, real estate, freestyle and cinematic films shot across Switzerland and beyond.',
};

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main className="work-page">
        <header className="page-hero">
          <p className="eyebrow">Portfolio</p>
          <h1 className="display page-hero__title">The Reel</h1>
          <p className="page-hero__sub">Every frame captured in the field — no stock, no AI, all flight.</p>
        </header>
        <section className="section">
          <div className="wrap">
            <WorkClient />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

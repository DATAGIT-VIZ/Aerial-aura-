import Nav          from '@/components/Nav';
import Hero         from '@/components/Hero';
import Marquee      from '@/components/Marquee';
import GogglesReveal from '@/components/GogglesReveal';
import WorkGrid     from '@/components/WorkGrid';
import About        from '@/components/About';
import FlightMenu   from '@/components/FlightMenu';
import Testimonials from '@/components/Testimonials';
import ContactCTA   from '@/components/ContactCTA';
import Footer       from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <GogglesReveal />
      <WorkGrid />
      <About />
      <FlightMenu />
      <Testimonials />
      <ContactCTA />
      <Footer />
    </>
  );
}

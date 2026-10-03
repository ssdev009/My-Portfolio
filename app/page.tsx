import { JsonLd } from "@/components/analytics/JsonLd";
import { HeroSection } from "@/components/hero/HeroSection";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Engagement } from "@/components/sections/Engagement";
import { FAQ } from "@/components/sections/FAQ";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { TechStack } from "@/components/sections/TechStack";
import { Testimonials } from "@/components/sections/Testimonials";
import { Work } from "@/components/sections/Work";
import { buildHomeSchema } from "@/lib/structuredData";

/**
 * Phase 4: every section is real, including Contact & Booking.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={buildHomeSchema()} />
      <HeroSection />
      <Stats />
      <About />
      <Services />
      <Work />
      <Process />
      <TechStack />
      <Testimonials />
      <Engagement />
      <FAQ />

      <Contact />
    </>
  );
}

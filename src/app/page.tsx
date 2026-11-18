import { Hero } from "@/components/hero/hero";
import { AudiencesSection } from "@/components/sections/audiences-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FounderSection } from "@/components/sections/founder-section";
import { JoinSection } from "@/components/sections/join-section";
import { VibeSection } from "@/components/sections/vibe-section";
import { serializeJsonLd } from "@/lib/events/structured-data";
import { organizationStructuredData } from "@/lib/structured-data";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(organizationStructuredData()),
        }}
      />
      <Hero />
      <VibeSection />
      <AudiencesSection />
      <FounderSection />
      <JoinSection />
      <FaqSection />
    </>
  );
}

import { Hero } from "@/components/hero/hero";
import { AudiencesSection } from "@/components/sections/audiences-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HouseRulesSection } from "@/components/sections/house-rules-section";
import { JoinSection } from "@/components/sections/join-section";
import { NextMeetupSection } from "@/components/sections/next-meetup-section";
import { RunOfShowSection } from "@/components/sections/run-of-show-section";
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
      <NextMeetupSection />
      <AudiencesSection />
      <RunOfShowSection />
      <HouseRulesSection />
      <JoinSection />
      <FaqSection />
    </>
  );
}

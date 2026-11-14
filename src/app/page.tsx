import { Hero } from "@/components/hero/hero";
import { AudiencesSection } from "@/components/sections/audiences-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HouseRulesSection } from "@/components/sections/house-rules-section";
import { JoinSection } from "@/components/sections/join-section";
import { NextMeetupSection } from "@/components/sections/next-meetup-section";
import { RunOfShowSection } from "@/components/sections/run-of-show-section";

export default function HomePage() {
  return (
    <>
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

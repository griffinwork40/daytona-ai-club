import type { Metadata } from "next";
import {
  AboutCta,
  ConductSection,
  WhyAndOrganizer,
} from "@/components/sections/about-parts";
import { AudiencesSection } from "@/components/sections/audiences-section";
import { PageHeader } from "@/components/ui/primitives";
import { aboutHeader, aboutMeta, audienceCopy } from "@/content/about";

export const metadata: Metadata = {
  title: aboutMeta.title,
  description: aboutMeta.description,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow={aboutHeader.eyebrow}
        title={aboutHeader.title}
        lede={aboutHeader.lede}
      />
      <WhyAndOrganizer />
      <AudiencesSection
        copy={audienceCopy}
        className="border-t border-foam/8 bg-linear-to-b from-ink-950 via-ink-900 to-ink-950"
      />
      <ConductSection />
      <AboutCta />
    </>
  );
}

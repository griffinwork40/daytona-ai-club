import type { Metadata } from "next";
import {
  ShareFormSection,
  WhatWorksSection,
  WhoShouldShare,
} from "@/components/sections/speak-parts";
import { ButtonLink } from "@/components/ui/button";
import { Container, PageHeader } from "@/components/ui/primitives";
import { speakHeader, speakMeta } from "@/content/speak";

export const metadata: Metadata = {
  title: speakMeta.title,
  description: speakMeta.description,
};

export default function SpeakPage() {
  return (
    <>
      <PageHeader
        eyebrow={speakHeader.eyebrow}
        title={speakHeader.title}
        lede={speakHeader.lede}
      />
      <div className="border-b border-foam/8 bg-ink-950">
        <Container className="py-6">
          <ButtonLink href="#propose">{speakHeader.cta}</ButtonLink>
        </Container>
      </div>
      <WhoShouldShare />
      <WhatWorksSection />
      <ShareFormSection />
    </>
  );
}

import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Container, Plate } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <Container className="flex min-h-[70svh] flex-col items-start justify-center py-24">
      <Plate className="text-4xl">404</Plate>
      <h1 className="display mt-6 text-6xl sm:text-8xl">Off the track</h1>
      <p className="mt-5 max-w-xl text-lg text-mist">
        That page does not exist. It may have moved, or the link may be wrong.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Back to the start</ButtonLink>
        <ButtonLink href="/events" variant="ghost">
          See meetups
        </ButtonLink>
      </div>
    </Container>
  );
}

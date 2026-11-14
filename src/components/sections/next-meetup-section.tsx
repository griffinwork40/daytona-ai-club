import { NextMeetup } from "@/components/events/next-meetup";
import { Plate, Section } from "@/components/ui/primitives";
import { nextCopy } from "@/content/home";

/**
 * Frames the events card. When `NextMeetup` renders nothing, the slot is
 * empty and a CSS-only fallback (via `peer-empty`) says plainly that the
 * date and venue are being set. Works without JavaScript.
 */
export function NextMeetupSection() {
  return (
    <Section
      id="next"
      eyebrow={nextCopy.eyebrow}
      title={nextCopy.title}
      lede={nextCopy.lede}
      className="relative border-t border-foam/8"
    >
      <div className="max-w-4xl">
        <div className="peer empty:hidden">
          <NextMeetup />
        </div>
        <EmptyCard />
        <p className="label mt-5 text-mist">{nextCopy.note}</p>
      </div>
    </Section>
  );
}

/** Shown only while the events slot is empty. */
function EmptyCard() {
  return (
    <div className="panel relative hidden overflow-hidden peer-empty:block">
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-sun-300 via-flare-500 to-dusk-500"
      />
      <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
        <Plate className="self-start text-5xl sm:text-6xl">
          {nextCopy.plate}
        </Plate>
        <div>
          <p className="label text-sun-300">Founding Night</p>
          <p className="display mt-2 text-3xl sm:text-4xl">
            Date and venue being set
          </p>
          <p className="mt-3 max-w-xl text-mist">
            The first meetup is in planning now. Join the list and you will
            hear the moment it is booked.
          </p>
        </div>
      </div>
    </div>
  );
}

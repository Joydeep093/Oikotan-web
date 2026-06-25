import { PAST_EVENTS, UPCOMING_EVENTS } from "@/data";
import EventCard from "@/components/EventCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description: "Browse all upcoming and past events organized by Oikotan – Lithuanian cultural celebrations in the Netherlands.",
};

export default function EventsPage() {
  const upcoming = UPCOMING_EVENTS.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  const past = PAST_EVENTS.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Page header */}
      <header className="mb-12">
        <p className="text-brand-500 text-sm font-semibold uppercase tracking-widest">What&apos;s on</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-neutral-900 mt-1">
          Our Events
        </h1>
        {/* <p className="mt-4 max-w-2xl text-neutral-600">
          Oikotan organizes a range of cultural events throughout the year.
        </p> */}
      </header>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section aria-labelledby="upcoming-events-heading">
          <h2 id="upcoming-events-heading" className="text-2xl font-display font-bold text-neutral-900 mb-6">
            Upcoming Events
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* Past */}
      {past.length > 0 && (
        <section aria-labelledby="past-events-heading" className="mt-16">
          <h2 id="past-events-heading" className="text-2xl font-display font-bold text-neutral-900 mb-6">
            Past Events
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 opacity-75">
            {past.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

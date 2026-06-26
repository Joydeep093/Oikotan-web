import Image from "next/image";
import Link from "next/link";
import type { Event } from "@/types";

const CATEGORY_COLORS: Record<Event["category"], string> = {
  traditional: "bg-emerald-100 text-emerald-800",
  festival:    "bg-rose-100 text-rose-800",
  cultural:    "bg-indigo-100 text-indigo-800",
  social:      "bg-cyan-100 text-cyan-800",
};

function formatDate(event: Event) {
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };

  if (startDate.toDateString() === endDate.toDateString()) {
    return startDate.toLocaleDateString("en-GB", options);
  } else {
    return `${startDate.toLocaleDateString("en-GB", options)} - ${endDate.toLocaleDateString("en-GB", options)}`;
  }
}

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const eventDetailsHref = event.parentEventId
    ? `/events/${event.parentEventId}/${event.id}`
    : `/events/${event.id}`;

  return (
    <article
      className="group relative flex flex-col min-h-[22rem] bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow"
      aria-label={`Event: ${event.title}`}
    >
      <Link
        href={eventDetailsHref}
        aria-label={`Open details for ${event.title}`}
        className="absolute inset-0 z-20 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset"
      />

      {/* Hero media */}
      <div className="relative h-1/2 w-full overflow-hidden bg-gradient-to-br from-brand-400 to-brand-600">
        {event.image ? (
          <>
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent"
              aria-hidden="true"
            />
          </>
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            aria-hidden="true"
          >
            <span className="select-none text-4xl">
              {event.category === "traditional"
                ? "🌿"
                : event.category === "festival"
                  ? "🔥"
                  : event.category === "social"
                    ? "🤝"
                    : "🎭"}
            </span>
          </div>
        )}
      </div>

      <div className="relative z-10 flex flex-col p-4 flex-1 h-1/2">
        {/* Category badge */}
        <span className={`self-start text-xs font-semibold uppercase tracking-wide rounded-full px-2.5 py-0.5 mb-3 ${CATEGORY_COLORS[event.category]}`}>
          {event.category}
        </span>

        <h3 className="font-display text-lg font-semibold text-neutral-900 group-hover:text-brand-600 transition-colors">
          {event.title}
        </h3>

        <div className="mt-2 space-y-1 text-xs text-neutral-500">
          <p className="flex items-center gap-1.5">
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time dateTime={event.startDate}>{formatDate(event)}</time>
            {event.time && <span>· {event.time}</span>}
          </p>
          <p className="flex items-center gap-1.5">
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </p>
        </div>

        <p className="mt-2 text-xs text-neutral-600 line-clamp-2 flex-1">{event.description}</p>

        <div className="mt-3 flex gap-3">
          {event.ticketUrl && (
            <Link
              href={event.ticketUrl}
              className="relative z-30 inline-flex items-center rounded-full bg-brand-500 px-3.5 py-1.5 text-sm font-semibold text-white hover:bg-brand-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              Buy Tickets
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

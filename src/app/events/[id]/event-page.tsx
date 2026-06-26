import Image from "next/image";
import Link from "next/link";
import { EVENTS } from "@/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Event } from "@/types";
import { formatEventDate, formatProgramDate } from "@/utils/dateFormatters";
import { generateEventMetadata } from "@/utils/metadata";
import { FOOD_MENUS_BY_EVENT_ID } from "@/data/food-menu";
import { TICKETS_BY_EVENT_ID } from "@/data/tickets";

interface EventPageProps {
  params: {
    id: string;
  };
}

const CATEGORY_COLORS: Record<Event["category"], string> = {
  traditional: "bg-emerald-100 text-emerald-800",
  festival: "bg-rose-100 text-rose-800",
  cultural: "bg-indigo-100 text-indigo-800",
  social: "bg-cyan-100 text-cyan-800",
};

const PERIOD_STYLES = {
  morning: {
    chip: "bg-amber-100 text-amber-800",
    dot: "bg-amber-500",
    label: "Morning",
  },
  afternoon: {
    chip: "bg-sky-100 text-sky-800",
    dot: "bg-sky-500",
    label: "Afternoon",
  },
  evening: {
    chip: "bg-violet-100 text-violet-800",
    dot: "bg-violet-500",
    label: "Evening",
  },
} as const;

export function generateMetadata({ params }: EventPageProps): Metadata {
  const event = EVENTS.find((e) => e.id === params.id);
  return generateEventMetadata(event);
}

export function generateStaticParams() {
  return EVENTS.map((event) => ({
    id: event.id,
  }));
}

export default function EventPage({ params }: EventPageProps) {
  const event = EVENTS.find((e) => e.id === params.id);

  if (!event) {
    notFound();
  }

  const allProgramItems =
    event.programDetails?.flatMap((day) => day.items) ?? [];
  const hasFoodPage = (FOOD_MENUS_BY_EVENT_ID[event.id]?.length ?? 0) > 0;
  const hasTicketsPage = (TICKETS_BY_EVENT_ID[event.id]?.length ?? 0) > 0;
  const hasCulturalPage = allProgramItems.some(
    (item) => item.url === "cultural",
  );
  const hasDandiyaPage = allProgramItems.some((item) => item.url === "dandiya");

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 via-white to-neutral-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <Link
          href="/events"
          className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 mb-8"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Events
        </Link>

        <section className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-start">
          <div>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${CATEGORY_COLORS[event.category]}`}
            >
              {event.category}
            </span>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold text-neutral-900">
              {event.title}
            </h1>
            <p className="mt-5 text-lg text-neutral-700 leading-relaxed">
              {event.description}
            </p>
          </div>

          <div className="relative h-56 sm:h-64 lg:h-56 overflow-hidden rounded-2xl border border-neutral-200 bg-brand-100 shadow-sm">
            {event.image ? (
              <>
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-400 to-brand-600">
                <p className="px-4 text-center text-sm font-semibold tracking-wide text-white/95 uppercase">
                  Event Image Coming Soon
                </p>
              </div>
            )}
          </div>
        </section>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="flex gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
            <svg
              className="h-6 w-6 shrink-0 text-brand-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div>
              <p className="text-sm font-semibold text-neutral-600">Date</p>
              <p className="mt-1 text-lg font-semibold text-neutral-900">
                {formatEventDate(event)}
              </p>
              {event.time && (
                <p className="mt-1 text-sm text-neutral-600">{event.time}</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
            <svg
              className="h-6 w-6 shrink-0 text-brand-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <div>
              <p className="text-sm font-semibold text-neutral-600">Location</p>
              {event.mapUrl ? (
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-lg font-semibold text-neutral-900 hover:text-brand-600 transition-colors"
                >
                  {event.location}
                </a>
              ) : (
                <p className="mt-1 text-lg font-semibold text-neutral-900">
                  {event.location}
                </p>
              )}
            </div>
          </div>
        </div>

        {(hasFoodPage ||
          hasCulturalPage ||
          hasDandiyaPage ||
          hasTicketsPage) && (
          <section className="mt-8" aria-label="Event highlights">
            <div className="flex flex-wrap gap-3">
              {hasTicketsPage && (
                <Link
                  href={`/events/${event.id}/tickets`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-violet-300 bg-gradient-to-r from-violet-50 to-fuchsia-50 px-4 py-2 text-sm font-semibold text-violet-700 hover:from-violet-100 hover:to-fuchsia-100 transition-colors"
                >
                  🎟️ Tickets
                </Link>
              )}
              {hasFoodPage && (
                <Link
                  href={`/events/${event.id}/food`}
                  className="inline-flex items-center rounded-full border border-orange-300 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-100 transition-colors"
                >
                  Food Fiesta
                </Link>
              )}

              {hasCulturalPage && (
                <Link
                  href={`/events/${event.id}/cultural`}
                  className="inline-flex items-center rounded-full border border-indigo-300 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors"
                >
                  Cultural Program
                </Link>
              )}
              {hasDandiyaPage && (
                <Link
                  href={`/events/${event.id}/dandiya`}
                  className="inline-flex items-center rounded-full border border-fuchsia-300 bg-fuchsia-50 px-4 py-2 text-sm font-semibold text-fuchsia-700 hover:bg-fuchsia-100 transition-colors"
                >
                  Dandiya Night
                </Link>
              )}
            </div>
          </section>
        )}

        {event.programDetails && event.programDetails.length > 0 && (
          <section className="mt-12" aria-labelledby="program-details-heading">
            <div className="flex items-center justify-between gap-4">
              <h2
                id="program-details-heading"
                className="font-display text-2xl sm:text-3xl font-bold text-neutral-900"
              >
                Puja Schedule
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500">
                Day-wise schedule with time of day
              </p>
            </div>

            <div className="mt-6 space-y-6">
              {event.programDetails.map((day) => {
                const dayGroups = {
                  morning: day.items.filter(
                    (item) => item.period === "morning",
                  ),
                  afternoon: day.items.filter(
                    (item) => item.period === "afternoon",
                  ),
                  evening: day.items.filter(
                    (item) => item.period === "evening",
                  ),
                };

                return (
                  <article
                    key={`${day.date}-${day.label}`}
                    className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-4">
                      <h3 className="text-lg sm:text-xl font-semibold text-neutral-900">
                        {day.label}
                      </h3>
                      <time
                        className="text-sm font-medium text-brand-700"
                        dateTime={day.date}
                      >
                        {formatProgramDate(day.date)}
                      </time>
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                      {(
                        Object.keys(dayGroups) as Array<keyof typeof dayGroups>
                      ).map((periodKey) => {
                        const periodItems = dayGroups[periodKey];
                        const periodStyle = PERIOD_STYLES[periodKey];

                        if (periodItems.length === 0) {
                          return null;
                        }

                        return (
                          <section
                            key={`${day.date}-${periodKey}`}
                            className="rounded-xl bg-neutral-50 border border-neutral-100 p-4"
                            aria-label={`${periodStyle.label} schedule`}
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <span
                                className={`h-2.5 w-2.5 rounded-full ${periodStyle.dot}`}
                                aria-hidden="true"
                              />
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${periodStyle.chip}`}
                              >
                                {periodStyle.label}
                              </span>
                            </div>
                            <ul className="space-y-3" role="list">
                              {periodItems.map((item, index) => (
                                <li
                                  key={`${item.title}-${item.time}-${index}`}
                                  className="rounded-lg bg-white border border-neutral-200 p-3"
                                >
                                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                                    {item.time}
                                  </p>
                                  <p className="mt-1 text-sm font-semibold text-neutral-900">
                                    {item.title}
                                  </p>
                                  {item.description && (
                                    <p className="mt-1 text-xs text-neutral-600">
                                      {item.description}
                                    </p>
                                  )}
                                  {item.url && (
                                    <Link
                                      href={`/events/${event.id}/${item.url}`}
                                      className={`text-xs hover:underline ${item.url === "food" ? "text-orange-600" : "text-blue-500"}`}
                                    >
                                      more...
                                    </Link>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </section>
                        );
                      })}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {event.ticketUrl ? (
          <div className="mt-10 flex gap-4">
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-brand-500 px-7 py-3 text-base font-semibold text-white hover:bg-brand-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              Buy Tickets
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border-2 border-brand-300 px-7 py-3 text-base font-semibold text-brand-600 hover:bg-brand-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              Get in Touch
            </Link>
          </div>
        ) : (
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-brand-500 px-7 py-3 text-base font-semibold text-white hover:bg-brand-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              Get in Touch
            </Link>
          </div>
        )}

        <div className="mt-10 border-t border-neutral-200 pt-6">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 rounded-full border border-brand-300 bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Events
          </Link>
        </div>
      </div>
    </div>
  );
}

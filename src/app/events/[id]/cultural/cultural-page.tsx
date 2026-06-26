import Link from "next/link";
import { EVENTS } from "@/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { generateCulturalProgramMetadata } from "@/utils/metadata";
import CulturalScheduleTabs from "@/components/CulturalScheduleTabs";
import { CULTURAL_PROGRAMS_BY_EVENT_ID } from "@/data/cultural-event";

interface CulturalPageProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params }: CulturalPageProps): Metadata {
  const event = EVENTS.find((item) => item.id === params.id);
  return generateCulturalProgramMetadata(event);
}

export default function CulturalPage({ params }: CulturalPageProps) {
  const event = EVENTS.find((item) => item.id === params.id);

  if (!event) {
    notFound();
  }

  const dayWiseCulturalSchedule = CULTURAL_PROGRAMS_BY_EVENT_ID[event.id] ?? [];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#eef2ff_0%,_#ffffff_50%,_#f8fafc_100%)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Link
          href={`/events/${event.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-indigo-700 hover:text-indigo-800"
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
          Back to Event Details
        </Link>

        <header className="relative mt-6 overflow-hidden rounded-3xl border border-rose-200 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-400 p-6 text-white shadow-xl sm:p-8">
          <div
            className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-white/15"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -left-10 -bottom-12 h-32 w-32 rounded-full bg-white/10"
            aria-hidden="true"
          />
          <p className="text-xs font-semibold uppercase tracking-widest text-rose-100">
            Special Segment
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-white">
            Cultural Program
          </h1>
          <p className="mt-3 max-w-3xl text-rose-50 leading-relaxed">
            {/* Some text about the cultural program can go here, describing the essence of the event and what attendees can expect from the cultural activities planned for the day. */}
          </p>
        </header>

        <section className="mt-8" aria-labelledby="cultural-schedule-heading">
          <h2
            id="cultural-schedule-heading"
            className="font-display text-2xl font-bold text-neutral-900 sm:text-3xl"
          >
            Day-wise Schedule
          </h2>
          <CulturalScheduleTabs schedule={dayWiseCulturalSchedule} />
        </section>

        <div className="mt-10 border-t border-neutral-200 pt-6">
          <Link
            href={`/events/${event.id}`}
            className="inline-flex items-center gap-2 rounded-full border border-rose-300 bg-white px-5 py-2.5 text-sm font-semibold text-rose-700 hover:bg-rose-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
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
            Back to Event Details
          </Link>
        </div>
      </div>
    </div>
  );
}

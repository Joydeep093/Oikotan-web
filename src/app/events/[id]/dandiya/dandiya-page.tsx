import Image from "next/image";
import Link from "next/link";
import { EVENTS } from "@/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PosterLightbox from "@/components/PosterLightbox";
import dandiyaPoster from "@/assets/images/posters/dandiya_2025.png";
import { generateDandiyaProgramMetadata } from "@/utils/metadata";

interface DandiyaPageProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params }: DandiyaPageProps): Metadata {
  const event = EVENTS.find((item) => item.id === params.id);
  return generateDandiyaProgramMetadata(event);
}

export default function DandiyaPage({ params }: DandiyaPageProps) {
  const event = EVENTS.find((item) => item.id === params.id);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-fuchsia-50 via-white to-rose-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Link
          href={`/events/${event.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-fuchsia-700 hover:text-fuchsia-800"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Event Details
        </Link>

        <header className="mt-6 rounded-3xl border border-fuchsia-100 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-fuchsia-600">Special Night</p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-neutral-900">Dandiya Night</h1>
          <p className="mt-3 text-neutral-600 leading-relaxed max-w-3xl">
            Celebrate the festive evening with vibrant music, energetic dance circles, and joyful community spirit.
          </p>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <section className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6 shadow-sm">
            <Image
              src={dandiyaPoster}
              alt="Dandiya Night event poster"
              className="h-auto w-full rounded-xl border border-neutral-200"
              priority
            />

            <div className="mt-5">
              <PosterLightbox src={dandiyaPoster} alt="Dandiya Night event poster" buttonLabel="View Poster Full Screen" />
            </div>
          </section>

          <aside className="rounded-2xl border border-fuchsia-100 bg-white p-5 shadow-sm h-fit">
            <h2 className="font-display text-2xl font-bold text-neutral-900">Quick Info</h2>
            <dl className="mt-4 space-y-4 text-sm text-neutral-700">
              <div>
                <dt className="font-semibold text-neutral-900">Event</dt>
                <dd className="mt-1">{event.title}</dd>
              </div>
              <div>
                <dt className="font-semibold text-neutral-900">Date</dt>
                <dd className="mt-1">{event.startDate}</dd>
              </div>
              <div>
                <dt className="font-semibold text-neutral-900">Time</dt>
                <dd className="mt-1">07:00 PM - 09:00 PM</dd>
              </div>
              <div>
                <dt className="font-semibold text-neutral-900">Venue</dt>
                <dd className="mt-1">{event.location}</dd>
              </div>
              <div>
                <dt className="font-semibold text-neutral-900">Contact</dt>
                <dd className="mt-1">+370 600 00000</dd>
                <dd>+370 611 11111</dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-col gap-3">
              {event.ticketUrl && (
                <a
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-fuchsia-700 transition-colors"
                >
                  Book Entry Pass
                </a>
              )}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-fuchsia-300 px-5 py-2.5 text-sm font-semibold text-fuchsia-700 hover:bg-fuchsia-50 transition-colors"
              >
                Contact Organizers
              </Link>
            </div>
          </aside>
        </div>

        <div className="mt-10 border-t border-fuchsia-100 pt-6">
          <Link
            href={`/events/${event.id}`}
            className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300 bg-white px-5 py-2.5 text-sm font-semibold text-fuchsia-700 hover:bg-fuchsia-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500"
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

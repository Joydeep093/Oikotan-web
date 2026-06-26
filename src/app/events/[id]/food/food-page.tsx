import Link from "next/link";
import { EVENTS} from "@/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import FoodMenuTabs from "@/components/FoodMenuTabs";
import { generateFoodMenuMetadata } from "@/utils/metadata";
import { FOOD_MENUS_BY_EVENT_ID } from "@/data/food-menu";

interface FoodPageProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params }: FoodPageProps): Metadata {
  const event = EVENTS.find((item) => item.id === params.id);
  return generateFoodMenuMetadata(event);
}

export default function FoodPage({ params }: FoodPageProps) {
  const event = EVENTS.find((item) => item.id === params.id);

  if (!event) {
    notFound();
  }

  const foodSchedule = FOOD_MENUS_BY_EVENT_ID[event.id] ?? [];

  if (foodSchedule.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff7ed_0%,_#ffffff_42%,_#fff1f2_100%)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Link
          href={`/events/${event.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-orange-700 hover:text-orange-800"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Event Details
        </Link>

        <header className="relative mt-6 overflow-hidden rounded-3xl border border-orange-200 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 p-6 text-white shadow-xl sm:p-8">
          <div className="pointer-events-none absolute -right-14 -top-10 h-36 w-36 rounded-full bg-white/15" aria-hidden="true" />
          <div className="pointer-events-none absolute -left-12 -bottom-12 h-32 w-32 rounded-full bg-white/10" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-50">
            Food Fiesta
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
            Food Menu
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-orange-50 sm:text-base">
            Explore the culinary side of {event.title}. Each day can feature either curated lunch and dinner menus or a lively food court with partner stalls and menu cards.
          </p>
        </header>

        <section className="mt-8" aria-labelledby="food-menu-heading">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="food-menu-heading" className="font-display text-2xl font-bold text-neutral-900 sm:text-3xl">
                Food Menu
              </h2>
            </div>
          </div>

          <FoodMenuTabs schedule={foodSchedule} />
        </section>

        <div className="mt-10 border-t border-orange-100 pt-6">
          <Link
            href={`/events/${event.id}`}
            className="inline-flex items-center gap-2 rounded-full border border-orange-300 bg-white px-5 py-2.5 text-sm font-semibold text-orange-700 hover:bg-orange-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Event Details
          </Link>
        </div>
      </div>
    </div>
  );
}

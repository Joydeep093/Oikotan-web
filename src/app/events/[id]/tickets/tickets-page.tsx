import Link from "next/link";
import { EVENTS } from "@/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { EventTicket } from "@/types";
import { generateTicketsMetadata } from "@/utils/metadata";
import TicketCard from "@/components/TicketCard";
import { TICKETS_BY_EVENT_ID } from "@/data/tickets";

interface TicketsPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: TicketsPageProps): Promise<Metadata> {
  const p = (await params) as { id: string };
  const event = EVENTS.find((e) => e.id === p.id);
  return generateTicketsMetadata(event);
}

const CATEGORY_STYLES: Record<
  EventTicket["category"],
  {
    bg: string;
    badge: string;
    icon: string;
    accent: string;
    border: string;
    glow: string;
  }
> = {
  pass: {
    bg: "from-violet-600 via-purple-600 to-indigo-600",
    badge: "bg-violet-100 text-violet-800",
    icon: "🎟️",
    accent: "text-violet-700",
    border: "border-violet-200",
    glow: "shadow-violet-100",
  },
  puja: {
    bg: "from-amber-500 via-orange-500 to-yellow-500",
    badge: "bg-amber-100 text-amber-800",
    icon: "🪔",
    accent: "text-amber-700",
    border: "border-amber-200",
    glow: "shadow-amber-100",
  },
  food: {
    bg: "from-orange-500 via-red-400 to-rose-500",
    badge: "bg-orange-100 text-orange-800",
    icon: "🍛",
    accent: "text-orange-700",
    border: "border-orange-200",
    glow: "shadow-orange-100",
  },
  cultural: {
    bg: "from-indigo-500 via-blue-500 to-sky-500",
    badge: "bg-indigo-100 text-indigo-800",
    icon: "🎭",
    accent: "text-indigo-700",
    border: "border-indigo-200",
    glow: "shadow-indigo-100",
  },
  dandiya: {
    bg: "from-fuchsia-600 via-pink-500 to-rose-500",
    badge: "bg-fuchsia-100 text-fuchsia-800",
    icon: "🥁",
    accent: "text-fuchsia-700",
    border: "border-fuchsia-200",
    glow: "shadow-fuchsia-100",
  },
  special: {
    bg: "from-emerald-500 via-teal-500 to-cyan-500",
    badge: "bg-emerald-100 text-emerald-800",
    icon: "⭐",
    accent: "text-emerald-700",
    border: "border-emerald-200",
    glow: "shadow-emerald-100",
  },
};

const CATEGORY_ORDER: EventTicket["category"][] = [
  "pass",
  "puja",
  "food",
  "cultural",
  "dandiya",
  "special",
];

export default async function TicketsPage({ params }: TicketsPageProps) {
  const p = (await params) as { id: string };
  const event = EVENTS.find((e) => e.id === p.id);

  if (!event) {
    notFound();
  }

  const tickets = TICKETS_BY_EVENT_ID[event.id] ?? [];

  if (tickets.length === 0) {
    notFound();
  }

  // Group tickets by category in defined order
  const grouped = CATEGORY_ORDER.reduce<Record<string, EventTicket[]>>(
    (acc, cat) => {
      const items = tickets.filter((t) => t.category === cat);
      if (items.length) acc[cat] = items;
      return acc;
    },
    {},
  );

  const featuredTickets = tickets.filter((t) => t.featured);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#f5f3ff_0%,_#fff_40%,_#fdf4ff_100%)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Back link */}
        <Link
          href={`/events`}
          className="inline-flex items-center gap-1 text-sm font-medium text-violet-700 hover:text-violet-900 transition-colors"
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

        {/* Hero banner */}
        <header className="relative mt-6 overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 p-6 sm:p-10 text-white shadow-2xl">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-white/10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute right-32 bottom-0 h-32 w-32 rounded-full bg-pink-400/20"
            aria-hidden="true"
          />

          <p className="text-xs font-semibold uppercase tracking-widest text-fuchsia-200">
            Book Your Spot
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            {event.title} Tickets
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-fuchsia-100 leading-relaxed">
            Choose your experience — darshan passes, bhog meals, cultural
            evening, Dandiya Night, and more. Secure your spot before tickets
            run out.
          </p>

          {/* Quick stats strip */}
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { label: "Total Ticket Types", value: String(tickets.length) },
              {
                label: "Available Now",
                value: String(tickets.filter((t) => t.available).length),
              },
              {
                label: "Free Entry",
                value: String(tickets.filter((t) => t.price === 0).length),
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-white/15 px-4 py-2.5 backdrop-blur-sm text-center min-w-[100px]"
              >
                <p className="text-lg font-bold text-white">{stat.value}</p>
                <p className="text-xs text-fuchsia-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </header>

        {/* Featured tickets */}
        {featuredTickets.length > 0 && (
          <section className="mt-10" aria-labelledby="featured-heading">
            <h2
              id="featured-heading"
              className="font-display text-xl font-bold text-neutral-900 sm:text-2xl"
            >
              ⭐ Featured Tickets
            </h2>
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} featured />
              ))}
            </div>
          </section>
        )}

        {/* Grouped by category */}
        {Object.entries(grouped).map(([cat, items]) => {
          const style = CATEGORY_STYLES[cat as EventTicket["category"]];
          const labels: Record<EventTicket["category"], string> = {
            pass: "Festival Passes",
            puja: "Puja & Darshan",
            food: "Food Tickets",
            cultural: "Cultural Events",
            dandiya: "Dandiya Night",
            special: "Special Access",
          };

          return (
            <section
              key={cat}
              className="mt-10"
              aria-labelledby={`cat-${cat}-heading`}
            >
              <div className="mb-5 flex items-center gap-3">
                <div
                  className={`h-px flex-1 ${style.border} border-t`}
                  aria-hidden="true"
                />
                <h2
                  id={`cat-${cat}-heading`}
                  className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest ${style.accent}`}
                >
                  <span aria-hidden="true">{style.icon}</span>
                  {labels[cat as EventTicket["category"]]}
                </h2>
                <div
                  className={`h-px flex-1 ${style.border} border-t`}
                  aria-hidden="true"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            </section>
          );
        })}

        {/* Back button bottom */}
        <div className="mt-12 border-t border-violet-100 pt-6">
          <Link
            href={`/events/${event.id}`}
            className="inline-flex items-center gap-2 rounded-full border border-violet-300 bg-white px-5 py-2.5 text-sm font-semibold text-violet-700 hover:bg-violet-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
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

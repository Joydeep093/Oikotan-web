"use client";

import { formatTabDate } from "@/utils/dateFormatters";
import type { EventTicket } from "@/types";

const CATEGORY_STYLES: Record<
  EventTicket["category"],
  { bg: string; badge: string; icon: string; accent: string; border: string; glow: string }
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

interface TicketCardProps {
  ticket: EventTicket;
  featured?: boolean;
}

const PRICING_OPTION_STYLES: Record<"veg" | "non-veg" | "standard", string> = {
  veg: "border border-emerald-200 bg-emerald-100 text-emerald-800",
  "non-veg": "border border-rose-200 bg-rose-100 text-rose-800",
  standard: "border border-amber-200 bg-amber-100 text-amber-800",
};

export default function TicketCard({
  ticket,
  featured = false,
}: TicketCardProps) {
  const style = CATEGORY_STYLES[ticket.category];

  return (
    <article
      className={`relative overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${style.glow} ${style.border} ${!ticket.available ? "opacity-70" : ""}`}
      aria-label={ticket.title}
    >
      {/* Coloured top stripe */}
      <div className={`h-2 w-full bg-gradient-to-r ${style.bg}`} aria-hidden="true" />

      {/* Featured ribbon */}
      {featured && ticket.available && (
        <div className="absolute right-3 top-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow">
          Popular
        </div>
      )}

      {/* Sold out ribbon */}
      {!ticket.available && (
        <div className="absolute right-3 top-4 rounded-full bg-neutral-200 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-600">
          Closed
        </div>
      )}

      <div className="p-5">
        {/* Icon + category badge */}
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">{style.icon}</span>
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${style.badge}`}>
            {ticket.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-3 font-display text-lg font-bold text-neutral-900 leading-snug">
          {ticket.title}
        </h3>
        {ticket.subtitle && (
          <p className={`mt-0.5 text-xs font-semibold uppercase tracking-wide ${style.accent}`}>
            {ticket.subtitle}
          </p>
        )}

        {/* Date + time */}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-500">
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time dateTime={ticket.date}>{formatTabDate(ticket.date)}</time>
          </span>
          {ticket.time && (
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {ticket.time}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="mt-3 text-sm text-neutral-600 leading-relaxed line-clamp-2">
          {ticket.description}
        </p>

        {/* Includes list */}
        {ticket.includes.length > 0 && (
          <ul className="mt-4 space-y-1.5" role="list">
            {ticket.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-neutral-600">
                <svg className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${style.accent}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        )}

        {ticket.maxPerPerson && (
          <p className="mt-3 text-xs text-neutral-400">
            Max {ticket.maxPerPerson} per person
          </p>
        )}

        {/* Divider */}
        <div className="my-4 border-t border-dashed border-neutral-200" aria-hidden="true" />

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-3">
          <div>
            {ticket.priceOptions && ticket.priceOptions.length > 0 ? (
              <div className="space-y-1">
                {ticket.priceOptions.map((option) => (
                  <p key={option.label} className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${PRICING_OPTION_STYLES[option.label]}`}
                    >
                      {option.label}
                    </span>
                    <span className="text-base text-neutral-900">
                      {ticket.currency}&nbsp;{option.price.toFixed(2)}
                    </span>
                  </p>
                ))}
                <p className="text-xs text-neutral-400">per person</p>
              </div>
            ) : ticket.price === 0 ? (
              <p className="text-xl font-bold text-emerald-600">Free</p>
            ) : (
              <div>
                <p className="text-2xl font-bold text-neutral-900">
                  {ticket.currency}&nbsp;{ticket.price.toFixed(2)}
                </p>
                <p className="text-xs text-neutral-400">per person</p>
              </div>
            )}
          </div>

          {ticket.available ? (
            ticket.ticketUrl ? (
              <a
                href={ticket.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center rounded-full bg-gradient-to-r ${style.bg} px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
              >
                Book Now
              </a>
            ) : (
              <a
                href={`/contact`}
                className={`inline-flex items-center rounded-full bg-gradient-to-r ${style.bg} px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
              >
                Register
              </a>
            )
          ) : (
            <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-500">
              Closed
            </span>
          )}
        </div>

        {ticket.note && (
          <p className="mt-3 rounded-xl bg-neutral-50 px-3 py-2 text-xs text-neutral-500 leading-relaxed">
            {ticket.note}
          </p>
        )}
      </div>
    </article>
  );
}

import Image from "next/image";
import Link from "next/link";
import EventCard from "@/components/EventCard";
import type { Metadata } from "next";
import { UPCOMING_EVENTS } from "@/data/event-data";
import homeBanner from "@/assets/images/home_banner.jpeg";

export const metadata: Metadata = {
  title: "Oikotan – Indian Bengali Community in Lithuania",
  description:
    "Oikotan – A non-profit Indian Bengali cultural community in Lithuania. Celebrating heritage through Durga Puja, Bengali New Year, Saraswati Puja, Independence Day, and community events.",
};

export default function HomePage() {
  const upcomingEvents = UPCOMING_EVENTS.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );

  return (
    <>
      {/* ─── Hero ───────────────────────────────────────── */}
      <section
        className="relative isolate overflow-hidden text-white min-h-[72vh] flex items-center"
        aria-label="Hero section"
      >
        <Image
          src={homeBanner}
          alt="Oikotan community celebration"
          fill
          priority
          className="object-cover object-center scale-[1.03] saturate-110 contrast-105 brightness-[0.86]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/48 via-black/24 to-black/52"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(155,28,52,0.18),transparent_55%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-balance tracking-tight drop-shadow-[0_4px_14px_rgba(0,0,0,0.72)]">
              Oikotan
            </h1>
            <p className="mt-4 text-xl sm:text-2xl text-white font-medium leading-snug drop-shadow-[0_3px_10px_rgba(0,0,0,0.68)]">
              The Indian Bengali Cultural Association in Lithuania
            </p>
            <p className="mt-6 text-base sm:text-lg text-white/95 max-w-xl leading-relaxed drop-shadow-[0_3px_10px_rgba(0,0,0,0.62)]">
              Oikotan is a non-profit organization promoting and exercising the
              rich and deep roots of bengali traditions and cultural heritage.
              It has organized successful events that have helped to develop a
              vibrant and sound Bengali Community in Lithuania.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/events"
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-base font-semibold text-brand-700 shadow hover:bg-brand-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
              >
                View Events
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center rounded-full border-2 border-white/75 px-6 py-3 text-base font-semibold text-white hover:bg-white/12 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats strip ────────────────────────────────── */}
      {/* <section
        className="bg-neutral-900 text-white"
        aria-label="Organization statistics"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { label: "Founded", value: "2015" },
              { label: "Members", value: "500+" },
              { label: "Events per year", value: "10+" },
              { label: "Cities reached", value: "5" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-3xl font-display font-bold text-brand-400">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-sm text-neutral-400">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section> */}

      {/* ─── Upcoming Events ────────────────────────────── */}
      <section className="py-16 sm:py-20" aria-labelledby="events-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-brand-500 text-sm font-semibold uppercase tracking-widest">
                What&apos;s coming
              </p>
              <h2
                id="events-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mt-1"
              >
                Upcoming Events
              </h2>
            </div>
            <Link
              href="/events"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
              aria-label="View all events"
            >
              View all
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/events"
              className="inline-flex items-center rounded-full border border-brand-300 px-5 py-2 text-sm font-medium text-brand-600 hover:bg-brand-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              View all events
            </Link>
          </div>
        </div>
      </section>

      {/* ─── About Teaser ───────────────────────────────── */}
      <section
        className="bg-brand-50 py-16 sm:py-20"
        aria-labelledby="about-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div
              className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-400 to-brand-600 h-72 lg:h-96 flex items-center justify-center order-last lg:order-first"
              aria-hidden="true"
            >
              <div className="text-center text-white">
                <p className="text-8xl select-none">🎭</p>
                <p className="font-display text-2xl font-semibold opacity-90">
                  Culture &amp; Heritage
                </p>
              </div>
            </div>
            <div>
              <p className="text-brand-500 text-sm font-semibold uppercase tracking-widest">
                Who we are
              </p>
              <h2
                id="about-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mt-2"
              >
                Rooted in Tradition,
                <br />
                Blossoming in Lithuania
              </h2>
              <p className="mt-5 text-neutral-600 leading-relaxed">
                Oikotan is a name that speaks to unity and belonging. We are a
                non-profit cultural community dedicated to preserving Indian
                traditions, folk arts, music, and culture within the Lithuanian
                diaspora.
              </p>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                From Durga Puja to community picnics, our events bring together
                families, elders, and young people to share culture, language,
                food, and joy.
              </p>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center rounded-full bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                Learn more about us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ───────────────────────────────── */}
      {/* <section className="py-16 sm:py-20" aria-labelledby="testimonials-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-brand-500 text-sm font-semibold uppercase tracking-widest">Community voices</p>
            <h2 id="testimonials-heading" className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mt-1">
              What Our Members Say
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section> */}

      {/* ─── Partners ───────────────────────────────────── */}
      {/* <section className="bg-neutral-100 py-12" aria-labelledby="partners-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="partners-heading" className="text-center text-sm font-semibold uppercase tracking-widest text-neutral-500 mb-8">
            Our Valued Partners
          </h2>
          <ul className="flex flex-wrap justify-center gap-6 sm:gap-10" role="list">
            {PARTNERS.map((p) => (
              <li key={p.id}>
                <a
                  href={p.website ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl bg-white px-6 py-4 shadow-sm border border-neutral-200 text-sm font-medium text-neutral-700 hover:border-brand-300 hover:text-brand-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  aria-label={`Visit ${p.name} (opens in new tab)`}
                >
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section> */}

      {/* ─── CTA Banner ─────────────────────────────────── */}
      <section
        className="bg-gradient-to-r from-brand-600 to-accent-500 text-white py-16"
        aria-labelledby="cta-heading"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h2
            id="cta-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-balance"
          >
            Become Part of Our Community
          </h2>
          {/* <p className="mt-4 text-brand-100 text-lg">
            Join hundreds of Lithuanian families across the Netherlands who celebrate culture, stay connected, and call Oikotan home.
          </p> */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-white px-7 py-3 text-base font-semibold text-brand-600 shadow hover:bg-brand-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Join Oikotan
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center rounded-full border-2 border-white/70 px-7 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              View Events
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

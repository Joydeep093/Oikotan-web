import type { Metadata } from "next";
import Link from "next/link";
import { SPONSORS } from "@/data/sponsors";
import SponsorStrip from "@/components/SponsorStrip";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "Meet Oikotan's sponsors and community partners who support our cultural events and festivals in Lithuania.",
};

const groupedSponsors = SPONSORS.reduce<Record<string, typeof SPONSORS>>(
  (acc, sponsor) => {
    const year = String(sponsor.year);
    if (!acc[year]) acc[year] = [];
    acc[year].push(sponsor);
    return acc;
  },
  {},
);

const sortedYears = Object.keys(groupedSponsors).sort(
  (a, b) => Number(b) - Number(a),
);

export default function SponsorsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top,_#f0fafa_0%,_#ffffff_45%,_#fff7eb_100%)]">
      <div
        className="pointer-events-none absolute -left-28 top-16 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-28 top-40 h-80 w-80 rounded-full bg-accent-300/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/3 top-[46rem] h-64 w-64 rounded-full bg-festive-200/30 blur-3xl"
        aria-hidden="true"
      />

      <section className="relative isolate py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2.25rem] border border-brand-200/70 bg-gradient-to-br from-brand-600 via-accent-600 to-festive-500 p-8 text-white shadow-[0_30px_80px_-28px_rgba(13,138,138,0.55)] sm:p-12 lg:p-14">
            <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.16)_0%,transparent_40%,rgba(255,255,255,0.08)_100%)]" />
            <div className="relative max-w-3xl">
              <p className="text-brand-100 text-xs sm:text-sm font-semibold uppercase tracking-[0.26em]">
                Partner spotlight
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Sponsors Who Support
                <br />
                Every Celebration
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
                We are sincerely grateful to the organizations and individuals
                who support Oikotan&apos;s cultural festivals and community
                programs in Lithuania. Their generosity helps us keep our
                traditions alive and welcoming for everyone.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-sm transition hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Become a sponsor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="space-y-7">
            <div className="rounded-[1.8rem] border border-brand-200/70 bg-white/95 p-8 shadow-[0_12px_45px_-30px_rgba(0,0,0,0.55)] sm:p-9">
              <h2 className="font-display text-3xl font-bold text-neutral-900 sm:text-4xl">
                Supporting culture, heritage, and community
              </h2>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                Oikotan is fortunate to work with sponsors who value cultural
                preservation, community connection, and meaningful celebration.
                Their support enables us to host Durga Puja, cultural programs,
                and community events that highlight Bengali heritage in
                Lithuania. We are grateful for their partnership and commitment
                to our mission. Being a non-profit organization, the generous
                contributions of our sponsors and community partners are
                essential to the success of our events and programs.
              </p>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                If you are interested in sponsorship, partnership, or community
                collaboration, we would be happy to hear from you.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[1.8rem] border border-festive-200 bg-gradient-to-br from-festive-50 via-white to-brand-50 p-8 shadow-[0_15px_50px_-34px_rgba(13,138,138,0.45)] sm:p-9">
              <div
                className="pointer-events-none absolute right-0 top-0 h-28 w-28 translate-x-8 -translate-y-8 rounded-full bg-festive-300/30 blur-2xl"
                aria-hidden="true"
              />
              <h2 className="font-display text-2xl font-bold text-festive-900 sm:text-3xl">
                Become a sponsor
              </h2>
              <p className="mt-4 text-neutral-700 leading-relaxed">
                By sponsoring Oikotan, you help our community celebrate Bengali
                heritage in Lithuania. We offer thoughtful recognition, event
                visibility, and partner acknowledgement across our festival
                programs.
              </p>
              <div className="mt-6 space-y-4 text-sm text-neutral-700">
                <p>
                  <strong className="font-semibold text-neutral-900">
                    Email
                  </strong>
                  <br />
                  <a
                    href="mailto:bengalisinvilnius@gmail.com"
                    className="text-brand-700 hover:underline"
                  >
                    bengalisinvilnius@gmail.com
                  </a>
                </p>
                <p>
                  <strong className="font-semibold text-neutral-900">
                    Learn more
                  </strong>
                  <br />
                  Please send us a message and we&apos;ll help tailor a
                  sponsorship plan for your organization.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  Contact us about sponsorship
                </Link>
              </div>
            </div>
          </section>

          <aside className="space-y-6 lg:pt-2">
            <div className="rounded-[1.8rem] bg-gradient-to-br from-accent-600 via-accent-500 to-brand-500 p-8 text-white shadow-[0_22px_55px_-28px_rgba(146,29,63,0.65)] sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-100">
                Why sponsor Oikotan?
              </p>
              <h2 className="font-display text-3xl font-bold mt-4 sm:text-4xl">
                Support culture and grow with us.
              </h2>
              <ul className="mt-6 space-y-4 text-sm leading-relaxed text-white/90">
                <li>
                  • Share your brand respectfully at vibrant community
                  festivals.
                </li>
                <li>
                  • Contribute to cultural education and heritage-focused
                  events.
                </li>
                <li>
                  • Connect with a growing and engaged Bengali diaspora
                  audience.
                </li>
              </ul>
            </div>

            <div className="rounded-[1.8rem] border border-neutral-200 bg-white p-6 shadow-[0_12px_45px_-34px_rgba(0,0,0,0.55)] sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Sponsor tiers
              </p>
              <div className="mt-6 space-y-4 text-neutral-700">
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                  <p className="font-semibold text-neutral-900">
                    Event Partner
                  </p>
                  <p className="text-sm">
                    Prominent logo placement, event shout-outs.
                  </p>
                </div>
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                  <p className="font-semibold text-neutral-900">
                    Community Supporter
                  </p>
                  <p className="text-sm">
                    Recognition across marketing and event signage.
                  </p>
                </div>
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                  <p className="font-semibold text-neutral-900">
                    Cultural Patron
                  </p>
                  <p className="text-sm">
                    Support heritage programming and community workshops.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div id="sponsor-years" className="mt-14 space-y-10 sm:mt-16">
          {sortedYears.map((year, index) => (
            <section
              key={year}
              className="group rounded-[2rem] border border-neutral-200 bg-white p-1 shadow-[0_18px_55px_-40px_rgba(0,0,0,0.65)]"
            >
              <div
                className={`overflow-hidden rounded-[1.75rem] border px-6 py-8 sm:px-8 sm:py-10 ${
                  index % 2 === 0
                    ? "border-festive-200 bg-gradient-to-r from-festive-50 via-white to-brand-50"
                    : "border-accent-200 bg-gradient-to-r from-accent-50 via-white to-festive-50"
                }`}
              >
                <div>
                  <p
                    className={`text-sm uppercase tracking-[0.24em] font-semibold ${
                      index % 2 === 0 ? "text-festive-700" : "text-accent-700"
                    }`}
                  >
                    {year}
                  </p>
                  <h2 className="font-display text-3xl font-bold text-neutral-900 mt-2 sm:text-4xl">
                    Featured sponsors
                  </h2>
                  <p className="mt-3 max-w-2xl text-neutral-600 leading-relaxed">
                    We are thankful to these sponsors for supporting Oikotan
                    during this year and helping bring our cultural programs to
                    life.
                  </p>
                </div>

                <SponsorStrip sponsors={groupedSponsors[year]} />
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}

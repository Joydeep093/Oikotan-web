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
    const year = sponsor.year ? String(sponsor.year) : "Unlisted";
    if (!acc[year]) acc[year] = [];
    acc[year].push(sponsor);
    return acc;
  },
  {},
);

const sortedYears = Object.keys(groupedSponsors).sort((a, b) => {
  if (a === "Unlisted") return 1;
  if (b === "Unlisted") return -1;
  return Number(b) - Number(a);
});

export default function SponsorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 via-white to-neutral-50">
      <section className="bg-gradient-to-br from-brand-600 to-brand-800 text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-brand-100 text-sm font-semibold uppercase tracking-widest">
              Partner spotlight
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mt-3">
              Our Sponsors
            </h1>
            <p className="mt-5 text-base sm:text-lg text-brand-100 max-w-2xl leading-relaxed">
              These organizations and individuals help make Oikotan&apos;s cultural
              celebrations, events, and community programs possible in Lithuania.
              We honor their support and invite others to join the journey.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr] items-start">
          <section className="space-y-8">
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <h2 className="font-display text-3xl font-bold text-neutral-900">
                Supporting culture, heritage, and community
              </h2>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                Oikotan works with sponsors who care about cultural preservation,
                community connection, and meaningful celebration. Their support
                enables us to host vibrant Durga Puja ceremonies, performative
                events, and educational gatherings across Lithuania.
              </p>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                If you are interested in sponsorship, partnership, or a community
                collaboration, we would love to hear from you.
              </p>
            </div>

            <div className="rounded-3xl border border-brand-100 bg-brand-50 p-8 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-brand-900">
                Become a sponsor
              </h2>
              <p className="mt-4 text-neutral-700 leading-relaxed">
                Sponsor Oikotan to help our community celebrate Bengali heritage
                in Lithuania. We offer recognition opportunities, event visibility,
                and partner acknowledgement across our festival programs.
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
                  Send us a message and we&apos;ll help tailor a sponsorship plan
                  for your organization.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  Contact us about sponsorship
                </Link>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-gradient-to-br from-brand-500 to-accent-500 p-8 text-white shadow-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-100">
                Why sponsor Oikotan?
              </p>
              <h2 className="font-display text-3xl font-bold mt-4">
                Expand your reach with culture.
              </h2>
              <ul className="mt-6 space-y-4 text-sm leading-relaxed">
                <li>• Amplify your brand at community festivals.</li>
                <li>• Support cultural education and events.</li>
                <li>• Connect with a growing diaspora audience.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
                Sponsor tiers
              </p>
              <div className="mt-6 space-y-4 text-neutral-700">
                <div>
                  <p className="font-semibold text-neutral-900">Event Partner</p>
                  <p className="text-sm">Prominent logo placement, event shout-outs.</p>
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">Community Supporter</p>
                  <p className="text-sm">Recognition across marketing and event signage.</p>
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">Cultural Patron</p>
                  <p className="text-sm">Support heritage programming and community workshops.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="space-y-12">
          {sortedYears.map((year) => (
            <section key={year} className="rounded-[2rem] border border-neutral-200 bg-gradient-to-r from-brand-50 via-white to-brand-50 p-1 shadow-sm">
              <div className="overflow-hidden rounded-[1.75rem] bg-white p-8 sm:p-10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-brand-500 font-semibold">
                      {year === "Unlisted" ? "Evergreen" : year}
                    </p>
                    <h2 className="font-display text-3xl font-bold text-neutral-900 mt-2">
                      {year === "Unlisted" ? "Additional supporters" : "Featured sponsors"}
                    </h2>
                    <p className="mt-3 max-w-2xl text-neutral-600 leading-relaxed">
                      {year === "Unlisted"
                        ? "Sponsors without a listed year but still part of our network."
                        : "These sponsors supported Oikotan during the selected year and helped bring our cultural programs to life."}
                    </p>
                  </div>
                  <span className="inline-flex rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-700">
                    {year === "Unlisted" ? "Ongoing" : `${year}`}
                  </span>
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

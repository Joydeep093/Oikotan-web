// import { TEAM } from "@/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Oikotan – our history, mission, and the team behind the Lithuanian cultural community in Lithuania.",
};

const TIMELINE: { year: string; event: string }[] = [
  // { year: "2015", event: "Oikotan founded by a group of Lithuanian expat families living in Amsterdam." },
  // { year: "2016", event: "First Joninės midsummer celebration with over 100 attendees at Amsterdamse Bos." },
  // { year: "2018", event: "Membership grows to 200+. First Independence Day Gala launched and sold out." },
  // { year: "2020", event: "Virtual community events and mutual aid during the pandemic." },
  // { year: "2022", event: "Oikotan expands events to Rotterdam, The Hague, and Utrecht." },
  // { year: "2025", event: "500+ active members. 10+ annual events across the Netherlands." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-500 to-brand-700 text-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-brand-100 text-sm font-semibold uppercase tracking-widest mb-3">
              Who we are
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
              About Oikotan
            </h1>
            <p className="mt-5 text-brand-100 text-lg leading-relaxed">
              Oikotan - The Indian Bengali Community Vilnius, is a non-profit
              organization promoting and exercising the rich and deep roots of
              Bengali traditions and cultural heritage. It has organized
              successful events that have helped to develop a vibrant and sound
              Bengali community in Lithuania.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20" aria-labelledby="mission-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-brand-500 text-sm font-semibold uppercase tracking-widest">
                Our purpose
              </p>
              <h2
                id="mission-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mt-2"
              >
                Mission &amp; Vision
              </h2>
              <p className="mt-5 text-neutral-600 leading-relaxed">
                We are a non-profit Indian Bengali cultural community organization
                in Lithuania. Our mission is to preserve and promote
                Bengali language, folk arts, music, and
                traditions — ensuring that the next generation growing up in Lithuania remains deeply connected to their roots.
              </p>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                We believe culture is a living thing — it must be celebrated,
                shared, and passed on. Through festivals, workshops, and
                community initiatives, we create spaces where every Bengali
                feels at home.
              </p>

              <ul className="mt-6 space-y-3" aria-label="Our values">
                {[
                  "Preserve Bengali cultural heritage in the diaspora",
                  "Build an inclusive and welcoming community",
                  "Support the next generation\u2019s connection to their roots",
                  "Foster friendship between Indian and Lithuanian communities",
                ].map((v) => (
                  <li
                    key={v}
                    className="flex items-start gap-2 text-neutral-700 text-sm"
                  >
                    <span
                      className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-brand-100 flex items-center justify-center text-brand-600"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    {v}
                  </li>
                ))}
              </ul>
            </div>

            {/* <div className="rounded-3xl bg-brand-50 p-8 border border-brand-100">
              <p className="font-display text-2xl font-bold text-brand-700 mb-4">
                India
              </p>
              <p className="text-neutral-600 italic leading-relaxed text-lg">
                &ldquo;Together we are more than the sum of our parts. Oikotan
                is not just an organization — it is a family, a home, a
                celebration of who we are as Indians.”
              </p>
              <p className="mt-4 text-sm font-medium text-neutral-500">
                — Founding Members, 2025
              </p>
            </div> */}
          </div>
        </div>
      </section>

      {/* Timeline */}
      {/* <section
        className="bg-neutral-100 py-16 sm:py-20"
        aria-labelledby="history-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-500 text-sm font-semibold uppercase tracking-widest">
              Our journey
            </p>
          </div>
          <ol className="relative border-l-2 border-brand-200 ml-4 sm:ml-8 space-y-10">
            {TIMELINE.map((item) => (
              <li key={item.year} className="relative pl-8">
                <span
                  className="absolute -left-3 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white text-xs font-bold ring-4 ring-neutral-100"
                  aria-hidden="true"
                >
                  ●
                </span>
                <time
                  className="block text-xs font-semibold uppercase tracking-widest text-brand-600 mb-1"
                  dateTime={item.year}
                >
                  {item.year}
                </time>
                <p className="text-neutral-700 text-sm leading-relaxed">
                  {item.event}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section> */}

      {/* Team */}
      {/* <section className="py-16 sm:py-20" aria-labelledby="team-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-500 text-sm font-semibold uppercase tracking-widest">
              The people behind Oikotan
            </p>
            <h2
              id="team-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mt-1"
            >
              Our Team
            </h2>
          </div>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" role="list">
            {TEAM.map((member) => (
              <li
                key={member.id}
                className="rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm text-center"
              >
                <div
                  className="mx-auto mb-4 h-20 w-20 rounded-full bg-gradient-to-br from-brand-300 to-brand-500 flex items-center justify-center text-3xl text-white font-display font-bold select-none"
                  aria-hidden="true"
                >
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-neutral-900">
                  {member.name}
                </h3>
                <p className="text-sm text-brand-600 font-medium mt-0.5">
                  {member.role}
                </p>
                {member.bio && (
                  <p className="mt-2 text-xs text-neutral-500 leading-relaxed">
                    {member.bio}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section> */}
    </>
  );
}

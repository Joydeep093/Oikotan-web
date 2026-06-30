import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Oikotan and help fund community events, Durga Puja celebrations, and cultural programs in Lithuania.",
};

const DONATION_METHODS = [
  {
    title: "Bank Transfer",
    details: [
      {
        label: "Account Holder",
        value: "Oikotan - The Indian Bengali Cultural Association In Lithuania",
      },
      { label: "IBAN", value: "LT67 7300 0101 9781 6188" },
      { label: "BIC / SWIFT", value: "HABALT22" },
      { label: "Company Code", value: "307463573" },
      { label: "Bank", value: "Swedbank" },
    ],
  },
];

const DONATION_CATEGORIES = [
  {
    title: "মায়ের শাড়ী (৯টি) — €101,00",
    description: "Ritual sarees, dhotis, and gamchhas for Puja (9 in total).",
  },
  {
    title: "ষষ্ঠী পূজা — €51,00",
    description: "Sosthi Puja.",
  },
  {
    title: "সপ্তমী পূজা — €101,00",
    description: "Saptami Puja and offerings.",
  },
  {
    title: "অষ্টমী পূজা — €101,00",
    description: "Ashtami Puja and offerings.",
  },
  {
    title: "অষ্টমীর ভোগ — €601,00",
    description: "Bhog offerings for Maa Durga (Ashtami).",
  },
  {
    title: "সন্ধি পূজা সামগ্রী — €51,00",
    description: "Sandhi puja items.",
  },
  {
    title: "নবমীর পূজা — €101,00",
    description: "Nabami Puja and offerings.",
  },
  {
    title: "নবমীর যজ্ঞ — €51,00",
    description: "Nabami Havan.",
  },
  {
    title: "দশমী পূজা — €51,00",
    description: "Dashami Puja and offerings.",
  },
  {
    title: "দশকর্মা দ্রব্য — €51,00",
    description: "Dashakarma items.",
  },
  {
    title: "অন্যান্য পূজা সামগ্রী — €501,00",
    description:
      "Miscellaneous puja related items (flowers, hall decorations, storage of idol, etc.).",
  },
  {
    title: "Light & Sound System — €501,00",
    description: "Light and sound system support.",
  },
];

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 via-white to-neutral-50">
      <section className="bg-gradient-to-br from-brand-600 to-brand-800 text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
              Donate
            </h1>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] items-start">
          <section className="space-y-8">
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <h2 className="font-display text-3xl font-bold text-neutral-900">
                Why your support matters
              </h2>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                We, the Indian Bengali Community in Lithuania, are making a
                sincere effort to present the best Durga Puja celebrations in
                Lithuania. As a non-profit organization, we rely on the generous
                contributions of our patrons to organize this community event.
              </p>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                We kindly request your continued support by donating towards
                this year’s Durga Puja celebrations. Partial donations are also
                welcome and greatly appreciated.
              </p>
              {/* <ul className="mt-6 space-y-4 text-neutral-600">
                <li className="flex gap-3">
                  <span
                    className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-brand-600"
                    aria-hidden="true"
                  />
                  <span>
                    Support event logistics, venue rentals, and community meals.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span
                    className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-brand-600"
                    aria-hidden="true"
                  />
                  <span>
                    Help us keep cultural programming affordable for families
                    and students.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span
                    className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-brand-600"
                    aria-hidden="true"
                  />
                  <span>
                    Enable future cultural workshops, performances, and outreach
                    activities.
                  </span>
                </li>
              </ul> */}
              <p className="mt-6 text-sm text-neutral-600 leading-relaxed">
                After you make your donation, kindly send an email to
                <strong>&nbsp;bengalisinvilnius@gmail.com</strong> with your Full
                Name, Address, Phone Number, Email.
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <h2 className="font-display text-3xl font-bold text-neutral-900">
                Donation categories
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {DONATION_CATEGORIES.map((category) => (
                  <div
                    key={category.title}
                    className="rounded-2xl border border-neutral-200 bg-brand-50 p-5"
                  >
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {category.title}
                    </h3>
                    <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <h2 className="font-display text-3xl font-bold text-neutral-900">
                Donation options
              </h2>
              <div className="mt-6 space-y-6">
                {DONATION_METHODS.map((method) => (
                  <div
                    key={method.title}
                    className="rounded-2xl bg-neutral-50 border border-neutral-200 p-6"
                  >
                    <h3 className="text-xl font-semibold text-neutral-900">
                      {method.title}
                    </h3>
                    <dl className="mt-4 space-y-3 text-sm text-neutral-700">
                      {method.details.map((detail) => (
                        <div
                          key={detail.label}
                          className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"
                        >
                          <dt className="font-semibold text-neutral-600">
                            {detail.label}
                          </dt>
                          <dd className="text-neutral-900">{detail.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-brand-50 p-8 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-brand-900">
                Need help donating?
              </h2>
              <p className="mt-4 text-neutral-700 leading-relaxed">
                If you have any questions regarding donations, help
                with payment methods, or need bank confirmation, please reach out us.
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
                    Location
                  </strong>
                  <br />
                  Vilnius, Lithuania
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

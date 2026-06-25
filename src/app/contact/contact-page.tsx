import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Oikotan – for membership, event inquiries, sponsorships, and volunteering.",
};

const INFO = [
  {
    icon: "✉️",
    label: "Email",
    value: "bengalisinvilnius@gmail.com",
    href: "mailto:bengalisinvilnius@gmail.com",
  },
  {
    icon: "📍",
    label: "Location",
    value: "Vilnius, Lithuania",
    href: '',
  },
  {
    icon: "📘",
    label: "Facebook",
    value: "Oikotan-The-Indian Bengali Association in Lithuania",
    href: "https://www.facebook.com/p/Oikotan-The-Indian-Bengali-Association-Lithuania-61566110140543/",
  },
  {
    icon: "📸",
    label: "Instagram",
    value: "@oikotan_nl",
    href: "https://instagram.com",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-gradient-to-br from-brand-500 to-brand-700 text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-brand-100 text-sm font-semibold uppercase tracking-widest mb-3">Reach out</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold">Contact Us</h1>
          <p className="mt-4 text-brand-100 text-lg max-w-xl">
            Have a question, want to join, or interested in partnering with us? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Sidebar */}
          <aside aria-label="Contact information" className="space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-neutral-900 mb-5">Get in touch</h2>
              <ul className="space-y-4" role="list">
                {INFO.map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5 select-none" aria-hidden="true">{item.icon}</span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-sm text-neutral-800 hover:text-brand-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-neutral-800">{item.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Membership CTA */}
            <div className="rounded-2xl bg-brand-50 border border-brand-100 p-6">
              <h3 className="font-display font-semibold text-lg text-brand-800 mb-2">Become a Member</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Join our growing community and get priority access to events, news, and member benefits.
              </p>
              <p className="mt-3 text-sm text-neutral-600">
                Send us a message using the form or email us directly at{" "}
                <a href="mailto:bengalisinvilnius@gmail.com" className="text-brand-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded">
                  bengalisinvilnius@gmail.com
                </a>
              </p>
            </div>
          </aside>

          {/* Form */}
          <section aria-labelledby="contact-form-heading" className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 sm:p-8">
            <h2 id="contact-form-heading" className="font-display text-2xl font-bold text-neutral-900 mb-6">
              Send us a message
            </h2>
            <ContactForm />
          </section>
        </div>
      </div>
    </>
  );
}

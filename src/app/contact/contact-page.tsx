import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Oikotan – for membership, event inquiries, sponsorships, and volunteering.",
};

const INFO = [
  {
    icon: (
      <svg
        className="h-4 w-4 text-brand-600"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M4 4.5A2.5 2.5 0 016.5 2h11A2.5 2.5 0 0120 4.5v15A2.5 2.5 0 0117.5 22h-11A2.5 2.5 0 014 19.5v-15zM6.5 4a.5.5 0 00-.5.5V7l7 4.667L19 7V4.5a.5.5 0 00-.5-.5h-12zM19 8.56l-6.778 4.519a1 1 0 01-1.07 0L5 8.56V19.5a.5.5 0 00.5.5h13a.5.5 0 00.5-.5V8.56z" />
      </svg>
    ),
    label: "Email",
    value: "bengalisinvilnius@gmail.com",
    href: "mailto:bengalisinvilnius@gmail.com",
  },
  {
    icon: (
      <svg
        className="h-4 w-4 text-brand-600"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2C8.134 2 5 5.134 5 9c0 3.86 5.7 10.78 6.11 11.3a1 1 0 001.78 0C13.3 19.78 19 12.86 19 9c0-3.866-3.134-7-7-7zm0 16.18C11.7 17.7 7 11.56 7 9a5 5 0 1110 0c0 2.56-4.7 8.7-5 9.18z" />
        <path d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
      </svg>
    ),
    label: "Location",
    value: "Vilnius, Lithuania",
    href: "",
  },
  {
    icon: (
      <svg
        className="h-5 w-5 text-[#1877F2]"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692V11.08h3.128V8.413c0-3.1 1.892-4.788 4.656-4.788 1.325 0 2.464.099 2.795.143v3.24h-1.917c-1.504 0-1.794.716-1.794 1.763V12h3.587l-.467 3.626h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.324V1.325C24 .593 23.407 0 22.675 0z" />
      </svg>
    ),
    label: "Facebook",
    href: "https://www.facebook.com/p/Oikotan-The-Indian-Bengali-Association-Lithuania-61566110140543/",
    type: "social",
  },
  {
    icon: (
      <svg
        className="h-5 w-5 text-[#E1306C]"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.332 0 8.74 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.332 23.986 8.74 24 12 24s3.668-.014 4.948-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.28.072-1.688.072-4.948s-.014-3.668-.072-4.948c-.2-4.358-2.618-6.78-6.98-6.98C15.668.014 15.26 0 12 0z" />
        <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
      </svg>
    ),
    label: "Instagram",
    href: "https://instagram.com/bengalisinlithuania?igsh=MWtx2ZIMHY3dmZmaw==",
    type: "social",
  },
];


export default function ContactPage() {
  const contactItems = INFO.filter((item) => item.type !== "social");
  const socialItems = INFO.filter((item) => item.type === "social");

  return (
    <>
      {/* Page header */}
      <section className="bg-gradient-to-br from-brand-500 to-brand-700 text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-brand-100 text-sm font-semibold uppercase tracking-widest mb-3">
            Reach out
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold">
            Contact Us
          </h1>
          <p className="mt-4 text-brand-100 text-lg max-w-xl">
            Have a question, want to join, or interested in partnering with us?
            We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Sidebar */}
          <aside aria-label="Contact information" className="space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-neutral-900 mb-5">
                Get in touch
              </h2>
              <div className="space-y-6">
                <ul className="space-y-4" role="list">
                  {contactItems.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-4 w-4 items-center justify-center text-brand-600"
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
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

                <div className="flex items-center gap-3">
                  {socialItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 shadow-sm transition hover:border-brand-600 hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Membership CTA */}
            <div className="rounded-2xl bg-brand-50 border border-brand-100 p-6">
              <h3 className="font-display font-semibold text-lg text-brand-800 mb-2">
                Become a Member
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Join our growing community and get priority access to events,
                news, and member benefits.
              </p>
              <p className="mt-3 text-sm text-neutral-600">
                Send us a message using the form or email us directly at{" "}
                <a
                  href="mailto:bengalisinvilnius@gmail.com"
                  className="text-brand-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
                >
                  bengalisinvilnius@gmail.com
                </a>
              </p>
            </div>
          </aside>

          {/* Form */}
          <section
            aria-labelledby="contact-form-heading"
            className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 sm:p-8"
          >
            <h2
              id="contact-form-heading"
              className="font-display text-2xl font-bold text-neutral-900 mb-6"
            >
              Send us a message
            </h2>
            <ContactForm />
          </section>
        </div>
      </div>
    </>
  );
}

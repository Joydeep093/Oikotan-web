import Link from "next/link";
import Image from "next/image";
import { SITE_NAME, NAV_LINKS } from "@/data";
import logo from "@/assets/images/logo/logo.png";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded"
            >
              <Image
                src={logo}
                alt={`${SITE_NAME} logo`}
                height={64}
                className="h-16 w-auto"
                aria-hidden="true"
              />
              <span className="font-display text-xl font-bold text-white">
                {SITE_NAME}
              </span>
            </Link>
            <p className="mt-4 text-sm text-neutral-400 max-w-xs leading-relaxed">
              A non-profit Indian cultural community
              celebrating heritage, traditions, and the spirit of India
              in Lithuania.
            </p>
            <div className="mt-5 flex gap-4" aria-label="Social media links">
              <a
                href="https://www.facebook.com/p/Oikotan-The-Indian-Bengali-Association-Lithuania-61566110140543/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-[#1877F2] hover:text-[#1352b8] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1877F2] rounded"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692V11.08h3.128V8.413c0-3.1 1.892-4.788 4.656-4.788 1.325 0 2.464.099 2.795.143v3.24h-1.917c-1.504 0-1.794.716-1.794 1.763V12h3.587l-.467 3.626h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.324V1.325C24 .593 23.407 0 22.675 0z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/bengalisinlithuania?igsh=MWtx2ZIMHY3dmZmaw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[#E1306C] hover:text-[#bd0f57] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E1306C] rounded"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.332 0 8.74 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.332 23.986 8.74 24 12 24s3.668-.014 4.948-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.28.072-1.688.072-4.948s-.014-3.668-.072-4.948c-.2-4.358-2.618-6.78-6.98-6.98C15.668.014 15.26 0 12 0z" />
                  <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-neutral-400 hover:text-brand-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M21.582 7.186a2.506 2.506 0 0 0-1.768-1.768C18.254 5 12 5 12 5s-6.254 0-7.814.418a2.506 2.506 0 0 0-1.768 1.768C2 8.746 2 12 2 12s0 3.254.418 4.814a2.506 2.506 0 0 0 1.768 1.768C5.746 19 12 19 12 19s6.254 0 7.814-.418a2.506 2.506 0 0 0 1.768-1.768C22 15.254 22 12 22 12s0-3.254-.418-4.814zM10 15V9l5.2 3-5.2 3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-4">
              Navigation
            </h2>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-300 hover:text-brand-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-4">
              Contact
            </h2>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <a
                  href="mailto:bengalisinvilnius@gmail.com"
                  className="hover:text-brand-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded"
                >
                  bengalisinvilnius@gmail.com
                </a>
              </li>
              <li>Vilnius, Lithuania</li>
              <li className="text-neutral-500 text-xs mt-4">Company Code: 307463573</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-neutral-500">
          <p>
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <p>Made with ❤️ for the Indian community in Lithuania</p>
        </div>
      </div>
    </footer>
  );
}

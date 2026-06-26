"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { NAV_LINKS, SITE_NAME } from "@/data";
import logo from "@/assets/images/logo/logo.png";
import { PAST_EVENTS } from "@/data/event-data";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
            aria-label={`${SITE_NAME} – Home`}
          >
            <Image
              src={logo}
              alt={`${SITE_NAME} logo`}
              height={64}
              className="h-16 w-auto"
              aria-hidden="true"
            />
            <span className="font-display text-xl font-bold text-neutral-900 tracking-tight">
              {SITE_NAME}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-6"
          >
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              const isEventsLink = link.label === "Events";

              if (isEventsLink && PAST_EVENTS.length > 0) {
                return (
                  <div key={link.href} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`text-sm font-medium transition-colors hover:text-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded px-1 flex items-center gap-1 ${
                        active
                          ? "text-brand-500 border-b-2 border-brand-500 pb-0.5"
                          : "text-neutral-700"
                      }`}
                    >
                      {link.label}
                      <svg
                        className={`h-4 w-4 transition-transform ${
                          dropdownOpen ? "-rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 9l6 6 6-6"
                        />
                      </svg>
                    </button>

                    {dropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg py-2 min-w-max z-50">
                        <Link
                          href={link.href}
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                        >
                          All Events
                        </Link>
                        <div className="border-t border-neutral-100 my-1" />
                        <div className="px-4 py-1.5 text-xs uppercase tracking-widest text-neutral-500 font-semibold">
                          Past Events
                        </div>
                        {PAST_EVENTS.map((event) => (
                          <Link
                            key={event.id}
                            href={`/events/${event.id}`}
                            onClick={() => setDropdownOpen(false)}
                            className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-brand-600 transition-colors"
                          >
                            {event.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded px-1 ${
                    active
                      ? "text-brand-500 border-b-2 border-brand-500 pb-0.5"
                      : "text-neutral-700"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded p-2 text-neutral-700 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-neutral-200 bg-white px-4 pb-4 pt-2"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              const isEventsLink = link.label === "Events";

              if (isEventsLink && PAST_EVENTS.length > 0) {
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-brand-50 hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                        active
                          ? "bg-brand-50 text-brand-600"
                          : "text-neutral-700"
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                    {PAST_EVENTS.length > 0 && (
                      <ul className="ml-4 mt-1 space-y-1 border-l-2 border-neutral-200 pl-2">
                        <li className="text-xs uppercase tracking-widest text-neutral-500 font-semibold py-1">
                          Past Events
                        </li>
                        {PAST_EVENTS.map((event) => (
                          <li key={event.id}>
                            <Link
                              href={`/events/${event.id}`}
                              onClick={() => setMenuOpen(false)}
                              className="block rounded px-2 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 hover:text-brand-600 transition-colors"
                            >
                              {event.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-brand-50 hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                      active ? "bg-brand-50 text-brand-600" : "text-neutral-700"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 block rounded-full bg-brand-500 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-brand-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                Join Us
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Sponsor } from "@/types";

interface Props {
  sponsors: Sponsor[];
}

export default function SponsorStrip({ sponsors }: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || sponsors.length === 0) return;

    const scrollStep = () => {
      if (!el) return;
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      if (maxScrollLeft <= 0) return;

      const step = Math.min(el.clientWidth * 0.9, maxScrollLeft);
      const next = el.scrollLeft + step;

      if (el.scrollLeft >= maxScrollLeft - 2) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollTo({ left: Math.min(next, maxScrollLeft), behavior: "smooth" });
      }
    };

    // start auto-scroll
    intervalRef.current = window.setInterval(scrollStep, 5000);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [sponsors]);

  // pause on hover
  const handleMouseEnter = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const scrollStep = () => {
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      if (maxScrollLeft <= 0) return;
      const next = Math.min(el.scrollLeft + el.clientWidth * 0.9, maxScrollLeft);
      if (el.scrollLeft >= maxScrollLeft - 2) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollTo({ left: next, behavior: "smooth" });
      }
    };
    intervalRef.current = window.setInterval(scrollStep, 5000);
  };

  return (
    <div className="mt-8">
      <div
        ref={scrollerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="-mx-3 overflow-x-auto px-3 py-2 scroll-smooth no-scrollbar"
        role="list"
      >
        <div className="flex gap-4 items-stretch snap-x snap-mandatory">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="snap-center shrink-0 w-[48%] sm:w-[32%] md:w-[20%] lg:w-[16%]"
            >
              <div className="group relative flex h-28 items-center justify-center rounded-3xl border border-neutral-200 bg-neutral-50 p-4 shadow-sm overflow-hidden">
                <div className="flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                  <Image
                    src={sponsor.logo as any}
                    alt={sponsor.name}
                    title={sponsor.name}
                    className="max-h-12 object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

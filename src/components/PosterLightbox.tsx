"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";

interface PosterLightboxProps {
  src: StaticImageData;
  alt: string;
  buttonLabel?: string;
}

export default function PosterLightbox({
  src,
  alt,
  buttonLabel = "View Poster Full Screen",
}: PosterLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return;
    }

    document.body.style.overflow = "";
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
      >
        {buttonLabel}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Poster preview"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute -top-12 right-0 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-neutral-900 shadow hover:bg-white"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>

            <div className="max-h-[92vh] overflow-auto rounded-2xl border border-white/20 bg-neutral-900 p-2">
              <Image
                src={src}
                alt={alt}
                className="h-auto w-full rounded-xl object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

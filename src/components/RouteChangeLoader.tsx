"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";

export default function RouteChangeLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      const anchor = target.closest("a");
      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute("href");
      const isModifiedClick = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

      if (!href || isModifiedClick || anchor.target === "_blank" || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);
      const current = new URL(window.location.href);

      const isSameUrl =
        destination.pathname === current.pathname &&
        destination.search === current.search &&
        destination.hash === current.hash;

      const isSamePageAnchorNavigation =
        destination.pathname === current.pathname &&
        destination.search === current.search;

      // Do not show route loader when navigating to the same URL.
      if (isSameUrl) {
        return;
      }

      // Hash-only navigation stays on the same page and should not show loader.
      if (isSamePageAnchorNavigation) {
        return;
      }

      setIsLoading(true);
    }

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pathname, searchParams]);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] bg-white/80 backdrop-blur-[1px]" aria-hidden="true">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Loader />
      </div>
    </div>
  );
}
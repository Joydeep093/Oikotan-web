import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="text-8xl mb-6 select-none" aria-hidden="true">🎭</p>
      <h1 className="font-display text-4xl sm:text-5xl font-bold text-neutral-900">404 – Page Not Found</h1>
      <p className="mt-4 text-neutral-600 max-w-md">
        The page you are looking for does not exist. It may have been moved, renamed, or never existed.
      </p>
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-brand-500 px-6 py-3 text-base font-semibold text-white hover:bg-brand-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          Go Home
        </Link>
        <Link
          href="/events"
          className="inline-flex items-center rounded-full border border-neutral-300 px-6 py-3 text-base font-medium text-neutral-700 hover:bg-neutral-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          View Events
        </Link>
      </div>
    </div>
  );
}

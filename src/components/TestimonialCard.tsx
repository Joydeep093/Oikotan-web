import type { Testimonial } from "@/types";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <blockquote className="rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm">
      <svg className="h-8 w-8 text-brand-300 mb-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <p className="text-neutral-700 text-sm leading-relaxed italic">{testimonial.quote}</p>
      <footer className="mt-4">
        <cite className="not-italic font-semibold text-sm text-neutral-900">{testimonial.name}</cite>
      </footer>
    </blockquote>
  );
}

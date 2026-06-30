"use client";

import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

interface FormState {
  name: string;
  email: string;
  category: string;
  message: string;
  consent: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  category?: string;
  message?: string;
  consent?: string;
}

const INITIAL: FormState = {
  name: "",
  email: "",
  category: "",
  message: "",
  consent: false,
};

const CATEGORY_OPTIONS = [
  { value: "membership", label: "Membership" },
  { value: "events", label: "Events & Tickets" },
  { value: "sponsorship", label: "Sponsorship / Partnership" },
  { value: "volunteering", label: "Volunteering" },
  { value: "other", label: "Other" },
] as const;

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  function validate(): boolean {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.category.trim()) e.category = "Please select a category.";
    if (!form.message.trim()) e.message = "Message is required.";
    if (!form.consent) e.consent = "Please provide consent.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const fieldName = e.target.name as keyof FormState;
    const fieldValue =
      e.target instanceof HTMLInputElement && e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value;

    setForm((f) => ({ ...f, [fieldName]: fieldValue }));

    if (errors[fieldName as keyof FormErrors]) {
      setErrors((er) => ({ ...er, [fieldName]: undefined }));
    }
  }

  useEffect(() => {
    const publicKey =
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "QSFvYxqBh1D_kG0ss";
    if (!publicKey) {
      setSendError(
        "Email service is not configured. Please set NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.",
      );
      return;
    }
    emailjs.init(publicKey);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSendError(null);
    if (!validate()) return;

    const serviceId =
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_eb9tnnw";
    const templateId =
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_abkyjko";

    if (!serviceId || !templateId) {
      setSendError(
        "Email service is not configured. Please set EmailJS service and template IDs.",
      );
      return;
    }

    setSending(true);

    const templateParams = {
      name: form.name,
      email: form.email,
      category: form.category,
      message: form.message,
      consent: form.consent ? "Yes" : "No",
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams);
      setSubmitted(true);
      setForm(INITIAL);
    } catch (err: any) {
      setSendError(
        err?.text ||
          err?.message ||
          "Failed to send message. Please try again later.",
      );
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center"
      >
        <p className="text-4xl mb-4" aria-hidden="true">
          ✅
        </p>
        <h2 className="font-display text-2xl font-bold text-green-800">
          Thank you!
        </h2>
        <p className="mt-2 text-green-700">
          Your message has been received. We&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 inline-flex items-center rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="space-y-6"
    >
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-neutral-700 mb-1.5"
        >
          Full Name{" "}
          <span className="text-accent-500" aria-hidden="true">
            *
          </span>
          <span className="sr-only">(required)</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="block w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 transition"
          placeholder="Your full name"
        />
        {errors.name && (
          <p
            id="name-error"
            role="alert"
            className="mt-1.5 text-xs text-accent-500"
          >
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-neutral-700 mb-1.5"
        >
          Email Address{" "}
          <span className="text-accent-500" aria-hidden="true">
            *
          </span>
          <span className="sr-only">(required)</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="block w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 transition"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p
            id="email-error"
            role="alert"
            className="mt-1.5 text-xs text-accent-500"
          >
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-neutral-700 mb-1.5"
        >
          Category{" "}
          <span className="text-accent-500" aria-hidden="true">
            *
          </span>
          <span className="sr-only">(required)</span>
        </label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.category}
          aria-describedby={errors.category ? "category-error" : undefined}
          className="block w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm text-neutral-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 transition bg-white"
          required
        >
          <option value="">Select a topic…</option>
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <p
            id="category-error"
            role="alert"
            className="mt-1.5 text-xs text-accent-500"
          >
            {errors.category}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-neutral-700 mb-1.5"
        >
          Message{" "}
          <span className="text-accent-500" aria-hidden="true">
            *
          </span>
          <span className="sr-only">(required)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="block w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 transition resize-none"
          placeholder="Write your message here…"
        />
        {errors.message && (
          <p
            id="message-error"
            role="alert"
            className="mt-1.5 text-xs text-accent-500"
          >
            {errors.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="consent"
          className="flex items-start gap-3 text-sm text-neutral-700"
        >
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={form.consent}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-brand-600 focus:ring-brand-500"
            required
          />
          <span>
            I consent to Oikotan - The Indian Bengali Cultural Association in
            Lithuania storing my submitted information for the purpose of
            responding to my inquiry.
            <span className="text-accent-500" aria-hidden="true">
              {" "}
              *
            </span>
          </span>
        </label>
        {errors.consent && (
          <p
            id="consent-error"
            role="alert"
            className="mt-1.5 text-xs text-accent-500"
          >
            {errors.consent}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-brand-500 px-6 py-3.5 text-sm font-semibold text-white hover:bg-brand-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        disabled={sending}
        aria-busy={sending}
      >
        {sending ? "Sending…" : "Send Message"}
      </button>

      {sendError && (
        <p role="alert" className="mt-2 text-sm text-accent-500 text-center">
          {sendError}
        </p>
      )}

      <p className="text-xs text-neutral-400 text-center">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>
    </form>
  );
}

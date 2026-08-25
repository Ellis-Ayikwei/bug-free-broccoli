import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT } from "@/lib/contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Get in touch about your pledge or our mission.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-1 flex-col bg-slate-50">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center px-6 py-20 text-center sm:py-28">
        <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Contact us
        </span>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Talk to us
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600">
          Questions about your pledge, our mission, or anything else. Reach out and
          we will get back to you.
        </p>

        <div className="mt-10 grid w-full max-w-sm gap-4">
          <a
            href={`mailto:${CONTACT.email}`}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 text-left transition-colors hover:border-slate-400"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Email
              </span>
              <span className="mt-0.5 block text-sm font-medium text-slate-900">
                {CONTACT.email}
              </span>
            </span>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M7 4l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <a
            href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 text-left transition-colors hover:border-slate-400"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Phone
              </span>
              <span className="mt-0.5 block text-sm font-medium text-slate-900">
                {CONTACT.phone}
              </span>
            </span>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M7 4l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <Link
          href="/"
          className="mt-10 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400"
        >
          Back to home
        </Link>
      </div>

      <Footer />
    </div>
  );
}

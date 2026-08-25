import Link from "next/link";
import { CONTACT } from "@/lib/contact";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Our Mission";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-5xl gap-8 px-6 py-10 sm:grid-cols-3 sm:py-12">
        <div>
          <div className="text-sm font-semibold text-slate-900">{siteName}</div>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-500">
            Pledges recorded here are commitments of intent. No payment is taken at
            this stage.
          </p>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Contact us
          </div>
          <div className="mt-3 space-y-2 text-sm">
            <a
              href={`mailto:${CONTACT.email}`}
              className="block text-slate-600 hover:text-slate-900"
            >
              {CONTACT.email}
            </a>
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              className="block text-slate-600 hover:text-slate-900"
            >
              {CONTACT.phone}
            </a>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Links
          </div>
          <div className="mt-3 space-y-2 text-sm">
            <Link href="/contact" className="block text-slate-600 hover:text-slate-900">
              Get in touch
            </Link>
            <Link href="/admin/login" className="block text-slate-600 hover:text-slate-900">
              Admin
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 px-6 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {siteName}. All rights reserved.
      </div>
    </footer>
  );
}

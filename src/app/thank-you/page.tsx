import Link from "next/link";
import Footer from "@/components/Footer";

const currency = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

export default async function ThankYouPage({
  searchParams,
}: PageProps<"/thank-you">) {
  const params = await searchParams;
  const amountParam = Array.isArray(params.amount) ? params.amount[0] : params.amount;
  const amount = amountParam ? Number(amountParam) : null;
  const formattedAmount = amount && Number.isFinite(amount) ? currency.format(amount) : null;

  return (
    <div className="flex flex-1 flex-col bg-slate-50">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="mt-6 text-2xl font-semibold text-slate-900 sm:text-3xl">
          Thank you for your pledge
        </h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-slate-600">
          {formattedAmount
            ? `We've recorded your pledge of ${formattedAmount}. We'll be in touch about next steps.`
            : "We've recorded your pledge. We'll be in touch about next steps."}
        </p>

        <Link
          href="/"
          className="mt-8 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400"
        >
          Back to home
        </Link>
      </div>

      <Footer />
    </div>
  );
}

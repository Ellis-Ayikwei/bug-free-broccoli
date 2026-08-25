"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { PLEDGE_AMOUNTS, pledgeInputSchema } from "@/lib/validation";

type FieldErrors = Partial<
  Record<"amount" | "email" | "phone" | "licenseDetails" | "consent", string>
>;

const currency = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

export default function PledgeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [amount, setAmount] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [licenseDetails, setLicenseDetails] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    const parsed = pledgeInputSchema.safeParse({
      amount,
      email,
      phone,
      licenseDetails,
      consent,
    });

    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      await axios.post("/api/pledges", parsed.data);
      router.push(`/thank-you?amount=${parsed.data.amount}`);
    } catch (err) {
      setSubmitting(false);
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        setSubmitError(err.response.data.error as string);
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pledge-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white p-6 shadow-xl sm:max-w-lg sm:rounded-2xl sm:p-8">
        <div className="mb-6 flex items-start justify-between">
          <h2 id="pledge-modal-title" className="text-xl font-semibold text-slate-900">
            Make your pledge
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-m-2 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <fieldset>
            <legend className="mb-2 block text-sm font-medium text-slate-700">
              Pledge amount
            </legend>
            <div className="grid grid-cols-5 gap-2">
              {PLEDGE_AMOUNTS.map((value) => {
                const selected = amount === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAmount(value)}
                    aria-pressed={selected}
                    className={`rounded-lg border px-2 py-2.5 text-sm font-medium transition-colors ${
                      selected
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                    }`}
                  >
                    {currency.format(value)}
                  </button>
                );
              })}
            </div>
            {errors.amount && (
              <p className="mt-2 text-sm text-red-600">{errors.amount}</p>
            )}
          </fieldset>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded-lg border px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20 ${
                errors.email ? "border-red-400" : "border-slate-200"
              }`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-700">
              Phone number
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full rounded-lg border px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20 ${
                errors.phone ? "border-red-400" : "border-slate-200"
              }`}
              placeholder="07700 900000"
            />
            {errors.phone && <p className="mt-1.5 text-sm text-red-600">{errors.phone}</p>}
          </div>

          <div>
            <label
              htmlFor="licenseDetails"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              PCO license details <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <p className="mb-1.5 text-xs text-slate-500">
              Only fill this in if your pledge is linked to a PCO license, add the reference or
              details here. Leave blank if that doesn&apos;t apply to you.
            </p>
            <textarea
              id="licenseDetails"
              value={licenseDetails}
              onChange={(e) => setLicenseDetails(e.target.value)}
              maxLength={200}
              rows={2}
              className={`w-full resize-none rounded-lg border px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20 ${
                errors.licenseDetails ? "border-red-400" : "border-slate-200"
              }`}
            />
            <div className="mt-1 flex items-center justify-between">
              {errors.licenseDetails ? (
                <p className="text-sm text-red-600">{errors.licenseDetails}</p>
              ) : (
                <span />
              )}
              <span className="text-xs text-slate-400">{licenseDetails.length}/200</span>
            </div>
          </div>

          <div>
            <label className="flex items-start gap-2.5">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900/20"
              />
              <span className="text-sm text-slate-600">
                I agree to be contacted about this pledge.
              </span>
            </label>
            {errors.consent && <p className="mt-1.5 text-sm text-red-600">{errors.consent}</p>}
          </div>

          {submitError && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{submitError}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Confirm pledge"}
          </button>
        </form>
      </div>
    </div>
  );
}

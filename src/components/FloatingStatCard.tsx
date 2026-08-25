"use client";

import { usePledgeStats } from "@/hooks/usePledgeStats";

const currency = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

export default function FloatingStatCard() {
  const stats = usePledgeStats();

  return (
    <div className="flex items-center gap-3 bg-white px-4 py-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-emerald-500 text-white">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M4 10l4 4 8-8"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <div className="leading-tight">
        <div className="text-sm font-semibold text-slate-900">
          {stats ? currency.format(stats.totalRaised) : "—"} pledged
        </div>
        <div className="text-xs text-slate-500">
          by {stats ? stats.contributorCount.toLocaleString("en-GB") : "—"} people so far
        </div>
      </div>
    </div>
  );
}

"use client";

import { usePledgeStats } from "@/hooks/usePledgeStats";

const currency = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

export default function StatsBar() {
  const stats = usePledgeStats();

  const items = [
    { label: "Total pledged", value: stats ? currency.format(stats.totalRaised) : "—" },
    { label: "Contributors", value: stats ? stats.contributorCount.toLocaleString("en-GB") : "—" },
    {
      label: "Average pledge",
      value: stats ? currency.format(stats.averageContribution) : "—",
    },
  ];

  return (
    <div className="grid grid-cols-3 divide-x divide-slate-200 rounded-xl border border-slate-200 bg-white">
      {items.map((item) => (
        <div key={item.label} className="px-3 py-4 text-center sm:px-6 sm:py-5">
          <div className="text-lg font-semibold text-slate-900 sm:text-2xl">{item.value}</div>
          <div className="mt-1 text-xs text-slate-500 sm:text-sm">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { getPledgeStats } from "@/lib/stats";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export const dynamic = "force-dynamic";

const currency = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!verifyAdminSessionToken(token)) {
    redirect("/admin/login");
  }

  const [pledges, stats] = await Promise.all([
    prisma.pledge.findMany({ orderBy: { createdAt: "desc" } }),
    getPledgeStats(),
  ]);

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900">Pledges</h1>
        <div className="flex items-center gap-3">
          <a
            href="/api/admin/pledges/export"
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:border-slate-400"
          >
            Export to Excel
          </a>
          <AdminLogoutButton />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 divide-x divide-slate-200 rounded-xl border border-slate-200 bg-white">
        <div className="px-4 py-4 text-center">
          <div className="text-xl font-semibold text-slate-900">
            {currency.format(stats.totalRaised)}
          </div>
          <div className="mt-1 text-xs text-slate-500">Total pledged</div>
        </div>
        <div className="px-4 py-4 text-center">
          <div className="text-xl font-semibold text-slate-900">{stats.contributorCount}</div>
          <div className="mt-1 text-xs text-slate-500">Contributors</div>
        </div>
        <div className="px-4 py-4 text-center">
          <div className="text-xl font-semibold text-slate-900">
            {currency.format(stats.averageContribution)}
          </div>
          <div className="mt-1 text-xs text-slate-500">Average pledge</div>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">PCO license details</th>
            </tr>
          </thead>
          <tbody>
            {pledges.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                  No pledges yet.
                </td>
              </tr>
            )}
            {pledges.map((pledge) => (
              <tr key={pledge.id} className="border-b border-slate-100 last:border-0">
                <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                  {dateFormatter.format(pledge.createdAt)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900">
                  {currency.format(pledge.amount)}
                </td>
                <td className="px-4 py-3 text-slate-600">{pledge.email}</td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-600">{pledge.phone}</td>
                <td className="px-4 py-3 text-slate-600">{pledge.licenseDetails || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

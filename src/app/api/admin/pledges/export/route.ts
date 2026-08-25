import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { toCsv } from "@/lib/csv";

export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!verifyAdminSessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pledges = await prisma.pledge.findMany({ orderBy: { createdAt: "desc" } });

  const csv = toCsv(
    ["Date", "Amount (GBP)", "Email", "Phone", "PCO license details"],
    pledges.map((pledge) => [
      pledge.createdAt.toISOString(),
      String(pledge.amount),
      pledge.email,
      pledge.phone,
      pledge.licenseDetails ?? "",
    ])
  );

  const date = new Date().toISOString().slice(0, 10);

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="pledges-${date}.csv"`,
    },
  });
}

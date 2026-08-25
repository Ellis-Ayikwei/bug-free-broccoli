import { NextResponse } from "next/server";
import { getPledgeStats } from "@/lib/stats";

export const dynamic = "force-dynamic";

export async function GET() {
  const stats = await getPledgeStats();
  return NextResponse.json(stats);
}

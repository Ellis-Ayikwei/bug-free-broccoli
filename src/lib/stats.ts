import { prisma } from "@/lib/prisma";

export type PledgeStats = {
  totalRaised: number;
  contributorCount: number;
  averageContribution: number;
};

export async function getPledgeStats(): Promise<PledgeStats> {
  const { _sum, _count } = await prisma.pledge.aggregate({
    _sum: { amount: true },
    _count: true,
  });

  const totalRaised = _sum.amount ?? 0;
  const contributorCount = _count;
  const averageContribution =
    contributorCount > 0 ? Math.round(totalRaised / contributorCount) : 0;

  return { totalRaised, contributorCount, averageContribution };
}

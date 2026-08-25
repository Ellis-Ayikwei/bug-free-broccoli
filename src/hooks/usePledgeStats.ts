"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import type { PledgeStats } from "@/lib/stats";

const POLL_INTERVAL_MS = 30_000;

export function usePledgeStats() {
  const [stats, setStats] = useState<PledgeStats | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const { data } = await axios.get<PledgeStats>("/api/stats");
        if (!cancelled) setStats(data);
      } catch {
        // Keep showing the last known stats if a poll fails.
      }
    }

    fetchStats();
    const interval = setInterval(fetchStats, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return stats;
}

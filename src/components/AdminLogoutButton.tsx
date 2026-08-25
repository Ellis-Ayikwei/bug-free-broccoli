"use client";

import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await axios.post("/api/admin/logout");
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:border-slate-400"
    >
      Log out
    </button>
  );
}

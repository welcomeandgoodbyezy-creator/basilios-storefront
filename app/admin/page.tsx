"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reservations");
      const data = await res.json();
      setReservations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchReservations();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = filter === "all"
    ? reservations
    : reservations.filter((r) => r.status === filter);

  const stats = {
    total: reservations.length,
    pending: reservations.filter((r) => r.status === "pending").length,
    confirmed: reservations.filter((r) => r.status === "confirmed").length,
    cancelled: reservations.filter((r) => r.status === "cancelled").length,
  };

  return (
    <div className="min-h-screen bg-[#1a0f0a] text-amber-100 p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-black text-white">
          Admin <span className="text-amber-400">Dashboard</span>
        </h1>
        <div className="flex gap-4">
          <button
            onClick={fetchReservations}
            className="bg-[#2c1810] text-amber-400 px-4 py-2 rounded-lg border-2 border-amber-400/50 hover:bg-amber-400 hover:text-[#2c1810] transition-all text-sm font-bold"
          >
            Refresh
          </button>
          <Link href="/" className="bg-[#2c1810] text-amber-400 px-4 py-2 rounded-lg border-2 border-amber-400/50 hover:bg-amber-400 hover:text-[#2c1810] transition-all text-sm font-bold">
            ← Back to Site
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#2c1810] p-6 rounded-xl border border-amber-400/30">
          <div className="text-amber-400 text-sm">Total</div>
          <div className="text-3xl font-bold text-white">{stats.total}</div>
        </div>
        <div className="bg-[#2c1810] p-6 rounded-xl border border-yellow-400/30">
          <div className="text-yellow-400 text-sm">Pending</div>
          <div className="text-3xl font-bold text-white">{stats.pending}</div>
        </div>
        <div className="bg-[#2c1810] p-6 rounded-xl border border-green-400/30">
          <div className="text-green-400 text-sm">Confirmed</div>
          <div className="text-3xl font-bold text-white">{stats.confirmed}</div>
        </div>
        <div className="bg-[#2c1810] p-6 rounded-xl border border-red-400/30">
          <div className="text-red-400 text-sm">Cancelled</div>
          <div className="text-3xl font-bold text-white">{stats.cancelled}</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-4 mb-6">
        {["all", "pending", "confirmed", "cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-6 py-2 rounded-lg font-bold capitalize transition-all ${
              filter === status
                ? "bg-amber-500 text-[#2c1810]"
                : "bg-[#2c1810] text-amber-300 border-2 border-amber-400/30 hover:border-amber-400/70"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-4">
        {loading && (
          <div className="text-center py-12 text-amber-100/50">Loading...</div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-12 text-amber-100/50">
            No {filter === "all" ? "" : filter + " "}reservations yet.
          </div>
        )}

        {filtered.map((r) => (
          <div key={r.id} className="bg-[#2c1810] p-6 rounded-xl border border-amber-400/30">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-xl font-bold text-white">{r.name}</h3>
                <p className="text-amber-100/70 text-sm">{r.phone} • {r.email}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                r.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                r.status === "confirmed" ? "bg-green-500/20 text-green-400" :
                "bg-red-500/20 text-red-400"
              }`}>
                {r.status}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm mb-3">
              <div>
                <div className="text-amber-400 text-xs">Date</div>
                <div className="text-white">{r.date}</div>
              </div>
              <div>
                <div className="text-amber-400 text-xs">Time</div>
                <div className="text-white">{r.time}</div>
              </div>
              <div>
                <div className="text-amber-400 text-xs">Guests</div>
                <div className="text-white">{r.guests}</div>
              </div>
              <div>
                <div className="text-amber-400 text-xs">Occasion</div>
                <div className="text-white">{r.occasion || "—"}</div>
              </div>
            </div>
            {r.notes && (
              <div className="mb-3 text-sm">
                <div className="text-amber-400 text-xs">Notes</div>
                <div className="text-amber-100/80">{r.notes}</div>
              </div>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => updateStatus(r.id, "confirmed")}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-colors text-sm font-bold"
              >
                Confirm
              </button>
              <button
                onClick={() => updateStatus(r.id, "cancelled")}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors text-sm font-bold"
              >
                Cancel
              </button>
              <a
                href={`tel:${r.phone}`}
                className="bg-amber-600 text-[#2c1810] px-4 py-2 rounded-lg hover:bg-amber-500 transition-colors text-sm font-bold"
              >
                Call
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/reservations")
      .then((res) => res.json())
      .then((data) => setReservations(data))
      .catch(() => setReservations([]));
  }, []);

  return (
    <div className="min-h-screen bg-[#1a0f0a] text-amber-100 p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-black text-white">
          Admin <span className="text-amber-400">Dashboard</span>
        </h1>
        <Link href="/" className="text-amber-400 underline">
          ← Back to Site
        </Link>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#2c1810] p-6 rounded-xl border border-amber-400/30">
          <div className="text-amber-400 text-sm">Total</div>
          <div className="text-3xl font-bold text-white">{reservations.length}</div>
        </div>
        <div className="bg-[#2c1810] p-6 rounded-xl border border-yellow-400/30">
          <div className="text-yellow-400 text-sm">Pending</div>
          <div className="text-3xl font-bold text-white">
            {reservations.filter((r) => r.status === "pending").length}
          </div>
        </div>
        <div className="bg-[#2c1810] p-6 rounded-xl border border-green-400/30">
          <div className="text-green-400 text-sm">Confirmed</div>
          <div className="text-3xl font-bold text-white">
            {reservations.filter((r) => r.status === "confirmed").length}
          </div>
        </div>
        <div className="bg-[#2c1810] p-6 rounded-xl border border-red-400/30">
          <div className="text-red-400 text-sm">Cancelled</div>
          <div className="text-3xl font-bold text-white">
            {reservations.filter((r) => r.status === "cancelled").length}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {reservations.length === 0 && (
          <div className="text-center py-12 text-amber-100/50">
            No reservations yet. Submit one from the reservations page.
          </div>
        )}
        {reservations.map((r) => (
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
            <div className="grid grid-cols-4 gap-4 text-sm">
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
              <div className="mt-3 text-sm">
                <div className="text-amber-400 text-xs">Notes</div>
                <div className="text-amber-100/80">{r.notes}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
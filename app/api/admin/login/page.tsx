"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh(); // forces middleware to re-evaluate
    } else {
      setError("Invalid password. Access denied.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a0f0a] text-amber-100 flex items-center justify-center px-6 relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-[#1a0f0a] via-[#2c1810] to-[#3d2817]" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.15)_0%,transparent_70%)] animate-pulse" style={{ animationDuration: '4s' }} />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-[flicker_3s_ease-in-out_infinite]">🔒</div>
          <h1 className="text-4xl font-black text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Admin <span className="text-amber-400">Access</span>
          </h1>
          <p className="text-amber-100/70 mt-2">Authorized personnel only</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-[#2c1810] to-[#1a0f0a] p-8 rounded-2xl border-2 border-amber-400/30 shadow-2xl">
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-amber-300 font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1a0f0a] border-2 border-amber-400/30 rounded-lg px-4 py-3 text-amber-100 focus:border-amber-400 focus:outline-none transition-all focus:shadow-lg focus:shadow-amber-500/20"
              placeholder="Enter admin password"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-[#2c1810] px-6 py-3 font-bold rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg hover:shadow-amber-500/50 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Enter Dashboard"}
          </button>

          <div className="mt-6 text-center">
            <a href="/" className="text-amber-400/60 hover:text-amber-400 text-sm transition-colors">
              ← Back to Basilio's
            </a>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes flicker {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
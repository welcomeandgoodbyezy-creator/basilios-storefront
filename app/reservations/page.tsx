"use client";

import { useState } from "react";
import Link from "next/link";

export default function ReservationsPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    guests: "2",
    occasion: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#1a0f0a] text-amber-100 flex items-center justify-center px-6 relative overflow-hidden">
        <div className="fixed inset-0 bg-gradient-to-br from-[#1a0f0a] via-[#2c1810] to-[#3d2817]" />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.2)_0%,transparent_70%)] animate-pulse" style={{ animationDuration: '3s' }} />

        <div className="relative z-10 max-w-2xl text-center">
          <div className="text-8xl mb-6 animate-[flicker_2s_ease-in-out_infinite]">🔥</div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Reservation <span className="text-amber-400">Confirmed!</span>
          </h1>
          <p className="text-amber-100/90 text-xl mb-4">
            Your table is being prepared. We'll call you shortly to confirm.
          </p>
          <p className="text-amber-200/60 text-sm mb-10 italic">
            — The Basilio Family
          </p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-[#2c1810] px-10 py-4 font-bold rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg hover:shadow-amber-500/50 text-lg"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a0f0a] text-amber-100 overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#1a0f0a] via-[#2c1810] to-[#3d2817]" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.1)_0%,transparent_70%)] animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.08)_0%,transparent_50%)] animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />

      {/* Rising embers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-[10%] w-2 h-2 bg-amber-400 rounded-full animate-[rise_8s_ease-in_infinite] blur-[1px]" />
        <div className="absolute bottom-0 left-[25%] w-1.5 h-1.5 bg-orange-400 rounded-full animate-[rise_10s_ease-in_infinite_2s] blur-[1px]" />
        <div className="absolute bottom-0 left-[40%] w-2.5 h-2.5 bg-amber-300 rounded-full animate-[rise_9s_ease-in_infinite_1s] blur-[2px]" />
        <div className="absolute bottom-0 left-[55%] w-2 h-2 bg-yellow-400 rounded-full animate-[rise_11s_ease-in_infinite_3s] blur-[1px]" />
        <div className="absolute bottom-0 left-[70%] w-3 h-3 bg-amber-400 rounded-full animate-[rise_8.5s_ease-in_infinite_1.5s] blur-[2px]" />
        <div className="absolute bottom-0 left-[85%] w-1.5 h-1.5 bg-orange-300 rounded-full animate-[rise_10.5s_ease-in_infinite_2.5s] blur-[1px]" />
      </div>

      {/* Hero */}
      <header className="relative py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-6">
            <div className="text-6xl animate-[flicker_3s_ease-in-out_infinite]">🔥</div>
          </div>

          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-400/60"></div>
            <div className="mx-4 text-amber-400 text-2xl animate-pulse">✦</div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-400/60"></div>
          </div>

          <p className="text-amber-400 font-serif italic text-2xl mb-2">Book Your Table</p>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
            Reserve Your <span className="text-amber-400">Spot</span>
          </h1>
          <p className="text-amber-100/90 text-xl max-w-2xl mx-auto leading-relaxed">
            Whether it's a birthday, anniversary, or just a Tuesday — every meal at Basilio's is worth saving a seat for.
          </p>
        </div>
      </header>

      {/* Why Reserve Cards */}
      <section className="relative py-12 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: "🎂", title: "Special Occasions", desc: "Birthdays, anniversaries, celebrations — we'll make it memorable." },
            { icon: "👨‍👩‍‍👦", title: "Group Dining", desc: "Large party? We'll set up the perfect table for your crew." },
            { icon: "⚡", title: "Skip the Wait", desc: "Reserved tables get priority. No standing in line, ever." },
          ].map((card, i) => (
            <div
              key={i}
              className="group bg-gradient-to-br from-[#2c1810] to-[#1a0f0a] p-6 rounded-2xl border-2 border-amber-400/30 hover:border-amber-400/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/30 text-center animate-[fadeInUp_0.6s_ease-out]"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{card.icon}</div>
              <h3 className="text-amber-300 font-bold text-lg mb-2">{card.title}</h3>
              <p className="text-amber-100/70 text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="relative py-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Decorative top flourish */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/60"></div>
            <div className="mx-3 text-amber-400 text-xl">✦</div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/60"></div>
          </div>

          <form onSubmit={handleSubmit} className="bg-gradient-to-br from-[#2c1810] to-[#1a0f0a] p-8 md:p-12 rounded-3xl border-2 border-amber-400/30 shadow-2xl space-y-6 hover:border-amber-400/50 transition-all duration-500 relative">
            {/* Corner ornaments */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-amber-400/40 rounded-tl-lg" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-amber-400/40 rounded-tr-lg" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-amber-400/40 rounded-bl-lg" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-amber-400/40 rounded-br-lg" />

            <div className="text-center mb-8">
              <p className="text-amber-400 font-serif italic text-lg mb-1">Tell us about your visit</p>
              <h2 className="text-3xl font-black text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                The Details
              </h2>
            </div>

            {/* Name */}
            <div className="group">
              <label className="block text-amber-300 font-bold mb-2">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#1a0f0a] border-2 border-amber-400/30 rounded-lg px-4 py-3 text-amber-100 focus:border-amber-400 focus:outline-none transition-all focus:shadow-lg focus:shadow-amber-500/20 placeholder:text-amber-100/30"
                placeholder="Your full name"
              />
            </div>

            {/* Phone & Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-amber-300 font-bold mb-2">Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#1a0f0a] border-2 border-amber-400/30 rounded-lg px-4 py-3 text-amber-100 focus:border-amber-400 focus:outline-none transition-all focus:shadow-lg focus:shadow-amber-500/20 placeholder:text-amber-100/30"
                  placeholder="09XX-XXX-XX-XX"
                />
              </div>
              <div className="group">
                <label className="block text-amber-300 font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#1a0f0a] border-2 border-amber-400/30 rounded-lg px-4 py-3 text-amber-100 focus:border-amber-400 focus:outline-none transition-all focus:shadow-lg focus:shadow-amber-500/20 placeholder:text-amber-100/30"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-amber-300 font-bold mb-2">Date *</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-[#1a0f0a] border-2 border-amber-400/30 rounded-lg px-4 py-3 text-amber-100 focus:border-amber-400 focus:outline-none transition-all focus:shadow-lg focus:shadow-amber-500/20"
                />
              </div>
              <div className="group">
                <label className="block text-amber-300 font-bold mb-2">Time *</label>
                <select
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full bg-[#1a0f0a] border-2 border-amber-400/30 rounded-lg px-4 py-3 text-amber-100 focus:border-amber-400 focus:outline-none transition-all focus:shadow-lg focus:shadow-amber-500/20"
                >
                  <option value="">Select time</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="5:00 PM">5:00 PM</option>
                  <option value="6:00 PM">6:00 PM</option>
                  <option value="7:00 PM">7:00 PM</option>
                  <option value="8:00 PM">8:00 PM</option>
                </select>
              </div>
            </div>

            {/* Guests & Occasion */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-amber-300 font-bold mb-2">Number of Guests *</label>
                <select
                  required
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full bg-[#1a0f0a] border-2 border-amber-400/30 rounded-lg px-4 py-3 text-amber-100 focus:border-amber-400 focus:outline-none transition-all focus:shadow-lg focus:shadow-amber-500/20"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                    <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                  ))}
                </select>
              </div>
              <div className="group">
                <label className="block text-amber-300 font-bold mb-2">Occasion</label>
                <select
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  className="w-full bg-[#1a0f0a] border-2 border-amber-400/30 rounded-lg px-4 py-3 text-amber-100 focus:border-amber-400 focus:outline-none transition-all focus:shadow-lg focus:shadow-amber-500/20"
                >
                  <option value="">Select occasion (optional)</option>
                  <option value="birthday">Birthday 🎂</option>
                  <option value="anniversary">Anniversary 💍</option>
                  <option value="date">Date Night </option>
                  <option value="family">Family Dinner 👨‍👩👧‍👦</option>
                  <option value="business">Business Meeting </option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="group">
              <label className="block text-amber-300 font-bold mb-2">Special Requests</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
                className="w-full bg-[#1a0f0a] border-2 border-amber-400/30 rounded-lg px-4 py-3 text-amber-100 focus:border-amber-400 focus:outline-none transition-all focus:shadow-lg focus:shadow-amber-500/20 resize-none placeholder:text-amber-100/30"
                placeholder="Dietary restrictions, seating preferences, or anything we should know?"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-[#2c1810] px-8 py-4 font-bold rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg hover:shadow-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed text-lg hover:-translate-y-1 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? "Reserving your table..." : "Reserve My Table"} {!loading && "🔥"}
              </span>
            </button>

            <p className="text-center text-amber-100/50 text-sm italic">
              We'll call you to confirm within the hour
            </p>
          </form>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-400/60"></div>
              <div className="mx-3 text-amber-400 text-xl">✦</div>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-400/60"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              What Happens <span className="text-amber-400">Next</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", icon: "📝", title: "You Submit", desc: "Fill out the form with your details" },
              { step: "02", icon: "", title: "We Call You", desc: "Confirm your reservation within the hour" },
              { step: "03", icon: "🍕", title: "You Eat", desc: "Show up, sit down, enjoy the fire" },
            ].map((item, i) => (
              <div
                key={i}
                className="relative bg-gradient-to-br from-[#2c1810] to-[#1a0f0a] p-6 rounded-2xl border-2 border-amber-400/30 text-center hover:border-amber-400/70 transition-all duration-500"
              >
                <div className="text-amber-400/20 text-5xl font-black absolute top-2 right-4">{item.step}</div>
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-amber-300 font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-amber-100/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes rise {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 1; }
          50% { transform: translateY(-50vh) translateX(20px) scale(0.8); opacity: 0.8; }
          100% { transform: translateY(-100vh) translateX(-10px) scale(0); opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes flicker {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          25% { transform: scale(1.05) rotate(-2deg); opacity: 0.9; }
          50% { transform: scale(0.95) rotate(2deg); opacity: 1; }
          75% { transform: scale(1.02) rotate(-1deg); opacity: 0.95; }
        }
      `}</style>
    </div>
  );
}
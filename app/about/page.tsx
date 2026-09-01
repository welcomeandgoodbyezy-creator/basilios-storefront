import Link from "next/link";

const namedPizzas = [
  { name: "Sam Basilio Premium", desc: "The signature. The one that started it all.", color: "from-amber-500 to-amber-600", icon: "👑" },
  { name: "Delfin's Truffle Pizza", desc: "White base, truffle oil, earthy and rich.", color: "from-amber-600 to-amber-700", icon: "🍄" },
  { name: "Mark's Chicken & Spinach", desc: "Pesto base, grilled chicken, fresh spinach.", color: "from-green-600 to-green-700", icon: "🌿" },
  { name: "Liam's Quatro Fromaggi", desc: "Four cheese blend for the cheese lovers.", color: "from-yellow-500 to-yellow-600", icon: "🧀" },
  { name: "Issey's Lasagna", desc: "Classic baked lasagna with fresh basil.", color: "from-red-600 to-red-700", icon: "🍝" },
  { name: "Hawaiian", desc: "Classic ham and pineapple. BOGO at 3PM.", color: "from-orange-500 to-orange-600", icon: "" },
];

const whyBrickOven = [
  { icon: "", title: "900°F Heat", desc: "Our brick oven reaches temperatures that home ovens can't touch, creating the perfect char and blister on every crust." },
  { icon: "⏱️", title: "90 Second Bake", desc: "High heat means fast cooking. Your pizza comes out fresh, hot, and perfectly balanced every single time." },
  { icon: "🍕", title: "Authentic Crust", desc: "The brick retains heat evenly, giving you that perfect crispy exterior with a soft, airy interior." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#1a0f0a] text-amber-100 overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#1a0f0a] via-[#2c1810] to-[#3d2817] animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.08)_0%,transparent_70%)] animate-pulse" style={{ animationDuration: '6s' }} />

      {/* Rising embers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-[10%] w-2 h-2 bg-amber-400 rounded-full animate-[rise_8s_ease-in_infinite] blur-[1px]" />
        <div className="absolute bottom-0 left-[30%] w-1.5 h-1.5 bg-orange-400 rounded-full animate-[rise_10s_ease-in_infinite_2s] blur-[1px]" />
        <div className="absolute bottom-0 left-[50%] w-2 h-2 bg-amber-300 rounded-full animate-[rise_9s_ease-in_infinite_1s] blur-[1px]" />
        <div className="absolute bottom-0 left-[70%] w-1.5 h-1.5 bg-yellow-400 rounded-full animate-[rise_11s_ease-in_infinite_3s] blur-[1px]" />
        <div className="absolute bottom-0 left-[90%] w-2 h-2 bg-amber-400 rounded-full animate-[rise_8.5s_ease-in_infinite_1.5s] blur-[1px]" />
      </div>

      {/* Hero */}
      <header className="relative py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-400/60"></div>
            <div className="mx-4 text-amber-400 text-2xl animate-pulse"></div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-400/60"></div>
          </div>
          <p className="text-amber-400 font-serif italic text-2xl mb-2">Our Story</p>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
            The Basilio <span className="text-amber-400">Way</span>
          </h1>
          <p className="text-amber-100/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Every pizza on our menu carries a name. These aren't just labels — they're family, friends, the people who shaped what we do.
          </p>
        </div>
      </header>

      {/* Built on Brick & Fire */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-[fadeInUp_0.8s_ease-out]">
            <div className="inline-block mb-4">
              <div className="text-5xl animate-[flicker_3s_ease-in-out_infinite]">🔥</div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Built on <span className="text-amber-400">Brick & Fire</span>
            </h2>
            <p className="text-amber-100/90 text-lg leading-relaxed mb-4">
              Basilio's Brick Oven Pizza was built on a simple idea: real pizza, baked fresh every day, named after the people who matter most.
            </p>
            <p className="text-amber-100/90 text-lg leading-relaxed mb-6">
              Our brick oven runs hot and fast — reaching temperatures that home ovens can't touch. That's how it should be. High heat, short bake, blistered crust, melted cheese. No shortcuts.
            </p>
            <div className="border-l-4 border-amber-400 pl-6 py-2 bg-amber-950/30 rounded-r-lg">
              <p className="text-amber-200 text-base leading-relaxed">
                <span className="font-bold text-amber-400">Located in Brgy. Calicanto, San Juan, Batangas.</span> Open daily from 11AM to 9PM. Come visit, or order through Pabili Go for delivery.
              </p>
            </div>
          </div>

          <div className="relative group animate-[fadeInUp_1s_ease-out]">
            <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/30 to-amber-600/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative bg-gradient-to-br from-[#2c1810] to-[#1a0f0a] p-8 rounded-2xl border-4 border-amber-400/40 shadow-2xl group-hover:border-amber-400/70 transition-all duration-500">
              <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-amber-800/30 to-[#1a0f0a]/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4 animate-[flicker_3s_ease-in-out_infinite]">🍕</div>
                  <p className="text-amber-300 font-serif italic text-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
                    "Every pizza carries a name."
                  </p>
                  <p className="text-amber-400/60 text-sm mt-2 tracking-widest uppercase">— The Basilio Family</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Every Pizza Has a Name */}
      <section className="relative py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2c1810]/30 to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-400/60"></div>
              <div className="mx-4 text-amber-400 text-2xl animate-pulse">✦</div>
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-400/60"></div>
            </div>
            <p className="text-amber-300 font-serif italic text-2xl mb-2">The Menu</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Every Pizza Has a <span className="text-amber-400">Name</span>
            </h2>
            <p className="text-amber-100/70 text-lg max-w-2xl mx-auto">
              Sam, Delfin, Mark, Liam, Issey — these aren't random. They're the people who inspired each creation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {namedPizzas.map((pizza, index) => (
              <div 
                key={pizza.name}
                className="group relative animate-[fadeInUp_0.6s_ease-out]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute -inset-3 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative bg-gradient-to-br from-[#2c1810] to-[#1a0f0a] rounded-2xl p-8 border-2 border-amber-400/30 hover:border-amber-400/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/30">
                  {/* Top accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${pizza.color} rounded-t-2xl`} />
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-amber-950/60 rounded-full border-2 border-amber-400/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">{pizza.icon}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-amber-100 mb-3 group-hover:text-amber-300 transition-colors">{pizza.name}</h3>
                  <p className="text-amber-200/70 text-base leading-relaxed">{pizza.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Brick Oven */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-12 rounded-3xl border-4 border-[#3d2817] shadow-2xl">
            {/* Corner ornaments */}
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-[#3d2817] rounded-tl-lg" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#3d2817] rounded-tr-lg" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-[#3d2817] rounded-bl-lg" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#3d2817] rounded-br-lg" />

            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <div className="text-5xl animate-[flicker_2s_ease-in-out_infinite]">🔥</div>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                Why <span className="text-amber-400">Brick Oven?</span>
              </h2>
              <p className="text-amber-100/70 text-lg">The difference is in the fire.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {whyBrickOven.map((item, index) => (
                <div 
                  key={item.title}
                  className="text-center group animate-[fadeInUp_0.6s_ease-out]"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-950/60 border-2 border-amber-400/50 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amber-500/30 transition-all duration-300">
                    <span className="text-4xl">{item.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-amber-300 mb-3">{item.title}</h3>
                  <p className="text-amber-100/70 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-block mb-6">
            <div className="text-6xl animate-[flicker_2s_ease-in-out_infinite]">🔥</div>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-[#2c1810] mb-6 drop-shadow-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
            Taste the <span className="text-[#1a0f0a]">Difference</span>
          </h2>

          <p className="text-[#2c1810]/90 mb-10 text-xl">
            Visit us in San Juan, Batangas or order via Pabili Go
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="tel:09984882758"
              className="relative bg-[#2c1810] text-amber-400 px-10 py-4 font-bold rounded-lg hover:bg-[#1a0f0a] transition-all duration-300 text-lg shadow-2xl hover:shadow-amber-500/50 hover:-translate-y-1 border-2 border-amber-400/50 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">Call: 0998-488-27-58</span>
            </a>
            <Link
              href="/menu"
              className="relative border-2 border-[#2c1810] text-[#2c1810] px-10 py-4 font-bold rounded-lg hover:bg-[#2c1810] hover:text-amber-400 transition-all duration-300 text-lg hover:-translate-y-1 hover:shadow-xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[#2c1810]/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">View Full Menu</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Animations */}
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
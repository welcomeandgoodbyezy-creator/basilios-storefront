import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#2c1810] text-amber-100 overflow-x-hidden">
      {/* Hero - ALIVE with fire and movement */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated warm gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f0a] via-[#2c1810] to-[#3d2817] animate-pulse" style={{ animationDuration: '8s' }} />
        
        {/* Pulsing radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.2)_0%,transparent_70%)] animate-pulse" style={{ animationDuration: '4s' }} />
        
        {/* Second glow layer offset */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,146,60,0.15)_0%,transparent_50%)] animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

        {/* Rising embers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-0 left-[10%] w-3 h-3 bg-amber-400 rounded-full animate-[rise_8s_ease-in_infinite] blur-[2px]" />
          <div className="absolute bottom-0 left-[25%] w-2 h-2 bg-orange-400 rounded-full animate-[rise_10s_ease-in_infinite_2s] blur-[1px]" />
          <div className="absolute bottom-0 left-[40%] w-2.5 h-2.5 bg-amber-300 rounded-full animate-[rise_9s_ease-in_infinite_1s] blur-[2px]" />
          <div className="absolute bottom-0 left-[55%] w-2 h-2 bg-yellow-400 rounded-full animate-[rise_11s_ease-in_infinite_3s] blur-[1px]" />
          <div className="absolute bottom-0 left-[70%] w-3 h-3 bg-amber-400 rounded-full animate-[rise_8.5s_ease-in_infinite_1.5s] blur-[2px]" />
          <div className="absolute bottom-0 left-[85%] w-2 h-2 bg-orange-300 rounded-full animate-[rise_10.5s_ease-in_infinite_2.5s] blur-[1px]" />
          <div className="absolute bottom-0 left-[95%] w-2.5 h-2.5 bg-amber-400 rounded-full animate-[rise_9.5s_ease-in_infinite_0.5s] blur-[2px]" />
        </div>

        {/* Floating bokeh lights */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-amber-300/20 rounded-full animate-[float_15s_ease-in-out_infinite] blur-xl" />
          <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-amber-400/15 rounded-full animate-[float_18s_ease-in-out_infinite_2s] blur-xl" />
          <div className="absolute bottom-1/3 left-1/3 w-10 h-10 bg-orange-400/10 rounded-full animate-[float_20s_ease-in-out_infinite_4s] blur-2xl" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Animated flame above logo */}
          <div className="inline-block mb-4 animate-[flicker_3s_ease-in-out_infinite]">
            <span className="text-5xl"></span>
          </div>

          <div className="flex items-center justify-center mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-400/60"></div>
            <div className="mx-4 text-amber-400 text-3xl animate-pulse"></div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-400/60"></div>
          </div>

          <div className="inline-block mb-6 relative">
            <div className="absolute inset-0 bg-amber-500/30 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '2s' }} />
            <div className="relative w-28 h-28 mx-auto rounded-full border-4 border-amber-400/80 flex items-center justify-center bg-amber-950/70 backdrop-blur-lg shadow-2xl shadow-amber-500/50">
              <span className="text-amber-300 font-serif font-bold text-5xl" style={{ fontFamily: 'Playfair Display, serif' }}>B</span>
            </div>
          </div>
          
          <p className="text-amber-200 font-serif italic text-2xl md:text-3xl mb-4 tracking-wide drop-shadow-lg animate-[fadeInUp_1s_ease-out]">
            Est. 2019 • San Juan, Batangas
          </p>
          
          <h1 className="text-8xl md:text-[10rem] font-black text-white mb-4 tracking-tight drop-shadow-2xl animate-[fadeInUp_1.2s_ease-out]" style={{ fontFamily: 'Playfair Display, serif' }}>
            BASILIO'S
          </h1>
          
          <p className="text-amber-300 text-xl md:text-2xl tracking-[0.5em] uppercase mb-10 font-light drop-shadow-lg animate-[fadeInUp_1.4s_ease-out]">
            Brick Oven Pizza
          </p>

          <div className="flex items-center justify-center mb-10 animate-[fadeInUp_1.6s_ease-out]">
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-amber-400/70 to-transparent"></div>
          </div>
          
          <p className="text-amber-100 text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md animate-[fadeInUp_1.8s_ease-out]">
            Where every pizza carries a name. Wood-fired, family-named, freshly baked daily in the heart of Brgy. Calicanto.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-[fadeInUp_2s_ease-out]">
            <Link 
              href="/menu" 
              className="relative bg-gradient-to-r from-amber-500 to-amber-600 text-[#2c1810] px-12 py-5 font-bold rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300 text-xl shadow-2xl hover:shadow-amber-500/60 hover:-translate-y-1 border-2 border-amber-400/50 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">View Menu</span>
            </Link>
            <a 
              href="tel:09984882758" 
              className="relative border-2 border-amber-400 text-amber-300 px-12 py-5 font-bold rounded-lg hover:bg-amber-400 hover:text-[#2c1810] transition-all duration-300 text-xl hover:-translate-y-1 backdrop-blur-sm bg-amber-950/40 shadow-xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-amber-400/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">Order Now</span>
            </a>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#2c1810] via-amber-950/80 to-transparent z-10" />
      </section>

      {/* Location Strip - Animated wood texture */}
      <section className="relative py-24 px-6 overflow-hidden bg-[#1a0f0a]">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #3d2817 0px, #3d2817 2px, transparent 2px, transparent 80px)'
        }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a]/80 to-[#2c1810]/80" />
        {/* Pulsing warm glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.08)_0%,transparent_70%)] animate-pulse" style={{ animationDuration: '5s' }} />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="relative">
            <div className="absolute -top-16 left-1/4 w-1 h-16 bg-gradient-to-b from-amber-700 to-amber-500 rounded-full animate-pulse" />
            <div className="absolute -top-16 right-1/4 w-1 h-16 bg-gradient-to-b from-amber-700 to-amber-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute -top-20 left-1/4 -translate-x-1/2 w-4 h-4 border-2 border-amber-500 rounded-full animate-pulse" />
            <div className="absolute -top-20 right-1/4 -translate-x-1/2 w-4 h-4 border-2 border-amber-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="bg-gradient-to-b from-[#3d2817] to-[#2c1810] rounded-lg p-10 border-4 border-amber-700/60 shadow-2xl relative hover:shadow-amber-500/20 transition-shadow duration-500">
              <div className="absolute inset-3 border-2 border-amber-400/30 rounded pointer-events-none" />
              <div className="absolute inset-5 border border-amber-400/20 rounded pointer-events-none" />

              <div className="absolute top-6 left-6 text-amber-400/60 text-2xl animate-pulse">❧</div>
              <div className="absolute top-6 right-6 text-amber-400/60 text-2xl rotate-180 animate-pulse" style={{ animationDelay: '0.5s' }}>❧</div>
              <div className="absolute bottom-6 left-6 text-amber-400/60 text-2xl rotate-180 animate-pulse" style={{ animationDelay: '1s' }}>❧</div>
              <div className="absolute bottom-6 right-6 text-amber-400/60 text-2xl animate-pulse" style={{ animationDelay: '1.5s' }}>❧</div>

              <div className="text-center mb-8 relative z-10">
                <div className="flex items-center justify-center mb-3">
                  <div className="h-px w-16 bg-amber-400/50"></div>
                  <span className="mx-4 text-amber-400 text-xl animate-pulse">✦</span>
                  <div className="h-px w-16 bg-amber-400/50"></div>
                </div>
                <p className="text-amber-400 font-serif italic text-xl mb-1">Visit Us</p>
                <h2 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Find Our Door
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8 relative z-10">
                <div className="text-center border-r border-amber-400/30 last:border-r-0 pr-6 last:pr-0 group hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-950/60 border-2 border-amber-400/50 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amber-500/30 transition-all duration-300">
                    <span className="text-3xl">📍</span>
                  </div>
                  <h3 className="text-amber-300 font-serif text-xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Location</h3>
                  <p className="text-amber-100/80 text-sm leading-relaxed">Brgy. Calicanto<br/>San Juan, Batangas</p>
                </div>
                <div className="text-center border-r border-amber-400/30 last:border-r-0 pr-6 last:pr-0 group hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-950/60 border-2 border-amber-400/50 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amber-500/30 transition-all duration-300">
                    <span className="text-3xl">🕐</span>
                  </div>
                  <h3 className="text-amber-300 font-serif text-xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Hours</h3>
                  <p className="text-amber-100/80 text-sm leading-relaxed">Open Daily<br/><span className="text-amber-400 font-bold">11AM - 9PM</span></p>
                </div>
                <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-950/60 border-2 border-amber-400/50 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amber-500/30 transition-all duration-300">
                    <span className="text-3xl">📞</span>
                  </div>
                  <h3 className="text-amber-300 font-serif text-xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Contact</h3>
                  <p className="text-amber-100/80 text-sm leading-relaxed">0998-488-27-58</p>
                </div>
              </div>

              <div className="flex items-center justify-center mt-8 relative z-10">
                <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-400/50"></div>
                <span className="mx-3 text-amber-400/60 text-sm tracking-widest uppercase">Est. 2019</span>
                <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-400/50"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step Inside - Animated warmth */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c1810] via-[#1a0f0a] to-[#2c1810] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #3d2817 0px, #3d2817 1px, transparent 1px, transparent 60px)'
        }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.12)_0%,transparent_60%)] animate-pulse" style={{ animationDuration: '6s' }} />

        <div className="absolute top-12 left-12 w-24 h-24 border-t-2 border-l-2 border-amber-400/30 rounded-tl-3xl pointer-events-none animate-pulse" />
        <div className="absolute top-12 right-12 w-24 h-24 border-t-2 border-r-2 border-amber-400/30 rounded-tr-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-12 left-12 w-24 h-24 border-b-2 border-l-2 border-amber-400/30 rounded-bl-3xl pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-12 right-12 w-24 h-24 border-b-2 border-r-2 border-amber-400/30 rounded-br-3xl pointer-events-none animate-pulse" style={{ animationDelay: '3s' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-400/60"></div>
              <div className="mx-4 text-amber-400 text-2xl animate-pulse"></div>
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-400/60"></div>
            </div>
            <p className="text-amber-300 font-serif italic text-3xl mb-3 drop-shadow-lg">The Experience</p>
            <h2 className="text-6xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
              Step Inside
            </h2>
            <p className="text-amber-100/90 text-xl max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Warm wood, glowing lights, and the smell of fresh dough. This is where family recipes come to life.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-[#2c1810] px-8 py-2 rounded-full font-bold text-sm shadow-xl border-2 border-amber-400/60 tracking-wider uppercase animate-pulse">
                  Since 2019
                </div>
              </div>

              <div className="relative bg-gradient-to-br from-amber-900/40 to-[#1a0f0a]/60 p-8 rounded-2xl shadow-2xl border-4 border-amber-400/40 backdrop-blur-sm group-hover:border-amber-400/60 group-hover:shadow-amber-500/30 transition-all duration-500">
                <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-amber-800/30 to-[#2c1810]/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                  <div className="text-center">
                    <div className="text-6xl mb-4 animate-[flicker_3s_ease-in-out_infinite]">🔥</div>
                    <p className="text-amber-300 font-serif italic text-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
                      "Our home, your home."
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-8 rounded-2xl border-4 border-[#3d2817] shadow-2xl hover:border-amber-400/40 hover:shadow-amber-500/20 transition-all duration-500">
                <div className="text-amber-400/40 text-7xl font-serif leading-none mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>"</div>
                
                <h3 className="text-3xl font-bold text-amber-300 mb-4 -mt-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Crafted with Fire & Love
                </h3>
                <div className="h-px w-16 bg-amber-400/50 mb-4"></div>
                
                <p className="text-amber-100/90 text-lg leading-relaxed mb-4">
                  Our brick oven reaches 900°F, baking each pizza in just 90 seconds. The result? A perfectly charred crust, melted cheese, and flavors that tell a story.
                </p>
                <p className="text-amber-100/90 text-lg leading-relaxed">
                  Every pizza on our menu is named after someone who matters — family, friends, the people who shaped what we do.
                </p>
                
                <div className="flex items-center justify-center my-6">
                  <div className="h-px w-8 bg-amber-400/40"></div>
                  <span className="mx-3 text-amber-400 text-xl animate-pulse">🔥</span>
                  <div className="h-px w-8 bg-amber-400/40"></div>
                </div>
                
                <p className="text-amber-200/70 text-sm italic text-center">
                  — The Basilio Family
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-amber-950/60 backdrop-blur-sm p-4 rounded-xl border border-amber-400/30 text-center hover:border-amber-400/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300">
                  <div className="text-amber-400 font-black text-2xl">5+</div>
                  <div className="text-amber-200/80 text-xs uppercase tracking-wider mt-1">Years</div>
                </div>
                <div className="bg-amber-950/60 backdrop-blur-sm p-4 rounded-xl border border-amber-400/30 text-center hover:border-amber-400/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300">
                  <div className="text-amber-400 font-black text-2xl">6</div>
                  <div className="text-amber-200/80 text-xs uppercase tracking-wider mt-1">Signatures</div>
                </div>
                <div className="bg-amber-950/60 backdrop-blur-sm p-4 rounded-xl border border-amber-400/30 text-center hover:border-amber-400/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300">
                  <div className="text-amber-400 font-black text-2xl">90s</div>
                  <div className="text-amber-200/80 text-xs uppercase tracking-wider mt-1">Per Pizza</div>
                </div>
              </div>

              <Link 
                href="/about" 
                className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-[#2c1810] px-10 py-4 font-bold rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all shadow-xl hover:shadow-amber-500/50 text-lg hover:-translate-y-1"
              >
                Our Story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Pizzas - Alive with heat */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#1a0f0a]" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 48px, #3d2817 48px, #3d2817 50px),
            repeating-linear-gradient(90deg, transparent, transparent 98px, #3d2817 98px, #3d2817 100px)
          `,
          backgroundSize: '100px 50px'
        }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a] via-transparent to-[#1a0f0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.12)_0%,transparent_60%)] animate-pulse" style={{ animationDuration: '7s' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block relative mb-6">
              <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-[#2c1810] px-8 py-2 rounded-sm font-bold text-sm tracking-widest uppercase shadow-lg relative animate-pulse">
                <span className="relative z-10">Fresh from the Oven</span>
                <div className="absolute -left-3 top-0 bottom-0 w-3 bg-amber-700" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 50%)' }} />
                <div className="absolute -right-3 top-0 bottom-0 w-3 bg-amber-700" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 50%)' }} />
              </div>
            </div>

            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-400/60"></div>
              <div className="mx-4 text-amber-400 text-2xl animate-pulse">✦</div>
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-400/60"></div>
            </div>
            <p className="text-amber-300 font-serif italic text-3xl mb-3">From the Oven</p>
            <h2 className="text-6xl md:text-7xl font-black text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Signature Pizzas
            </h2>
            <p className="text-amber-100/70 text-lg max-w-2xl mx-auto">
              Each one named after family. Each one baked with pride.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { name: "Sam Basilio Premium", price: "₱488", desc: "The signature. The one that started it all.", tag: "Signature", icon: "👑" },
              { name: "Delfin's Truffle Pizza", price: "₱588", desc: "White base, truffle oil, earthy and rich.", tag: "Chef's Pick", icon: "🍄" },
              { name: "Mark's Chicken & Spinach", price: "488", desc: "Pesto base, grilled chicken, fresh spinach.", tag: null, icon: "🌿" },
            ].map((pizza) => (
              <div key={pizza.name} className="group relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative bg-gradient-to-br from-[#2c1810] to-[#1a0f0a] rounded-2xl overflow-hidden border-2 border-amber-400/30 hover:border-amber-400/70 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-amber-500/30">
                  <div className="relative h-72 overflow-hidden bg-gradient-to-br from-amber-900/30 to-[#1a0f0a] group-hover:scale-105 transition-transform duration-700">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-8xl opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500">{pizza.icon}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a] via-transparent to-transparent" />
                    {pizza.tag && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-[#2c1810] px-5 py-2 rounded-full font-bold text-sm shadow-xl border-2 border-amber-400/50 animate-pulse">
                        {pizza.tag}
                      </div>
                    )}
                    <div className="absolute top-4 left-4 w-12 h-12 bg-amber-950/80 backdrop-blur-sm rounded-full border-2 border-amber-400/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">{pizza.icon}</span>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-amber-950/90 backdrop-blur-sm px-4 py-2 rounded-lg border-2 border-amber-400/50">
                      <span className="text-2xl font-black text-amber-400">{pizza.price}</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-amber-100 mb-3">{pizza.name}</h3>
                    <p className="text-amber-200/80 text-base mb-6 leading-relaxed">{pizza.desc}</p>
                    <Link href="/menu" className="inline-flex items-center text-amber-400 hover:text-amber-300 font-bold text-base transition-colors group/link">
                      View Details <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/menu" className="inline-block border-2 border-amber-400 text-amber-300 px-12 py-5 font-bold rounded-lg hover:bg-amber-400 hover:text-[#2c1810] transition-all text-xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/40">
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Taste the Difference - GLOWING OVEN */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a05] via-[#2c1810] to-[#1a0a05] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.3)_0%,rgba(217,119,6,0.15)_40%,transparent_70%)] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,200,100,0.2)_0%,transparent_50%)] animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }} />

        {/* Rising embers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-10 left-1/4 w-2 h-2 bg-amber-300 rounded-full animate-[ember_6s_ease-in_infinite] blur-[1px]" />
          <div className="absolute bottom-10 left-1/3 w-1.5 h-1.5 bg-orange-400 rounded-full animate-[ember_8s_ease-in_infinite_1s] blur-[1px]" />
          <div className="absolute bottom-10 left-1/2 w-2.5 h-2.5 bg-amber-400 rounded-full animate-[ember_7s_ease-in_infinite_2s] blur-[1px]" />
          <div className="absolute bottom-10 right-1/3 w-1.5 h-1.5 bg-orange-300 rounded-full animate-[ember_9s_ease-in_infinite_0.5s] blur-[1px]" />
          <div className="absolute bottom-10 right-1/4 w-2 h-2 bg-amber-300 rounded-full animate-[ember_6.5s_ease-in_infinite_1.5s] blur-[1px]" />
          <div className="absolute bottom-10 left-2/3 w-1 h-1 bg-yellow-300 rounded-full animate-[ember_7.5s_ease-in_infinite_3s] blur-[1px]" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-block mb-6">
            <div className="text-6xl animate-[flicker_2s_ease-in-out_infinite]">🔥</div>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-[0_0_30px_rgba(251,146,60,0.5)]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Taste the <span className="text-amber-400">Difference</span>
          </h2>
          
          <p className="text-amber-100/90 mb-4 text-xl max-w-2xl mx-auto font-medium">
            Visit us in San Juan, Batangas or order via Pabili Go
          </p>
          
          <p className="text-amber-200/60 text-sm mb-12 tracking-widest uppercase">
            Fresh • Hot • Straight from the Oven
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="tel:09984882758" className="relative bg-gradient-to-r from-amber-600 to-amber-500 text-[#2c1810] px-12 py-5 font-bold rounded-lg text-xl shadow-[0_0_30px_rgba(251,146,60,0.6)] hover:shadow-[0_0_50px_rgba(251,146,60,0.8)] hover:-translate-y-1 transition-all duration-300 border-2 border-amber-400/70 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">Call: 0998-488-27-58</span>
            </a>
            <Link href="/contact" className="relative bg-transparent text-amber-300 px-12 py-5 font-bold rounded-lg text-xl border-2 border-amber-400/70 hover:bg-amber-400/10 hover:-translate-y-1 transition-all duration-300 shadow-[0_0_20px_rgba(251,146,60,0.3)] hover:shadow-[0_0_40px_rgba(251,146,60,0.5)]">
              Find Us
            </Link>
          </div>

          <div className="mt-16 flex items-center justify-center">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-400/50"></div>
            <div className="mx-4 flex gap-2">
              <span className="text-amber-400/60 text-sm animate-pulse">🔥</span>
              <span className="text-amber-400/60 text-sm animate-pulse" style={{ animationDelay: '0.3s' }}>🔥</span>
              <span className="text-amber-400/60 text-sm animate-pulse" style={{ animationDelay: '0.6s' }}>🔥</span>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-400/50"></div>
          </div>
        </div>
      </section>

      {/* All animations combined */}
      <style>{`
        @keyframes rise {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 1; }
          50% { transform: translateY(-50vh) translateX(20px) scale(0.8); opacity: 0.8; }
          100% { transform: translateY(-100vh) translateX(-10px) scale(0); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
        @keyframes ember {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 1; }
          50% { transform: translateY(-50vh) translateX(30px) scale(0.5); opacity: 0.8; }
          100% { transform: translateY(-100vh) translateX(-20px) scale(0); opacity: 0; }
        }
        @keyframes flicker {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          25% { transform: scale(1.05) rotate(-2deg); opacity: 0.9; }
          50% { transform: scale(0.95) rotate(2deg); opacity: 1; }
          75% { transform: scale(1.02) rotate(-1deg); opacity: 0.95; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
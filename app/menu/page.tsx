
"use client";

import Link from "next/link";
import { useState } from "react";

const categories = [
  { id: "all", name: "All", icon: "🍕" },
  { id: "signature", name: "Signature", icon: "" },
  { id: "classic", name: "Classic", icon: "🍕" },
  { id: "specialty", name: "Specialty", icon: "" },
  { id: "veggie", name: "Veggie", icon: "🌿" },
];

const pizzas = [
  {
    id: 1,
    name: "Sam Basilio Premium",
    price: "₱488",
    description: "Our signature brick oven pizza. The one that started it all.",
    ingredients: "Premium mozzarella, fresh tomatoes, basil, extra virgin olive oil",
    category: "signature",
    tag: "Signature",
    icon: "👑",
    featured: true,
  },
  {
    id: 2,
    name: "Delfin's Truffle Pizza",
    price: "₱588",
    description: "White base with truffle oil, mozzarella, and black truffle pieces.",
    ingredients: "White base, truffle oil, mozzarella, black truffle, parmesan",
    category: "specialty",
    tag: "Chef's Pick",
    icon: "🍄",
    featured: true,
  },
  {
    id: 3,
    name: "Mark's Chicken & Spinach",
    price: "₱488",
    description: "Pesto base, grilled chicken strips, fresh spinach, mozzarella.",
    ingredients: "Pesto base, grilled chicken, fresh spinach, mozzarella, pine nuts",
    category: "specialty",
    tag: null,
    icon: "🌿",
    featured: false,
  },
  {
    id: 4,
    name: "Maria's Margherita",
    price: "₱388",
    description: "Classic Italian. San Marzano tomatoes, fresh mozzarella, basil.",
    ingredients: "San Marzano tomatoes, fresh mozzarella, basil, olive oil",
    category: "classic",
    tag: "Classic",
    icon: "",
    featured: false,
  },
  {
    id: 5,
    name: "Pepperoni Passion",
    price: "₱488",
    description: "Loaded with premium pepperoni, mozzarella, tomato sauce.",
    ingredients: "Premium pepperoni, mozzarella, tomato sauce, oregano",
    category: "classic",
    tag: "Popular",
    icon: "🍕",
    featured: false,
  },
  {
    id: 6,
    name: "Veggie Delight",
    price: "₱438",
    description: "Fresh vegetables, mozzarella, tomato sauce, herbs.",
    ingredients: "Bell peppers, mushrooms, onions, olives, tomatoes, mozzarella",
    category: "veggie",
    tag: null,
    icon: "🥬",
    featured: false,
  },
  {
    id: 7,
    name: "Liam's Quatro Fromaggi",
    price: "₱488",
    description: "Four cheese blend for the cheese lovers.",
    ingredients: "Mozzarella, gorgonzola, parmesan, ricotta, honey drizzle",
    category: "specialty",
    tag: null,
    icon: "🧀",
    featured: false,
  },
  {
    id: 8,
    name: "Hawaiian",
    price: "₱438",
    description: "Classic ham and pineapple. BOGO at 3PM.",
    ingredients: "Ham, pineapple, mozzarella, tomato sauce",
    category: "classic",
    tag: "BOGO 3PM",
    icon: "",
    featured: false,
  },
];

const sizes = [
  { name: "Small", size: "10\"", price: "Base Price", serves: "1-2 people" },
  { name: "Medium", size: "12\"", price: "+₱100", serves: "2-3 people" },
  { name: "Large", size: "14\"", price: "+200", serves: "3-4 people" },
  { name: "Family", size: "16\"", price: "+₱300", serves: "4-6 people" },
];

const process = [
  { step: "01", icon: "", title: "900°F Heat", desc: "Our brick oven reaches temperatures that home ovens can't touch" },
  { step: "02", icon: "⏱️", title: "90 Second Bake", desc: "High heat means fast cooking for perfect char and melt" },
  { step: "03", icon: "🍕", title: "Fresh Ingredients", desc: "Daily fresh dough, premium mozzarella, local vegetables" },
  { step: "04", icon: "❤️", title: "Made with Love", desc: "Every pizza named after family and friends who matter" },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPizzas = activeCategory === "all" 
    ? pizzas 
    : pizzas.filter(p => p.category === activeCategory);

  const featuredPizza = pizzas.find(p => p.featured);

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
      <header className="relative py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-400/60"></div>
            <div className="mx-4 text-amber-400 text-2xl animate-pulse">✦</div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-400/60"></div>
          </div>
          <p className="text-amber-400 font-serif italic text-2xl mb-2">Our Menu</p>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
            Freshly Baked <span className="text-amber-400">Daily</span>
          </h1>
          <p className="text-amber-100/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Every pizza carries a name. These aren't just labels — they're family, friends, the people who shaped what we do.
          </p>
        </div>
      </header>

      {/* Featured Pizza Spotlight */}
      {featuredPizza && (
        <section className="relative py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="relative bg-gradient-to-br from-[#2c1810] to-[#1a0f0a] rounded-3xl overflow-hidden border-4 border-amber-400/40 shadow-2xl">
              {/* Decorative corner flames */}
              <div className="absolute top-4 left-4 text-4xl animate-pulse">🔥</div>
              <div className="absolute top-4 right-4 text-4xl animate-pulse" style={{ animationDelay: '1s' }}>🔥</div>
              
              <div className="grid md:grid-cols-2 gap-8 p-12">
                <div className="flex items-center justify-center">
                  <div className="text-9xl animate-[flicker_3s_ease-in-out_infinite]">{featuredPizza.icon}</div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="inline-block mb-4">
                    <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-[#2c1810] px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                      {featuredPizza.tag}
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {featuredPizza.name}
                  </h2>
                  <p className="text-amber-100/90 text-lg mb-4 leading-relaxed">{featuredPizza.description}</p>
                  <p className="text-amber-200/70 text-sm italic mb-6">{featuredPizza.ingredients}</p>
                  <div className="flex items-center gap-6">
                    <span className="text-4xl font-black text-amber-400">{featuredPizza.price}</span>
                    <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-[#2c1810] px-8 py-3 font-bold rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg hover:shadow-amber-500/50">
                      Add to Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="relative py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-[#2c1810] shadow-lg shadow-amber-500/30 scale-105'
                    : 'bg-[#2c1810] text-amber-300 border-2 border-amber-400/30 hover:border-amber-400/70 hover:-translate-y-1'
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Pizza Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPizzas.map((pizza, index) => (
              <div 
                key={pizza.id}
                className="group relative animate-[fadeInUp_0.6s_ease-out]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative bg-gradient-to-br from-[#2c1810] to-[#1a0f0a] rounded-2xl overflow-hidden border-2 border-amber-400/30 hover:border-amber-400/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/30">
                  {/* Tag */}
                  {pizza.tag && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-[#2c1810] px-4 py-1.5 rounded-full font-bold text-xs shadow-lg border-2 border-amber-400/50 animate-pulse">
                      {pizza.tag}
                    </div>
                  )}

                  {/* Icon area */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-amber-900/30 to-[#1a0f0a]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-7xl opacity-40 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500">{pizza.icon}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a] via-transparent to-transparent" />
                    
                    {/* Price badge */}
                    <div className="absolute bottom-4 left-4 bg-amber-950/90 backdrop-blur-sm px-4 py-2 rounded-lg border-2 border-amber-400/50 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl font-black text-amber-400">{pizza.price}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-amber-100 mb-2 group-hover:text-amber-300 transition-colors">{pizza.name}</h3>
                    <p className="text-amber-200/70 text-sm mb-3 leading-relaxed">{pizza.description}</p>
                    <p className="text-amber-200/50 text-xs mb-6 italic">{pizza.ingredients}</p>
                    
                    <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-[#2c1810] px-6 py-3 font-bold rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-amber-500/50 hover:-translate-y-0.5">
                      Add to Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Size Options */}
      <section className="relative py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2c1810]/50 to-transparent" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-400/60"></div>
              <div className="mx-4 text-amber-400 text-2xl animate-pulse">📏</div>
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-400/60"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Choose Your <span className="text-amber-400">Size</span>
            </h2>
            <p className="text-amber-100/70 text-lg">All pizzas available in multiple sizes</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sizes.map((size, index) => (
              <div 
                key={size.name}
                className="group relative bg-gradient-to-br from-[#2c1810] to-[#1a0f0a] rounded-2xl p-8 border-2 border-amber-400/30 hover:border-amber-400/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/30 text-center animate-[fadeInUp_0.6s_ease-out]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🍕</div>
                <h3 className="text-2xl font-bold text-amber-300 mb-2">{size.name}</h3>
                <p className="text-amber-400 font-black text-3xl mb-2">{size.size}</p>
                <p className="text-amber-100/70 text-sm mb-4">{size.serves}</p>
                <p className="text-amber-200/90 font-bold">{size.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It's Made */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-400/60"></div>
              <div className="mx-4 text-amber-400 text-2xl animate-pulse">🔥</div>
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-400/60"></div>
            </div>
            <p className="text-amber-300 font-serif italic text-2xl mb-2">Our Process</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              How It's <span className="text-amber-400">Made</span>
            </h2>
            <p className="text-amber-100/70 text-lg max-w-2xl mx-auto">
              From dough to table in 90 seconds. Here's what makes Basilio's different.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div 
                key={item.step}
                className="group relative animate-[fadeInUp_0.6s_ease-out]"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="absolute -inset-3 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative bg-gradient-to-br from-[#2c1810] to-[#1a0f0a] rounded-2xl p-8 border-2 border-amber-400/30 hover:border-amber-400/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/30 text-center">
                  <div className="text-6xl mb-2 opacity-20 font-black text-amber-400">{item.step}</div>
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <h3 className="text-xl font-bold text-amber-300 mb-3">{item.title}</h3>
                  <p className="text-amber-100/70 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients Spotlight */}
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
                <div className="text-5xl animate-[flicker_2s_ease-in-out_infinite]">🌿</div>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                Fresh <span className="text-amber-400">Ingredients</span>
              </h2>
              <p className="text-amber-100/70 text-lg">Quality you can taste in every bite</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-amber-950/60 border-2 border-amber-400/50 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amber-500/30 transition-all duration-300">
                  <span className="text-4xl">🧀</span>
                </div>
                <h3 className="text-xl font-bold text-amber-300 mb-2">Premium Mozzarella</h3>
                <p className="text-amber-100/70 text-sm">Fresh daily, never pre-shredded</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-amber-950/60 border-2 border-amber-400/50 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amber-500/30 transition-all duration-300">
                  <span className="text-4xl"></span>
                </div>
                <h3 className="text-xl font-bold text-amber-300 mb-2">San Marzano Tomatoes</h3>
                <p className="text-amber-100/70 text-sm">Imported from Italy for authentic flavor</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-amber-950/60 border-2 border-amber-400/50 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amber-500/30 transition-all duration-300">
                  <span className="text-4xl"></span>
                </div>
                <h3 className="text-xl font-bold text-amber-300 mb-2">Local Vegetables</h3>
                <p className="text-amber-100/70 text-sm">Sourced from Batangas farms daily</p>
              </div>
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
            Ready to Order?
          </h2>

          <p className="text-[#2c1810]/90 mb-10 text-xl">
            Call us or order via Pabili Go for delivery
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
              href="/contact"
              className="relative border-2 border-[#2c1810] text-[#2c1810] px-10 py-4 font-bold rounded-lg hover:bg-[#2c1810] hover:text-amber-400 transition-all duration-300 text-lg hover:-translate-y-1 hover:shadow-xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[#2c1810]/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">View Location</span>
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
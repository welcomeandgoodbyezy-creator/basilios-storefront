import Link from "next/link";

const socialPosts = [
  {
    id: 1,
    user: "@mariafoodie",
    content: "Best pizza in Batangas! The Sam Basilio Premium is 🔥",
    type: "video",
    likes: 234,
    platform: "Instagram",
  },
  {
    id: 2,
    user: "@juanEats",
    content: "90 seconds in a 900°F oven = perfection",
    type: "photo",
    likes: 189,
    platform: "Facebook",
  },
  {
    id: 3,
    user: "@batangasfood",
    content: "Every pizza has a name and a story. Love this place!",
    type: "photo",
    likes: 312,
    platform: "Instagram",
  },
  {
    id: 4,
    user: "@pizzaloverPH",
    content: "The truffle pizza is worth every peso 🍄",
    type: "video",
    likes: 156,
    platform: "TikTok",
  },
];

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    text: "The brick oven makes ALL the difference. Crispy crust, perfectly melted cheese. This is authentic pizza!",
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Miguel R.",
    rating: 5,
    text: "Finally, a pizza place that understands high heat baking. 90 seconds and it's perfect. The Sam Basilio is my go-to!",
    date: "1 week ago",
  },
  {
    id: 3,
    name: "Anna L.",
    rating: 5,
    text: "Love that every pizza has a name and a story. You can taste the love in every bite. Family-owned and it shows!",
    date: "2 weeks ago",
  },
  {
    id: 4,
    name: "Carlos D.",
    rating: 5,
    text: "Best pizza in San Juan, hands down. The brick oven crust is incredible. Highly recommend the truffle pizza!",
    date: "3 weeks ago",
  },
  {
    id: 5,
    name: "Lisa T.",
    rating: 5,
    text: "Fast, fresh, and delicious. The 90-second bake time is no joke. Perfect lunch spot!",
    date: "1 month ago",
  },
];

const promos = [
  { icon: "🍍", text: "Hawaiian BOGO (3PM onwards)" },
  { icon: "🍝", text: "Issey's Lasagna - 10% OFF" },
  { icon: "🛵", text: "Free Delivery (First 10 orders)" },
];

export default function ContactPage() {
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
            <div className="mx-4 text-amber-400 text-2xl animate-pulse"></div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-400/60"></div>
          </div>
          <p className="text-amber-400 font-serif italic text-2xl mb-2">Find Us</p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
            Visit <span className="text-amber-400">Basilio's</span>
          </h1>
          <p className="text-amber-100/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Located in Brgy. Calicanto, San Juan, Batangas. Dine-in, takeout, or delivery via Pabili Go.
          </p>
        </div>
      </header>

      {/* Contact Info & Map */}
      <section className="relative py-16 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-6">
            {/* Address */}
            <div className="group bg-gradient-to-br from-[#2c1810] to-[#1a0f0a] p-8 rounded-2xl border-2 border-amber-400/30 hover:border-amber-400/70 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/20 animate-[fadeInUp_0.6s_ease-out]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-950/60 rounded-full border-2 border-amber-400/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl"></span>
                </div>
                <div>
                  <h3 className="text-amber-300 font-bold text-xl mb-2">Address</h3>
                  <p className="text-amber-100/90 mb-1">Brgy. Calicanto, San Juan, Batangas</p>
                  <p className="text-amber-100/60 text-sm">Available on Google Maps / Waze</p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="group bg-gradient-to-br from-[#2c1810] to-[#1a0f0a] p-8 rounded-2xl border-2 border-amber-400/30 hover:border-amber-400/70 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/20 animate-[fadeInUp_0.6s_ease-out_0.1s]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-950/60 rounded-full border-2 border-amber-400/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🕐</span>
                </div>
                <div>
                  <h3 className="text-amber-300 font-bold text-xl mb-2">Hours</h3>
                  <p className="text-amber-100/90 mb-1">Open Daily</p>
                  <p className="text-amber-400 font-bold text-lg">11:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="group bg-gradient-to-br from-[#2c1810] to-[#1a0f0a] p-8 rounded-2xl border-2 border-amber-400/30 hover:border-amber-400/70 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/20 animate-[fadeInUp_0.6s_ease-out_0.2s]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-950/60 rounded-full border-2 border-amber-400/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">📞</span>
                </div>
                <div>
                  <h3 className="text-amber-300 font-bold text-xl mb-2">Call Us</h3>
                  <p className="text-amber-100/90 mb-1">0998-488-27-58</p>
                  <p className="text-amber-100/90 mb-1">0915-857-73-53</p>
                  <p className="text-amber-100/90">0995-669-45-35</p>
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="group bg-gradient-to-br from-[#2c1810] to-[#1a0f0a] p-8 rounded-2xl border-2 border-amber-400/30 hover:border-amber-400/70 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/20 animate-[fadeInUp_0.6s_ease-out_0.3s]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-950/60 rounded-full border-2 border-amber-400/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🛵</span>
                </div>
                <div>
                  <h3 className="text-amber-300 font-bold text-xl mb-2">Delivery</h3>
                  <p className="text-amber-100/90 mb-1">Available via <span className="font-bold text-amber-400">Pabili Go</span></p>
                  <p className="text-amber-100/60 text-sm">Free delivery for first 10 orders (Poblacion area only)</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 animate-[fadeInUp_0.6s_ease-out_0.4s]">
              <a
                href="tel:09984882758"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-[#2c1810] px-8 py-4 font-bold rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300 text-lg shadow-lg hover:shadow-amber-500/50 hover:-translate-y-1 text-center"
              >
                Call to Order Now
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-br from-[#2c1810] to-[#1a0f0a] border-2 border-amber-400/50 text-amber-300 px-8 py-4 font-bold rounded-lg hover:border-amber-400/70 hover:bg-amber-400/10 transition-all duration-300 text-lg hover:-translate-y-1 text-center"
              >
                Message on Facebook
              </a>
            </div>
          </div>

          {/* Map & Promos */}
          <div className="space-y-6">
            {/* Map */}
            <div className="bg-gradient-to-br from-[#2c1810] to-[#1a0f0a] p-6 rounded-2xl border-2 border-amber-400/30 shadow-xl animate-[fadeInUp_0.6s_ease-out]">
              <h3 className="text-amber-300 font-bold text-2xl mb-4 text-center">Find Us on the Map</h3>
              <div className="aspect-video rounded-lg overflow-hidden border-2 border-amber-400/30">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.5!2d121.4!3d13.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQ4JzAwLjAiTiAxMjHCsDI0JzAwLjAiRQ!5e0!3m2!1sen!2sph!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Current Promos */}
            <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 p-8 rounded-2xl shadow-xl animate-[fadeInUp_0.6s_ease-out_0.2s]">
              <h3 className="text-[#2c1810] font-bold text-2xl mb-6 text-center">Current Promos</h3>
              <div className="space-y-4">
                {promos.map((promo, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-4 bg-[#2c1810]/20 backdrop-blur-sm p-4 rounded-lg border border-amber-400/30 hover:bg-[#2c1810]/30 transition-all duration-300"
                  >
                    <span className="text-3xl">{promo.icon}</span>
                    <p className="text-[#2c1810] font-medium">{promo.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Showcase */}
      <section className="relative py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2c1810]/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-400/60"></div>
              <div className="mx-4 text-amber-400 text-3xl animate-pulse">📱</div>
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-400/60"></div>
            </div>
            <p className="text-amber-300 font-serif italic text-2xl mb-2">Social Feed</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Tag Us <span className="text-amber-400">@BasiliosPizza</span>
            </h2>
            <p className="text-amber-100/70 text-lg max-w-2xl mx-auto">
              Share your Basilio's experience and be featured! We love seeing your posts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialPosts.map((post, index) => (
              <div 
                key={post.id}
                className="group relative animate-[fadeInUp_0.6s_ease-out]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute -inset-3 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative bg-gradient-to-br from-[#2c1810] to-[#1a0f0a] rounded-2xl overflow-hidden border-2 border-amber-400/30 hover:border-amber-400/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/30">
                  {/* Platform badge */}
                  <div className="absolute top-3 right-3 bg-amber-950/80 backdrop-blur-sm px-3 py-1 rounded-full border border-amber-400/50">
                    <span className="text-xs font-bold text-amber-400">{post.platform}</span>
                  </div>

                  {/* Content preview */}
                  <div className="aspect-square bg-gradient-to-br from-amber-900/30 to-[#1a0f0a] flex items-center justify-center relative overflow-hidden">
                    {post.type === 'video' ? (
                      <div className="text-center">
                        <div className="text-6xl mb-2 group-hover:scale-110 transition-transform duration-300">🎥</div>
                        <div className="w-16 h-16 bg-amber-500/80 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-2xl text-[#2c1810]">▶</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-7xl group-hover:scale-110 transition-transform duration-300"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a] via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-amber-300 font-bold text-sm mb-2">{post.user}</p>
                    <p className="text-amber-100/80 text-sm mb-4 leading-relaxed">{post.content}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-200/60 text-xs flex items-center gap-1">
                        <span>❤️</span> {post.likes}
                      </span>
                      <button className="text-amber-400 text-xs font-bold hover:text-amber-300 transition-colors">
                        View Post →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-400/60"></div>
              <div className="mx-4 text-amber-400 text-3xl animate-pulse">⭐</div>
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-400/60"></div>
            </div>
            <p className="text-amber-300 font-serif italic text-2xl mb-2">Reviews</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              What People <span className="text-amber-400">Say</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-2xl text-amber-400 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>★</span>
                ))}
              </div>
              <span className="text-amber-100/70 text-lg ml-2">4.9/5 from 127 reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div 
                key={review.id}
                className="group relative animate-[fadeInUp_0.6s_ease-out]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute -inset-3 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative bg-gradient-to-br from-[#2c1810] to-[#1a0f0a] rounded-2xl p-8 border-2 border-amber-400/30 hover:border-amber-400/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/30">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-amber-400 text-lg">★</span>
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-amber-100/90 text-base leading-relaxed mb-6 italic">"{review.text}"</p>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-amber-300 font-bold">{review.name}</p>
                      <p className="text-amber-200/60 text-xs">{review.date}</p>
                    </div>
                    <div className="w-10 h-10 bg-amber-950/60 rounded-full border-2 border-amber-400/50 flex items-center justify-center">
                      <span className="text-amber-400 text-lg">👤</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
      `}</style>
    </div>
  );
}
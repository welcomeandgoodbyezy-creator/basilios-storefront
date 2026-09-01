import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full border-2 border-amber-500 flex items-center justify-center">
                <span className="text-amber-500 font-serif font-bold text-xl">B</span>
              </div>
              <div>
                <span className="text-white font-serif font-bold text-xl block">
                  BASILIO'S
                </span>
                <span className="text-amber-500 text-xs tracking-widest block -mt-1">
                  BRICK OVEN PIZZA
                </span>
              </div>
            </div>
            <p className="text-neutral-400 leading-relaxed max-w-md">
              Freshly baked daily. Brick oven craft in the heart of San Juan, Batangas. 
              Every pizza carries a name — family, friends, the people who matter most.
            </p>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-amber-500 font-bold mb-4 text-lg">Hours</h4>
            <p className="text-neutral-400 mb-2">Open Daily</p>
            <p className="text-white font-semibold text-lg">11:00 AM - 9:00 PM</p>
            <p className="text-neutral-500 text-sm mt-4">Brgy. Calicanto, San Juan, Batangas</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-amber-500 font-bold mb-4 text-lg">Contact</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a href="tel:09984882758" className="hover:text-amber-500 transition-colors">
                  0998-488-27-58
                </a>
              </li>
              <li>
                <a href="tel:09158577353" className="hover:text-amber-500 transition-colors">
                  0915-857-73-53
                </a>
              </li>
              <li>
                <a href="tel:09956694535" className="hover:text-amber-500 transition-colors">
                  0995-669-45-35
                </a>
              </li>
            </ul>
            <p className="text-neutral-500 text-sm mt-4">
              Available on Pabili Go for delivery
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm">
            &copy; {new Date().getFullYear()} Basilio's Brick Oven Pizza. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/menu" className="text-neutral-400 hover:text-amber-500 text-sm transition-colors">
              Menu
            </Link>
            <Link href="/about" className="text-neutral-400 hover:text-amber-500 text-sm transition-colors">
              Our Story
            </Link>
            <Link href="/contact" className="text-neutral-400 hover:text-amber-500 text-sm transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-sm border-b border-yellow-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-yellow-600 flex items-center justify-center">
            <span className="text-yellow-600 font-bold text-lg">B</span>
          </div>
          <div>
            <span className="text-white font-bold text-lg block leading-tight">BASILIO'S</span>
            <span className="text-yellow-600 text-xs block -mt-1">BRICK OVEN PIZZA</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6">
          <li><Link href="/" className="text-gray-300 hover:text-yellow-600 transition-colors">Home</Link></li>
          <li><Link href="/menu" className="text-gray-300 hover:text-yellow-600 transition-colors">Menu</Link></li>
          <li><Link href="/reservations" className="text-gray-300 hover:text-yellow-600 transition-colors">Reservations</Link></li>
          <li><Link href="/about" className="text-gray-300 hover:text-yellow-600 transition-colors">Our Story</Link></li>
          <li><Link href="/contact" className="text-gray-300 hover:text-yellow-600 transition-colors">Contact</Link></li>
        </ul>

        <div className="hidden md:block">
          <a
            href="tel:09984882758"
            className="bg-yellow-600 text-black px-6 py-2 font-bold rounded hover:bg-yellow-500 transition-colors text-sm"
          >
            Order Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-yellow-600/20 px-4 py-4 space-y-3">
          <Link href="/" className="block text-gray-300 hover:text-yellow-600 py-2">Home</Link>
          <Link href="/menu" className="block text-gray-300 hover:text-yellow-600 py-2">Menu</Link>
          <Link href="/reservations" className="block text-gray-300 hover:text-yellow-600 py-2">Reservations</Link>
          <Link href="/about" className="block text-gray-300 hover:text-yellow-600 py-2">Our Story</Link>
          <Link href="/contact" className="block text-gray-300 hover:text-yellow-600 py-2">Contact</Link>
          <a
            href="tel:09984882758"
            className="block bg-yellow-600 text-black px-4 py-3 font-bold rounded text-center mt-4"
          >
            Order Now
          </a>
        </div>
      )}
    </nav>
  );
}
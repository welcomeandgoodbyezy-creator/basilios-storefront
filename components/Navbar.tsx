import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-sm border-b border-yellow-600/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-yellow-600 flex items-center justify-center">
            <span className="text-yellow-600 font-bold text-lg">B</span>
          </div>
          <div>
            <span className="text-white font-bold text-lg block leading-tight">BASILIO'S</span>
            <span className="text-yellow-600 text-xs block -mt-1">BRICK OVEN PIZZA</span>
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-6">
          <li><Link href="/" className="text-gray-300 hover:text-yellow-600 transition-colors">Home</Link></li>
          <li><Link href="/menu" className="text-gray-300 hover:text-yellow-600 transition-colors">Menu</Link></li>
          <li><Link href="/reservations" className="text-gray-300 hover:text-yellow-600 transition-colors">Reservations</Link></li>
          <li><Link href="/about" className="text-gray-300 hover:text-yellow-600 transition-colors">Our Story</Link></li>
          <li><Link href="/contact" className="text-gray-300 hover:text-yellow-600 transition-colors">Contact</Link></li>
        </ul>

        <a
          href="tel:09984882758"
          className="bg-yellow-600 text-black px-6 py-2 font-bold rounded hover:bg-yellow-500 transition-colors text-sm"
        >
          Order Now
        </a>
      </div>
    </nav>
  );
}
import Link from 'next/link'

function Frond({ className }: { className: string }) {
  const leaf = (rot: number, len: number, fill: string) => (
    <path
      d={`M0 0 Q ${len * 0.16} ${-len * 0.4} 0 ${-len} Q ${-len * 0.16} ${-len * 0.4} 0 0`}
      fill={fill}
      transform={`rotate(${rot})`}
    />
  )
  return (
    <svg viewBox="-100 -100 200 200" className={className} aria-hidden>
      <g transform="translate(0 92)">
        {leaf(-70, 118, '#46a04c')}
        {leaf(-46, 148, '#2e8b3d')}
        {leaf(-23, 168, '#46a04c')}
        {leaf(0, 178, '#2e8b3d')}
        {leaf(23, 168, '#46a04c')}
        {leaf(46, 148, '#2e8b3d')}
        {leaf(70, 118, '#46a04c')}
      </g>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="planks relative overflow-hidden mt-auto">
      <Frond className="absolute -top-10 -left-10 w-44 rotate-180 opacity-30" />
      <Frond className="absolute -top-10 -right-10 w-44 rotate-180 -scale-x-100 opacity-30" />

      <div className="max-w-[90rem] mx-auto px-6 md:px-12 py-16 grid gap-12 md:grid-cols-3">
        <div>
          <p className="font-script text-5xl text-sun">Ben&apos;s</p>
          <p className="font-display text-[10px] tracking-[0.3em] text-cream/80 uppercase mt-1">
            Halo-Halo Ice Cream
          </p>
          <p className="text-cream/70 text-sm mt-5 leading-relaxed max-w-xs">
            Batangas&apos; creamiest halo-halo, poured tall in San Juan. Rice meals,
            pasta and snacks for when the craving isn&apos;t sweet.
          </p>
        </div>

        <div>
          <h3 className="font-display text-cream uppercase text-lg mb-5">talk to us</h3>
          <ul className="space-y-3 text-cream/80 text-sm font-semibold">
            <li>Calle Niña, Poblacion, San Juan, Batangas</li>
            <li>
              <a href="tel:0435550101" className="hover:text-sun transition-colors">
                043-555-0101
              </a>
            </li>
            <li>
              <a href="mailto:hello@benshalohalo.ph" className="hover:text-sun transition-colors">
                hello@benshalohalo.ph
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/search/top?q=ben%27s%20halo-halo%20san%20juan%20batangas"
                className="hover:text-sun transition-colors"
              >
                facebook — ben&apos;s halo-halo san juan batangas
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-cream uppercase text-lg mb-5">hours & shortcuts</h3>
          <p className="font-hand text-sun text-2xl mb-5 -rotate-1">open daily, 10:00 – 22:00</p>
          <ul className="space-y-2 text-sm font-extrabold">
            <li><Link href="/menu" className="text-cream/80 hover:text-sun transition-colors">Menu</Link></li>
            <li><Link href="/stores" className="text-cream/80 hover:text-sun transition-colors">Stores</Link></li>
            <li><Link href="/reservations" className="text-cream/80 hover:text-sun transition-colors">Reservations</Link></li>
            <li><Link href="/hall-of-fame" className="text-cream/80 hover:text-sun transition-colors">Hall of Fame</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/20">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 py-5 flex flex-wrap gap-3 items-center justify-between">
          <p className="text-cream/50 text-xs font-semibold">
            © {new Date().getFullYear()} ben&apos;s halo-halo ice cream — san juan, batangas
          </p>
          <p className="font-hand text-cream/70 text-lg">seriously, try the spicy winter one</p>
        </div>
      </div>
    </footer>
  )
}
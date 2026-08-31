import type { Metadata } from 'next'
import { Lilita_One, Pacifico, Caveat, Nunito } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BottomNav from '@/components/BottomNav'
import InstallButton from '@/components/InstallButton'
import { CartProvider } from '@/components/CartContext'
import './globals.css'

const lilita = Lilita_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
})

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script',
})

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-hand',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: "Ben's Halo-Halo Ice Cream | Batangas' Creamiest",
  description:
    "Halo-halo, coolers, rice meals and more. Batangas' creamiest halo-halo, served cold and made fresh in San Juan.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#ffd23f" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if ('serviceWorker' in navigator) { window.addEventListener('load', function () { navigator.serviceWorker.register('/sw.js') }) }",
          }}
        />
      </head>
      <body
        className={`${lilita.variable} ${pacifico.variable} ${caveat.variable} ${nunito.variable} antialiased flex flex-col min-h-screen`}
      >
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <div className="h-16 md:hidden" />
          <InstallButton />
          <BottomNav />
        </CartProvider>
      </body>
    </html>
  )
}
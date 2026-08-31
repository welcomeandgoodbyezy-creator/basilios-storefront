# storefront skeleton

a complete restaurant/storefront engine in next.js + prisma + postgres.
the machinery is finished. per client, the only work is **design and data**.

## machinery — do not touch, it already works

- auth: register / login / logout / me, cookie sessions, hashed passwords
- cart + checkout + orders + live order tracking (5s polling)
- table reservations
- admin: products, categories, orders, reservations, customers
- PWA: manifest + service worker + "get the app" install button
- mobile: bottom tab bar + hamburger sheet
- deploy-ready: vercel + neon postgres

## design surface — your work per client

- `tailwind.config.ts` — palette + fonts (the whole mood lives here)
- `app/globals.css` — btn / planks / marquee / dotted utilities
- page `.tsx` files — copy, headlines, section titles
- the little svg decorations inside pages (Frond / Cloud / Sun / Sparkle / Crown / Doodle)
- `public/art/` — photos, posters, icons
- seeds — menu, categories, stores

the included "sunny" theme (cream / sky / berry / wood) is the demo skin.
rewrite it per client; the machinery never changes.

## new client checklist

1. github → create repo **from this template** (see settings note below)
2. neon.tech → new project → copy the connection string
3. copy `.env.example` to `.env`, fill it
4. `npx prisma migrate deploy`
5. copy `prisma/seed-bens.cjs` to `prisma/seed-<client>.cjs`, edit the menu, run it
6. reskin: tailwind palette → fonts → copy → art
7. register the owner account on the live site, then
   edit email in `prisma/promote-admin.cjs` and run it
8. vercel → import → env vars → deploy
9. domain when the client pays (their money, their domain)
10. pwa: swap icon pngs (192 + 512), manifest name + colors

## example scripts (steal their shape)

- `prisma/seed-bens.cjs` — full menu + stores seed example
- `prisma/seed-stores-bens.cjs` — stores seed example
- `prisma/promote-admin.cjs` — flip a user's role to admin
- `prisma/delete-test-account.cjs` — clean a test user + their orders
- `prisma/fix-laguna.cjs` — patch database copy without a deploy

## pricing note (from the first sale)

one-time build fee + monthly "i keep it alive" retainer.
domain, hosting and messenger wiring are post-payment invoices.
the play-store apk wrap (capacitor) is the fancy upsell.

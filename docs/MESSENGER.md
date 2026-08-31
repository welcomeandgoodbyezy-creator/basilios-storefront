# LUTO Messenger Integration

## 1. Architecture

Customer → Facebook Page → Meta webhook → `app/api/messenger/webhook/route.ts`
→ signature check → dedup → `lib/messenger/brain.ts` (deterministic intent chain)
→ answers read live from Prisma (Store, Product, FaqEntry, Reservation)
→ `lib/messenger/send.ts` → Meta Graph API → customer.

The brain never invents. Every factual answer is a database query.
Unknown questions escalate to `human_required` and appear in the admin queue.

## 2. Database changes

Models added (migration `add_messenger_models`):
- BotConfiguration — per-restaurant bot settings (future multi-tenant seed)
- FaqEntry — staff-managed questions/answers with keywords
- MessengerConversation — one per sender psid, holds flow state + draft
- MessengerMessage — inbound/outbound log, unique metaMessageId for dedup
- BotEventLog — operational events (inbound, outbound, escalation, meta_error, reservation_*)

## 3. Environment variables

| Variable | Purpose | Where |
|---|---|---|
| MESSENGER_VERIFY_TOKEN | webhook subscription handshake | .env + Vercel |
| MESSENGER_APP_SECRET | HMAC signature verification | .env + Vercel |
| MESSENGER_PAGE_ACCESS_TOKEN | send messages via Graph API | .env + Vercel |

Never imported by client components. Process env beats .env — never start
the dev server in a terminal holding the neon URL (we learned this the hard way).

## 4. Meta / Facebook setup (production)

1. developers.facebook.com → create Business app → add Messenger product.
2. Messenger → Settings → connect the restaurant Page → generate Page Access Token.
3. App Settings → Basic → copy App Secret.
4. Set the three env vars in Vercel → redeploy.
5. Messenger → Webhooks → callback URL:
   `https://luto-delta.vercel.app/api/messenger/webhook`
   verify token: same string as MESSENGER_VERIFY_TOKEN.
6. Subscribe the page to `messages` and `messaging_postbacks`.
7. For real customers: app review + pages_messaging permission.

## 5. Webhook configuration

- GET handles hub.challenge verification.
- POST verifies X-Hub-Signature-256 (HMAC sha256 of raw body) when the secret is set.
- Returns 200 fast; Meta retries on non-2xx.

## 6. Local development

- .env points at local postgres; neon only via deliberate $env leash + migrate deploy.
- Test without Facebook using browser console fetches (see troubleshooting).

## 7. Production deployment

- Push to main → Vercel builds → migrations applied via `prisma migrate deploy`
  with the neon URL in a clean terminal.

## 8. Admin usage

- /admin/messenger — stats, escalation queue, recent conversations.
- /admin/messenger/faq — add/edit/disable/delete answers. No code changes needed.

## 9. Reservation flow

States: idle → awaiting_date → awaiting_time → awaiting_party → awaiting_name → idle.
Validations: parseable future date, time, party 1–20, name ≥ 2 chars, store exists,
unique constraint (date+store+name+phone) rejects double bookings (P2002 → re-ask time).
"cancel" aborts at any step.

## 10. Security

- Secrets server-side only; signature verification; timing-safe compare.
- Dedup via unique metaMessageId prevents replayed events.
- Admin pages/routes behind requireAdmin.
- No PII stored beyond sender psid and customer-provided reservation name.
- Send failures logged as meta_error, never shown to the customer.

## 11. Troubleshooting

- 403 on verify → token mismatch between Meta and env.
- meta_error rows but ok:true → page token missing/invalid; site keeps working.
- Empty tables after tests → you're looking at a different database than the
  server (env inheritance). Check which URL the process was born with.
- EPERM on prisma generate → dev server holds the engine dll; kill node first.

## 12. Known limitations

- Reservation picks the first store; multi-store selection not in the flow yet.
- Staff can read escalated conversations but not reply as the page yet.
- Opening-hours window not enforced on reservation times (only future-date check).
- No AI classifier; keyword/FAQ matching is intentionally deterministic.
- Webhook processes inline (fine at restaurant scale; queue later if volume grows).
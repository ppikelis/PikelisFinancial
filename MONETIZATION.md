# Monetization

## Requirements
- Paywalled articles with preview + CTA
- Premium users see full content
- Pricing page with upgrade CTA (Stripe Checkout)
- Subscription status stored in DB

## Implementation
- Article model has `paywalled` + `preview` fields
- Article page gates content based on `MOCK_IS_PREMIUM`
- Pricing page at `/pricing` with upgrade CTA

## UI Components
- `PaywallCard` component in `apps/web/src/components/paywall-card.tsx`

## Stripe Integration (next step)
- Env vars:
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `STRIPE_PRICE_ID`
  - `NEXT_PUBLIC_SITE_URL`
- Use Stripe Checkout to create session and redirect
- Store subscription in `Subscription` model

## Guard Strategy
- Server-side gating in route components
- Middleware can be added later for global access control

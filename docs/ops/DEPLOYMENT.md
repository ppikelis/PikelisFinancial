# Deployment Guide

## Hosting
- **Frontend**: Vercel (Next.js)
- **Database**: Postgres (Supabase / Neon / Railway)
- **Jobs**: separate Node worker or cron on Railway/Fly

## Steps
1. Create Postgres instance and set `DATABASE_URL`.
2. Deploy Next.js app to Vercel.
3. Add env vars in Vercel (see checklist).
4. Configure background jobs (cron or worker).
5. Run Prisma migrations and seed.

## Env Var Checklist
- `DATABASE_URL`
- `NEXT_PUBLIC_USE_MOCK_DATA`
- `USE_MOCK_DATA`
- `MOCK_IS_PREMIUM`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID`
- `NEXT_PUBLIC_SITE_URL`

## Observability
- Use console logging in dev.
- Add structured logs + error tracking (Sentry) in production.

## Seed Script
```
cd apps/web
npm run prisma:seed
```

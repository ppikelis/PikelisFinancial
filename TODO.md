# FinAdvisor MVP TODO

## Scaffold
- Install dependencies in `apps/web`.
- Initialize shadcn/ui: `npx shadcn-ui@latest init`.
- Add shadcn Button, Card, Tabs components.
- Run `prisma init` only if you want auto-generated env files.

## Core Features
- Implement magic link auth (email provider + tokens).
- Add ingest workers and scheduling (cron or queue).
- Build mock data adapters for `USE_MOCK_DATA=true`.
- Add stock dashboard data model (ticker, metrics, ratings).
- Add activity ingestion models (congress, insider, analysts).

## Infra
- Set up Postgres and update `DATABASE_URL`.
- Add migrations and seed data.
- Add deployment pipeline (Vercel + managed Postgres).

# Prototype Plan (Next.js App Router)

## Routes
- `/` Home: trending tickers, latest articles, top activity today
- `/stocks/[ticker]` Stock detail
- `/articles/[slug]` Article detail
- `/entities/[id]` Entity detail
- `/activity` Activity feed with tabs/filters
- `/watchlist` Watchlist + alerts list

## Mock Data
- `apps/web/src/lib/mock/*`
- Toggle via `NEXT_PUBLIC_USE_MOCK_DATA=true`

## UI
- Top nav + search box
- shadcn/ui patterns + Tailwind
- Citations UI (source links + timestamps)
- Mobile-first responsive layout

## Deliverables
- All routes working with mock data
- Minimal styling with clear hierarchy

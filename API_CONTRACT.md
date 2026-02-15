# API Contract (MVP)

## Conventions
- Base: `/api/*`
- Pagination: cursor-based (`cursor`, `limit`, `nextCursor`)
- Errors: `{ error: { code, message } }`
- Caching: route cache with `revalidate` per endpoint

## Types (TypeScript)
```ts
export interface ApiError {
  error: { code: string; message: string };
}

export interface CursorResponse<T> {
  items: T[];
  nextCursor?: string;
}
```

## Endpoints

### Home aggregates
`GET /api/home`
Response:
```ts
{
  trending: Ticker[];
  articles: Article[];
  activity: ActivityEvent[];
}
```
Caching: `revalidate: 60`

### Stock detail
`GET /api/stocks/[ticker]`
Response:
```ts
{
  ticker: Ticker;
  kpis: KPI[];
  ratings: RatingSummary[];
  activity: ActivityEvent[];
  relatedArticles: { slug: string; title: string }[];
}
```
Caching: `revalidate: 300`, invalidate on activity/ratings updates.

### Article detail
`GET /api/articles/[slug]`
Response:
```ts
Article
```
Caching: `revalidate: 600`, invalidate on article updates.

### Entity detail
`GET /api/entities/[id]`
Response:
```ts
Entity
```
Caching: `revalidate: 600`, invalidate on entity updates.

### Activity feed
`GET /api/activity?type=congress&cursor=...&limit=20`
Response:
```ts
CursorResponse<ActivityEvent>
```
Caching: `revalidate: 60`, invalidate on new activity events.

### Watchlist + alerts CRUD
`GET /api/watchlist`
`POST /api/watchlist`
`PUT /api/watchlist`
`DELETE /api/watchlist`

Response:
```ts
{
  items: string[];
  alerts: { type: string; enabled: boolean }[];
}
```
Caching: `revalidate: 30`, invalidate on writes.

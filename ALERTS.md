# Watchlists + Alerts

## Capabilities
- Add tickers to watchlist
- Follow entities (Congress, insiders, analysts)
- Alert rules:
  - Congress trade for followed entity
  - Insider buy above threshold
  - Analyst rating change
  - Article mention for watched ticker

## Data Models
- `Watchlist`, `WatchlistItem`, `WatchlistEntity`
- `AlertRule` (type + params JSON)
- `Notification` (in-app)

## Rule Evaluation Job
- Implemented in `apps/web/src/jobs/alerts/evaluate.ts`
- Uses mock events and rules in MVP

## Notifications UI
- Implemented on `/watchlist` page (mock)

## Example Rule (mock)
```
{ type: "congress_trade", params: { entity: "Pelosi" } }
```

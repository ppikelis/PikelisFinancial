# Prisma Schema Notes

## Model Explanations
- **Ticker**: core instrument, used for pricing, fundamentals, activity, and signal scores.
- **PriceSnapshot**: daily pricing snapshots for charting.
- **Fundamental**: periodic fundamentals for KPI panels.
- **Author / Article / ArticleSection / ArticleMention / ArticleTag**: supports articles, sections, tags, and ticker mentions.
- **Entity**: people/institutions/analysts; linked to activity events.
- **ActivityEvent**: unified stream for Congress/insider/13F/analyst actions.
- **Source / ArticleSource**: provenance tracking for citations.
- **Watchlist / WatchlistItem / WatchlistEntity / AlertRule**: follow tickers/entities and alert rules.
- **Notification**: in-app notifications for rule matches.
- **Subscription**: premium access state (Stripe integration).
- **SignalScore**: computed signal scores for ranking and “why now.”

## Example Queries by Page
### Home
- Top trending tickers (price change + signal score)
- Latest articles with tickers and sources
- Recent activity events with entity + ticker

### Stock
- Ticker details + latest price snapshot
- KPI fundamentals (latest period)
- Ratings/SignalScore
- Activity events for ticker
- Related articles (mentions)

### Article
- Article details + sections + tickers mentioned
- Sources (citations) + disclosures

### Entity
- Entity profile
- Activity events for entity
- Holdings/trades (derived from activity)

### Activity
- ActivityEvent list filtered by type + pagination

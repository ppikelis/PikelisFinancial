# PRD: FinAdvisor Retail Stock Research

## Goal
Build a retail stock research site similar to Seeking Alpha / Motley Fool / Zacks / Quiver with stock-focused articles and investor/analyst activity feeds.

## Blueprint 1: Signal + Narrative Terminal
**Target persona + JTBD**
- Self-directed investors who want fast signal validation and “why now” context.

**MVP (2–3 weeks)**
- Home: “Why now” feed, trending tickers, top activity today.
- Stock: chart placeholder, KPIs, ratings summary, activity timeline, related articles.
- Article: tickers referenced, inline widgets, sources + disclosures.
- Activity: filters + tabs (Congress/Insider/Institutional/Analyst).
- Watchlist + alerts list.

**V1 (6–10 weeks)**
- Signal scoring, author performance stats, entity profiles, basic screener.

**Core pages**
- Home, Stock, Article, Activity, Screener, Watchlists/Alerts, Author/Investor.

**Differentiators + risks**
- Differentiator: signal stack + narrative synthesis on every page.
- Risks: data licensing for analyst ratings, compliance for activity data.

**Example layout components**
- Home: TopNav, Search, WhyNowCard list, TrendingTickerRow, ActivityRow list.
- Stock: ChartContainer, KPIGrid, RatingPill set, ActivityTimeline, RelatedArticles.
- Article: ArticleHeader, TickerBadge list, InlineDataWidget, SourceLink list, DisclosureBox.
- Activity: FilterBar, Tabs, ActivityRow, Pagination.

## Blueprint 2: Editorial + Trust Layer
**Target persona + JTBD**
- Readers who want deep analysis with transparency and source credibility.

**MVP**
- Long-form article experience with citations, disclosures, author stats.
- Stock pages that highlight sources and confidence.

**V1**
- Author rankings, community comments, personalized alerts.

**Core pages**
- Same as above.

**Differentiators + risks**
- Differentiator: trust-first UI (sources, timestamps, confidence).
- Risks: moderation overhead, legal disclaimers.

**Example layout components**
- Article: AuthorBox, CitationList, ConfidenceScore, DisclosureBox.
- Stock: SourceLink list, RatingsSummary, CredibilityPanel.

## Blueprint 3: Activity Radar
**Target persona + JTBD**
- Users tracking investor moves (Congress/insiders/institutions).

**MVP**
- Activity feed with filters and entity pages.
- Stock page with activity timeline and impact callouts.

**V1**
- Activity impact charts, entity performance tracking.

**Core pages**
- Home, Stock, Activity, Entity, Watchlist/Alerts.

**Differentiators + risks**
- Differentiator: best-in-class activity tracking.
- Risks: data delays/accuracy, licensing restrictions.

**Example layout components**
- Activity: Tabs, ActivityRow, ImpactSparkline.
- Entity: HoldingsTable, TradesTable, PerformanceChart placeholder.

## Blueprint 4: Quant + Rankings
**Target persona + JTBD**
- Power users who want ranking-based decisioning (Zacks-style).

**MVP**
- Rankings on stock pages and home.
- Estimate revision summaries.

**V1**
- Screener with rank filters, more factor grades.

**Differentiators + risks**
- Differentiator: rank clarity + estimate revisions.
- Risks: model credibility and transparency.

**Example layout components**
- RankingTable, EstimateRevisionCard, FactorGradeRow.

## Blueprint 5: Community Signal Exchange
**Target persona + JTBD**
- Social investors who want debate and crowdsourced signals.

**MVP**
- Comments on articles, author following, basic sentiment votes.

**V1**
- Public portfolios, debate threads, reputation scores.

**Differentiators + risks**
- Differentiator: community signal layer.
- Risks: moderation/compliance burden.

**Example layout components**
- CommentThread, SentimentVote, AuthorFollowButton.

## Comparison Table
| Blueprint | MVP Speed | Differentiation | Data Risk | Best For |
|---|---|---|---|---|
| Signal + Narrative Terminal | High | High | Medium | Broad retail |
| Editorial + Trust | Medium | Medium | Medium | Research readers |
| Activity Radar | Medium | High | High | Activity trackers |
| Quant + Rankings | Medium | Medium | Medium | Power users |
| Community Signal | Medium | Medium | High | Social investors |

## Recommended MVP
**Signal + Narrative Terminal** for fastest launch and broad appeal.

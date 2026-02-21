# Design System (Tailwind + shadcn/ui)

## Typography
- Scale: 12 / 14 / 16 / 20 / 24 / 32
- Heading: `text-2xl font-semibold` (H2), `text-xl font-semibold` (H3)
- Body: `text-sm` or `text-base`
- Caption: `text-xs text-muted-foreground`

## Spacing
- Section padding: `py-6` / `px-6`
- Card padding: `p-5`
- Grid gap: `gap-4`

## Layout Grid
- Desktop: `max-w-6xl mx-auto`
- Two-column: `grid md:grid-cols-2 gap-4`
- Three-column: `grid md:grid-cols-3 gap-4`

## Semantic Color Tokens
- `bg-background`, `text-foreground`
- `bg-card`, `text-card-foreground`
- `text-muted-foreground`
- `border-border`
- `bg-primary`, `text-primary-foreground`

---

## Components (TypeScript interfaces + usage)

### TickerBadge
```ts
export interface TickerBadgeProps {
  symbol: string;
  variant?: "default" | "positive" | "negative";
}
```
Usage:
```tsx
<TickerBadge symbol="AAPL" variant="positive" />
```

### PriceChange
```ts
export interface PriceChangeProps {
  value: number;
  percent: number;
}
```
Usage:
```tsx
<PriceChange value={1.28} percent={0.7} />
```

### Sparkline
```ts
export interface SparklineProps {
  points: number[];
  height?: number;
}
```
Usage:
```tsx
<Sparkline points={[1,2,3,2,4]} />
```

### OHLCChartContainer
```ts
export interface OHLCChartContainerProps {
  title: string;
  range?: "1D" | "1W" | "1M" | "1Y";
}
```
Usage:
```tsx
<OHLCChartContainer title="AAPL" range="1M" />
```

### KPIGrid
```ts
export interface KPIGridProps {
  items: { label: string; value: string }[];
}
```
Usage:
```tsx
<KPIGrid items={[{ label: "Market Cap", value: "$2.9T" }]} />
```

### RatingPill
```ts
export interface RatingPillProps {
  label: string;
  tone?: "neutral" | "positive" | "negative";
}
```
Usage:
```tsx
<RatingPill label="Buy" tone="positive" />
```

### SourceLink
```ts
export interface SourceLinkProps {
  label: string;
  url: string;
  timestamp: string;
}
```
Usage:
```tsx
<SourceLink label="SEC Form 4" url="#" timestamp="Feb 15" />
```

### DisclosureBox
```ts
export interface DisclosureBoxProps {
  text: string;
}
```
Usage:
```tsx
<DisclosureBox text="Not investment advice." />
```

### ActivityRow
```ts
export interface ActivityRowProps {
  entity: string;
  action: string;
  amount?: string;
  date: string;
  confidence?: "low" | "medium" | "high";
}
```
Usage:
```tsx
<ActivityRow entity="Nancy Pelosi" action="Buy AAPL" date="Feb 15" />
```

### ArticleCard
```ts
export interface ArticleCardProps {
  title: string;
  summary: string;
  tickers: string[];
  href: string;
}
```
Usage:
```tsx
<ArticleCard title="Apple buyback" summary="..." tickers={["AAPL"]} href="#" />
```

### ArticleHeader
```ts
export interface ArticleHeaderProps {
  title: string;
  author: string;
  publishedAt: string;
  tickers: string[];
}
```
Usage:
```tsx
<ArticleHeader title="..." author="..." publishedAt="..." tickers={["AAPL"]} />
```

### InlineDataWidget
```ts
export interface InlineDataWidgetProps {
  label: string;
  value: string;
}
```
Usage:
```tsx
<InlineDataWidget label="P/E" value="29x" />
```

### WatchlistButton
```ts
export interface WatchlistButtonProps {
  ticker: string;
  isFollowing: boolean;
}
```
Usage:
```tsx
<WatchlistButton ticker="AAPL" isFollowing />
```

### AlertRuleBuilder
```ts
export interface AlertRuleBuilderProps {
  rules: { type: string; enabled: boolean }[];
}
```
Usage:
```tsx
<AlertRuleBuilder rules={[{ type: "Earnings", enabled: true }]} />
```

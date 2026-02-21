"use client";

import { StockGroupName } from "@/lib/data/stocks";

export type MarketCapFilter = "all" | "mega" | "large" | "mid" | "small";
export type RatingFilter = "all" | "Buy" | "Hold" | "Sell";

interface StockFiltersProps {
  theme: StockGroupName | "all";
  marketCap: MarketCapFilter;
  rating: RatingFilter;
  onThemeChange: (value: StockGroupName | "all") => void;
  onMarketCapChange: (value: MarketCapFilter) => void;
  onRatingChange: (value: RatingFilter) => void;
  themeOptions: StockGroupName[];
}

export function StockFilters({
  theme,
  marketCap,
  rating,
  onThemeChange,
  onMarketCapChange,
  onRatingChange,
  themeOptions
}: StockFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 rounded-xl border border-border bg-card p-4 text-sm">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase text-muted-foreground">
          Theme
        </span>
        <select
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          value={theme}
          onChange={(event) =>
            onThemeChange(event.target.value as StockGroupName | "all")
          }
        >
          <option value="all">All themes</option>
          {themeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase text-muted-foreground">
          Market Cap
        </span>
        <select
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          value={marketCap}
          onChange={(event) =>
            onMarketCapChange(event.target.value as MarketCapFilter)
          }
        >
          <option value="all">All sizes</option>
          <option value="mega">Mega (≥ $200B)</option>
          <option value="large">Large ($10B–$200B)</option>
          <option value="mid">Mid ($2B–$10B)</option>
          <option value="small">Small (&lt; $2B)</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase text-muted-foreground">
          Analyst Rating
        </span>
        <select
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          value={rating}
          onChange={(event) =>
            onRatingChange(event.target.value as RatingFilter)
          }
        >
          <option value="all">All ratings</option>
          <option value="Buy">Buy</option>
          <option value="Hold">Hold</option>
          <option value="Sell">Sell</option>
        </select>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { mockStockMetrics } from "@/lib/mock";
import { useSavedItems } from "@/hooks/useSavedItems";
import { STOCK_GROUPS, STOCK_GROUPS_ORDER, StockGroupName } from "@/lib/data/stocks";
import {
  StockFilters,
  MarketCapFilter,
  RatingFilter
} from "@/components/StockFilters";
import {
  StockMetricsTable,
  StockSortKey,
  SortDirection
} from "@/components/StockMetricsTable";

const favoritesKey = "finadvisor:favoriteStocks";

const marketCapMatches = (cap: number, filter: MarketCapFilter) => {
  if (filter === "all") return true;
  if (filter === "mega") return cap >= 200;
  if (filter === "large") return cap >= 10 && cap < 200;
  if (filter === "mid") return cap >= 2 && cap < 10;
  return cap < 2;
};

export default function StocksPage() {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<StockGroupName | "all">("all");
  const [marketCap, setMarketCap] = useState<MarketCapFilter>("all");
  const [rating, setRating] = useState<RatingFilter>("all");
  const [sortKey, setSortKey] = useState<StockSortKey>("pe");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const { savedItems, toggleSaved } = useSavedItems(favoritesKey);

  const themeBySymbol = useMemo(() => {
    const map = new Map<string, StockGroupName>();
    STOCK_GROUPS_ORDER.forEach((group) => {
      STOCK_GROUPS[group].forEach((stock) => {
        map.set(stock.symbol, group);
      });
    });
    return map;
  }, []);

  const filteredRows = useMemo(() => {
    // TODO: Replace mockStockMetrics with API fetch.
    const normalized = query.trim().toLowerCase();
    let rows = mockStockMetrics.filter((stock) => {
      const matchesQuery =
        !normalized ||
        stock.symbol.toLowerCase().includes(normalized) ||
        stock.name.toLowerCase().includes(normalized);
      const themeMatch =
        theme === "all" ? true : themeBySymbol.get(stock.symbol) === theme;
      const capMatch = marketCapMatches(stock.marketCap, marketCap);
      const ratingMatch = rating === "all" ? true : stock.analystRating === rating;
      return matchesQuery && themeMatch && capMatch && ratingMatch;
    });

    rows = [...rows].sort((a, b) => {
      const direction = sortDirection === "asc" ? 1 : -1;
      if (sortKey === "nextEarningsDate") {
        return (
          (new Date(a.nextEarningsDate).getTime() -
            new Date(b.nextEarningsDate).getTime()) *
          direction
        );
      }
      if (sortKey === "revenueGrowth") {
        return (a.revenueGrowth - b.revenueGrowth) * direction;
      }
      return (a.pe - b.pe) * direction;
    });

    return rows;
  }, [query, theme, marketCap, rating, sortKey, sortDirection, themeBySymbol]);

  const handleSort = (key: StockSortKey) => {
    if (key === sortKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDirection("desc");
  };

  const showNotTracked = query.trim().length > 0 && filteredRows.length === 0;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Stocks</h1>
        <p className="text-sm text-muted-foreground">
          Key metrics across tracked companies
        </p>
      </header>

      <div className="rounded-xl border border-border bg-card p-4">
        <label className="text-xs font-semibold uppercase text-muted-foreground">
          Search
        </label>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by ticker or company name"
          className="mt-3 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
      </div>

      <StockFilters
        theme={theme}
        marketCap={marketCap}
        rating={rating}
        onThemeChange={setTheme}
        onMarketCapChange={setMarketCap}
        onRatingChange={setRating}
        themeOptions={STOCK_GROUPS_ORDER}
      />

      {showNotTracked ? (
        <div className="rounded-xl border border-dashed border-border bg-card px-4 py-6 text-sm text-muted-foreground">
          Not tracked yet.
        </div>
      ) : (
        <StockMetricsTable
          rows={filteredRows}
          favorites={savedItems}
          onToggleFavorite={toggleSaved}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      )}
    </main>
  );
}

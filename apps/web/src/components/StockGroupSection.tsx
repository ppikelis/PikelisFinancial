"use client";

import { StockGroup } from "@/lib/mock/stockGroups";
import { TickerRowOrChip } from "@/components/TickerRowOrChip";

interface StockGroupSectionProps {
  group: StockGroup;
  favorites: string[];
  onToggleFavorite: (symbol: string) => void;
}

export function StockGroupSection({
  group,
  favorites,
  onToggleFavorite
}: StockGroupSectionProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            {group.name}
          </h2>
          <p className="text-sm text-muted-foreground">{group.description}</p>
        </div>
        <div className="text-xs text-muted-foreground">
          {group.tickers.length} tickers
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {group.tickers.map((ticker) => (
          <TickerRowOrChip
            key={`${group.id}-${ticker.symbol}`}
            ticker={ticker}
            href={`/stocks/${ticker.symbol}`}
            isFavorite={favorites.includes(ticker.symbol)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  );
}

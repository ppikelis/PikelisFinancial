"use client";

import Link from "next/link";
import { StockTicker } from "@/lib/mock/stockGroups";
import { cn } from "@/lib/utils";

interface TickerRowOrChipProps {
  ticker: StockTicker;
  href: string;
  isFavorite: boolean;
  onToggleFavorite: (symbol: string) => void;
  showChange?: boolean;
}

function getMockChange(symbol: string) {
  let hash = 0;
  for (let i = 0; i < symbol.length; i += 1) {
    hash = (hash * 31 + symbol.charCodeAt(i)) % 1000;
  }
  const normalized = (hash - 500) / 100;
  return Math.round(normalized * 10) / 10;
}

export function TickerRowOrChip({
  ticker,
  href,
  isFavorite,
  onToggleFavorite,
  showChange = true
}: TickerRowOrChipProps) {
  const change = showChange ? getMockChange(ticker.symbol) : null;
  const isPositive = change !== null && change >= 0;

  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm transition hover:border-primary/40 hover:bg-muted/20">
      <Link href={href} className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex min-w-0 flex-col">
          <span className="text-xs font-semibold text-muted-foreground">
            {ticker.symbol}
          </span>
          <span className="truncate text-sm font-medium text-foreground">
            {ticker.name ?? "Company name"}
          </span>
        </div>
        {change !== null ? (
          <span
            className={cn(
              "ml-auto rounded-full px-2 py-0.5 text-[11px] font-semibold",
              isPositive
                ? "bg-emerald-500/10 text-emerald-500"
                : "bg-rose-500/10 text-rose-500"
            )}
          >
            {isPositive ? "+" : ""}
            {change.toFixed(1)}%
          </span>
        ) : null}
      </Link>
      <button
        type="button"
        onClick={() => onToggleFavorite(ticker.symbol)}
        aria-label={
          isFavorite
            ? `Remove ${ticker.symbol} from favorites`
            : `Add ${ticker.symbol} to favorites`
        }
        className={cn(
          "ml-3 rounded-md border border-transparent px-2 py-1 text-base transition",
          isFavorite
            ? "text-yellow-400 hover:text-yellow-300"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        {isFavorite ? "★" : "☆"}
      </button>
    </div>
  );
}

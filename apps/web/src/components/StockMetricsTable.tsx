"use client";

import Link from "next/link";
import { StockMetric } from "@/lib/mock/stocks";
import { cn } from "@/lib/utils";

export type StockSortKey = "pe" | "revenueGrowth" | "nextEarningsDate";
export type SortDirection = "asc" | "desc";

interface StockMetricsTableProps {
  rows: StockMetric[];
  favorites: string[];
  onToggleFavorite: (symbol: string) => void;
  sortKey: StockSortKey;
  sortDirection: SortDirection;
  onSort: (key: StockSortKey) => void;
}

const formatMarketCap = (value: number) => {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(2)}T`;
  }
  return `$${value.toFixed(1)}B`;
};

const formatPct = (value: number) =>
  `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric"
  });

export function StockMetricsTable({
  rows,
  favorites,
  onToggleFavorite,
  sortKey,
  sortDirection,
  onSort
}: StockMetricsTableProps) {
  const renderSortLabel = (key: StockSortKey, label: string) => (
    <button
      type="button"
      onClick={() => onSort(key)}
      className="inline-flex items-center gap-1 text-left text-xs font-semibold uppercase text-muted-foreground"
    >
      {label}
      <span className="text-[10px]">
        {sortKey === key ? (sortDirection === "asc" ? "▲" : "▼") : "↕"}
      </span>
    </button>
  );

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full min-w-[980px] text-sm">
        <thead className="border-b border-border bg-muted/30 text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-4 py-3 text-left">★</th>
            <th className="px-4 py-3 text-left">Ticker</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-right">Price</th>
            <th className="px-4 py-3 text-right">1D %</th>
            <th className="px-4 py-3 text-right">Market Cap</th>
            <th className="px-4 py-3 text-right">{renderSortLabel("pe", "P/E")}</th>
            <th className="px-4 py-3 text-right">Forward P/E</th>
            <th className="px-4 py-3 text-right">{renderSortLabel("revenueGrowth", "Revenue Growth %")}</th>
            <th className="px-4 py-3 text-right">{renderSortLabel("nextEarningsDate", "Next Earnings")}</th>
            <th className="px-4 py-3 text-left">Analyst Rating</th>
            <th className="px-4 py-3 text-right">Price Target</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const isFavorite = favorites.includes(row.symbol);
            const isPositive = row.changePct >= 0;
            return (
              <tr
                key={row.symbol}
                className="border-b border-border last:border-b-0 hover:bg-muted/20"
              >
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(row.symbol)}
                    className={cn(
                      "text-base transition",
                      isFavorite
                        ? "text-yellow-400 hover:text-yellow-300"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    aria-label={
                      isFavorite ? "Remove from favorites" : "Add to favorites"
                    }
                  >
                    {isFavorite ? "★" : "☆"}
                  </button>
                </td>
                <td className="px-4 py-3 font-semibold text-foreground">
                  <Link
                    href={`/stocks/${row.symbol}`}
                    className="hover:underline"
                  >
                    {row.symbol}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{row.name}</td>
                <td className="px-4 py-3 text-right">${row.price.toFixed(2)}</td>
                <td
                  className={cn(
                    "px-4 py-3 text-right font-semibold",
                    isPositive ? "text-emerald-500" : "text-rose-500"
                  )}
                >
                  {formatPct(row.changePct)}
                </td>
                <td className="px-4 py-3 text-right">
                  {formatMarketCap(row.marketCap)}
                </td>
                <td className="px-4 py-3 text-right">{row.pe.toFixed(1)}x</td>
                <td className="px-4 py-3 text-right">
                  {row.forwardPe.toFixed(1)}x
                </td>
                <td className="px-4 py-3 text-right">
                  {formatPct(row.revenueGrowth)}
                </td>
                <td className="px-4 py-3 text-right">
                  {formatDate(row.nextEarningsDate)}
                </td>
                <td className="px-4 py-3 text-left">{row.analystRating}</td>
                <td className="px-4 py-3 text-right">
                  ${row.priceTarget.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

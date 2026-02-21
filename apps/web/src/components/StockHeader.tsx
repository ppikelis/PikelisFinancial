"use client";

import { StockMetricSnapshot } from "@/lib/mock/stockMetrics";
import { WatchlistStar } from "@/components/WatchlistStar";

interface StockHeaderProps {
  metric: StockMetricSnapshot;
}

const formatMarketCap = (value: number) => {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(2)}T`;
  }
  return `$${value.toFixed(1)}B`;
};

export function StockHeader({ metric }: StockHeaderProps) {
  const isPositive = metric.changePct >= 0;

  return (
    <header className="rounded-xl border border-border bg-card p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-2xl font-semibold text-foreground">
            {metric.symbol} · {metric.name}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="text-lg font-semibold text-foreground">
              ${metric.price.toFixed(2)}
              <span
                className={`ml-2 text-sm font-semibold ${
                  isPositive ? "text-emerald-500" : "text-rose-500"
                }`}
              >
                {isPositive ? "+" : ""}
                {metric.changePct.toFixed(2)}%
              </span>
            </div>
            <span>Market cap: {formatMarketCap(metric.marketCap)}</span>
            <span>
              Next earnings:{" "}
              {new Date(metric.nextEarningsDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <WatchlistStar symbol={metric.symbol} />
          <button className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-xs font-semibold text-muted-foreground transition hover:text-foreground">
            Share
          </button>
        </div>
      </div>
    </header>
  );
}

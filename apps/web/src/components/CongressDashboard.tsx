"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSavedItems } from "@/hooks/useSavedItems";
import { CongressPerformanceChart, PerformancePoint } from "@/components/CongressPerformanceChart";
import { cn } from "@/lib/utils";

export interface CongressTradeRow {
  id: string;
  politician: string;
  chamber: string;
  ticker: string;
  assetName?: string | null;
  tradeDate: string;
  reportDate?: string | null;
  transactionType: string;
  amountMin?: number | null;
  amountMax?: number | null;
  ownerType?: string | null;
  sourceUrl?: string | null;
}

interface CongressDashboardProps {
  trades: CongressTradeRow[];
  performance: Record<string, PerformancePoint[]>;
  initialPolitician?: string | null;
}

const formatAmount = (min?: number | null, max?: number | null) => {
  if (!min && !max) return "—";
  if (min === max) return `$${min?.toLocaleString()}`;
  return `$${min?.toLocaleString()} - $${max?.toLocaleString()}`;
};

const formatDate = (value?: string | null) =>
  value
    ? new Date(value).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    : "—";

const makeFallbackSeries = (seed: string) => {
  let value = seed.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const points: PerformancePoint[] = [];
  let level = 100;
  const start = new Date("2024-01-01T00:00:00Z");
  for (let i = 0; i < 180; i += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    value = (value * 9301 + 49297) % 233280;
    level += (value / 233280 - 0.45) * 0.8;
    points.push({ date: date.toISOString().slice(0, 10), value: Number(level.toFixed(2)) });
  }
  return points;
};

export function CongressDashboard({
  trades,
  performance,
  initialPolitician
}: CongressDashboardProps) {
  const [selected, setSelected] = useState<string>(initialPolitician ?? "All");
  const { savedItems, toggleSaved } = useSavedItems("finadvisor:followedPoliticians");

  const politicians = useMemo(() => {
    const list = Array.from(new Set(trades.map((trade) => trade.politician)));
    return ["All", ...list];
  }, [trades]);

  const filteredTrades = useMemo(() => {
    if (selected === "All") return trades;
    return trades.filter((trade) => trade.politician === selected);
  }, [trades, selected]);

  const activeSeries =
    selected === "All"
      ? makeFallbackSeries("all")
      : performance[selected] ?? makeFallbackSeries(selected);

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-foreground">
              Portfolio Performance
            </div>
            <div className="text-xs text-muted-foreground">
              {selected === "All" ? "All tracked politicians" : selected}
            </div>
          </div>
          <select
            value={selected}
            onChange={(event) => setSelected(event.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          >
            {politicians.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 rounded-lg border border-border bg-background p-3">
          <CongressPerformanceChart series={activeSeries} />
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm font-semibold text-foreground">Recent Trades</div>
          <div className="text-xs text-muted-foreground">
            {filteredTrades.length} trades
          </div>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[840px] text-sm">
            <thead className="text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-3 py-2 text-left">Follow</th>
                <th className="px-3 py-2 text-left">Politician</th>
                <th className="px-3 py-2 text-left">Chamber</th>
                <th className="px-3 py-2 text-left">Ticker</th>
                <th className="px-3 py-2 text-left">Type</th>
                <th className="px-3 py-2 text-left">Owner</th>
                <th className="px-3 py-2 text-left">Amount</th>
                <th className="px-3 py-2 text-left">Trade Date</th>
                <th className="px-3 py-2 text-left">Report Date</th>
                <th className="px-3 py-2 text-left">Source</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrades.map((trade) => {
                const isFollowed = savedItems.includes(trade.politician);
                const spouseTrade =
                  trade.ownerType?.toLowerCase() === "spouse";
                return (
                  <tr
                    key={trade.id}
                    className={cn(
                      "border-t border-border",
                      spouseTrade && "bg-amber-500/5"
                    )}
                  >
                    <td className="px-3 py-2">
                      <button
                        type="button"
                        onClick={() => toggleSaved(trade.politician)}
                        className={cn(
                          "text-base",
                          isFollowed
                            ? "text-yellow-400"
                            : "text-muted-foreground"
                        )}
                      >
                        {isFollowed ? "★" : "☆"}
                      </button>
                    </td>
                    <td className="px-3 py-2 text-foreground">
                      <Link
                        href={`/congress/${encodeURIComponent(trade.politician)}`}
                        className="hover:underline"
                      >
                        {trade.politician}
                      </Link>
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {trade.chamber}
                    </td>
                    <td className="px-3 py-2">
                      <Link
                        href={`/stocks/${trade.ticker}`}
                        className="font-semibold text-foreground hover:underline"
                      >
                        {trade.ticker}
                      </Link>
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {trade.transactionType}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {trade.ownerType ?? "—"}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {formatAmount(trade.amountMin, trade.amountMax)}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {formatDate(trade.tradeDate)}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {formatDate(trade.reportDate)}
                    </td>
                    <td className="px-3 py-2">
                      {trade.sourceUrl ? (
                        <a
                          href={trade.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary hover:underline"
                        >
                          Source
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

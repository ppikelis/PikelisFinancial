"use client";

import { useMemo, useState } from "react";
import { StrategyChart } from "@/components/strategy/StrategyChart";
import { TimeframeTabs } from "@/components/strategy/TimeframeTabs";
import { MetricCard } from "@/components/strategy/MetricCard";
import { AboutSidebar } from "@/components/strategy/AboutSidebar";
import { ThemeStrategy } from "@/lib/mock/strategies";

const timeframeMap: Record<string, number> = {
  "1M": 30,
  "3M": 90,
  "6M": 180,
  "1Y": 365,
  "2Y": 730,
  "5Y": 1825
};

function filterSeries(
  series: { date: string; value: number }[],
  timeframe: string
) {
  if (timeframe === "MAX") {
    return series;
  }

  const end = new Date(series[series.length - 1]?.date ?? new Date());

  if (timeframe === "YTD") {
    const start = new Date(end.getFullYear(), 0, 1);
    return series.filter((point) => new Date(point.date) >= start);
  }

  const days = timeframeMap[timeframe] ?? 30;
  const start = new Date(end);
  start.setDate(end.getDate() - days);
  return series.filter((point) => new Date(point.date) >= start);
}

interface StrategyDashboardProps {
  name: string;
  description: string;
  strategy: ThemeStrategy;
  tickers: { symbol: string; label?: string }[];
}

export function StrategyDashboard({
  name,
  description,
  strategy,
  tickers
}: StrategyDashboardProps) {
  const [timeframe, setTimeframe] = useState("1Y");
  const [showBenchmark, setShowBenchmark] = useState(true);
  const [showStrategy] = useState(true);

  const filtered = useMemo(
    () => ({
      equityCurve: filterSeries(strategy.equityCurve, timeframe),
      benchmarkCurve: filterSeries(strategy.benchmarkCurve, timeframe)
    }),
    [strategy, timeframe]
  );

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <section className="grid gap-6 lg:grid-cols-[1.8fr_1fr]">
        <div className="rounded-sm border border-border bg-card p-6">
          <div className="text-2xl font-semibold">{name} Strategy</div>
          <div className="mt-1 text-sm text-muted-foreground">
            <span className="text-primary">{strategy.metrics.allTimeReturn}%</span>{" "}
            All Time
          </div>

          <div className="mt-6 rounded-sm border border-border bg-background p-4">
            {showStrategy ? (
              <StrategyChart
                equityCurve={filtered.equityCurve}
                benchmarkCurve={filtered.benchmarkCurve}
                showBenchmark={showBenchmark}
              />
            ) : null}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
            <TimeframeTabs value={timeframe} onChange={setTimeframe} />
            <div className="flex items-center gap-2 text-xs">
              <button className="rounded-sm border border-border bg-primary px-3 py-1 text-primary-foreground">
                Strategy
              </button>
              <button
                className={`rounded-sm border border-border px-3 py-1 ${
                  showBenchmark ? "bg-muted text-foreground" : "text-muted-foreground"
                }`}
                onClick={() => setShowBenchmark((prev) => !prev)}
              >
                Market
              </button>
            </div>
          </div>
        </div>

        <AboutSidebar
          description={description}
          startDate={strategy.startDate}
          cagr={strategy.metrics.cagr}
          return30d={strategy.metrics.return30d}
          return1y={strategy.metrics.return1y}
        />
      </section>

      <section>
        <div className="text-sm font-semibold">Key Metrics</div>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <MetricCard label="Return (1D)" value={`${strategy.metrics.return1d}%`} />
          <MetricCard label="Return (30D)" value={`${strategy.metrics.return30d}%`} />
          <MetricCard label="Return (1Y)" value={`${strategy.metrics.return1y}%`} />
          <MetricCard label="CAGR (Total)" value={`${strategy.metrics.cagr}%`} />
          <MetricCard label="Max Drawdown" value={`${strategy.metrics.maxDrawdown}%`} />
          <MetricCard label="Beta" value={`${strategy.metrics.beta}`} />
          <MetricCard label="Alpha" value={`${strategy.metrics.alpha}`} />
          <MetricCard label="Sharpe Ratio" value={`${strategy.metrics.sharpe}`} />
        </div>
      </section>

      <section className="rounded-sm border border-border bg-card p-6">
        <div className="text-sm font-semibold">Holdings</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tickers.map((ticker) => (
            <a
              key={ticker.symbol}
              href={`/stocks/${ticker.symbol}`}
              className="rounded-full border border-border px-3 py-1 text-xs"
            >
              {ticker.symbol}
              {ticker.label ? ` · ${ticker.label}` : ""}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

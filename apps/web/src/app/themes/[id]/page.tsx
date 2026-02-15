"use client";

import { ThemeStrategyChart } from "@/components/ThemeStrategyChart";
import { AboutSidebar } from "@/components/strategy/AboutSidebar";
import { MetricCard } from "@/components/strategy/MetricCard";
import { TimeframeTabs } from "@/components/strategy/TimeframeTabs";
import { themeStrategiesMock, themesMock } from "@/lib/mock";
import { useMemo, useState } from "react";

interface ThemePageProps {
  params: { id: string };
}

export default function ThemeDetailPage({ params }: ThemePageProps) {
  const theme = themesMock.find((item) => item.id === params.id);
  const strategy = themeStrategiesMock.find(
    (item) => item.themeId === params.id
  );

  if (!theme || !strategy) {
    return (
      <main className="mx-auto w-full max-w-4xl px-6 py-8">
        <div className="rounded-xl border border-border bg-card p-6 text-sm">
          Theme not found in mock data.
        </div>
      </main>
    );
  }

  const tickers = theme.tickers.map((ticker) => ticker.symbol);
  const [timeframe, setTimeframe] = useState("1Y");
  const [showBasket, setShowBasket] = useState(true);
  const [showSpy, setShowSpy] = useState(true);

  const filterSeries = (
    series: { date: string; value: number }[],
    frame: string
  ) => {
    if (frame === "MAX") {
      return series;
    }
    const end = new Date(series[series.length - 1]?.date ?? new Date());
    if (frame === "YTD") {
      const start = new Date(end.getFullYear(), 0, 1);
      return series.filter((point) => new Date(point.date) >= start);
    }
    const map: Record<string, number> = {
      "1M": 30,
      "3M": 90,
      "6M": 180,
      "1Y": 365,
      "3Y": 1095
    };
    const days = map[frame] ?? 30;
    const start = new Date(end);
    start.setDate(end.getDate() - days);
    return series.filter((point) => new Date(point.date) >= start);
  };

  const normalizeSeries = (series: { date: string; value: number }[]) => {
    const base = series[0]?.value ?? 1;
    return series.map((point) => ({
      date: point.date,
      value: Number(((point.value / base) * 100).toFixed(2))
    }));
  };

  const chartData = useMemo(() => {
    const seriesByTicker: Record<string, { date: string; value: number }[]> = {};
    tickers.forEach((symbol) => {
      const raw = strategy.prices[symbol] ?? [];
      seriesByTicker[symbol] = normalizeSeries(filterSeries(raw, timeframe));
    });

    const spySeries = normalizeSeries(filterSeries(strategy.spy, timeframe));
    const length = spySeries.length;

    const data = Array.from({ length }, (_, index) => {
      const date = spySeries[index]?.date ?? "";
      const entry: Record<string, number | string> = {
        date,
        spy: spySeries[index]?.value ?? 0
      };

      let basketSum = 0;
      let basketCount = 0;

      tickers.forEach((symbol) => {
        const value = seriesByTicker[symbol]?.[index]?.value;
        if (value !== undefined) {
          entry[symbol] = value;
          basketSum += value;
          basketCount += 1;
        }
      });

      entry.basket = basketCount > 0 ? Number((basketSum / basketCount).toFixed(2)) : 0;
      return entry;
    });

    return data;
  }, [strategy, tickers, timeframe]);

  const computeMetrics = useMemo(() => {
    const basket = chartData.map((point) => Number(point.basket ?? 0));
    const spy = chartData.map((point) => Number(point.spy ?? 0));
    if (basket.length === 0) {
      return {
        return1y: 0,
        cagr: 0,
        maxDrawdown: 0,
        volatility: 0,
        sharpe: 0,
        basketVsSpy: 0,
        return30d: 0,
        return1d: 0
      };
    }

    const totalReturn = (basket[basket.length - 1] / basket[0] - 1) * 100;
    const years = basket.length / 365;
    const cagr = (Math.pow(basket[basket.length - 1] / basket[0], 1 / years) - 1) * 100;

    let peak = basket[0];
    let maxDrawdown = 0;
    for (const value of basket) {
      if (value > peak) peak = value;
      const drawdown = (value / peak - 1) * 100;
      if (drawdown < maxDrawdown) maxDrawdown = drawdown;
    }

    const returns = basket.slice(1).map((value, idx) => value / basket[idx] - 1);
    const mean = returns.reduce((sum, value) => sum + value, 0) / returns.length;
    const variance =
      returns.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
      returns.length;
    const volatility = Math.sqrt(variance) * Math.sqrt(252) * 100;
    const sharpe = volatility === 0 ? 0 : ((mean * 252) / (volatility / 100));

    const oneYearIndex = Math.max(0, basket.length - 365);
    const return1y = (basket[basket.length - 1] / basket[oneYearIndex] - 1) * 100;
    const return30d =
      basket.length > 30
        ? (basket[basket.length - 1] / basket[basket.length - 30] - 1) * 100
        : totalReturn;
    const return1d =
      basket.length > 1
        ? (basket[basket.length - 1] / basket[basket.length - 2] - 1) * 100
        : totalReturn;

    const spyReturn = (spy[spy.length - 1] / spy[0] - 1) * 100;

    return {
      return1y,
      cagr,
      maxDrawdown,
      volatility,
      sharpe,
      basketVsSpy: totalReturn - spyReturn,
      return30d,
      return1d,
      allTimeReturn: totalReturn
    };
  }, [chartData]);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <section className="grid gap-6 lg:grid-cols-[1.8fr_1fr]">
        <div className="rounded-sm border border-border bg-card p-6">
          <div className="text-2xl font-semibold">{theme.name} Strategy</div>
          <div className="mt-1 text-sm text-muted-foreground">
            <span className="text-primary">
              {computeMetrics.allTimeReturn.toFixed(2)}%
            </span>{" "}
            All Time
          </div>

          <div className="mt-4 rounded-sm border border-border bg-background p-4">
            <ThemeStrategyChart
              data={chartData}
              tickers={tickers}
              showBasket={showBasket}
              showSpy={showSpy}
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
            <TimeframeTabs value={timeframe} onChange={setTimeframe} />
            <div className="flex items-center gap-2 text-xs">
              <button
                className={`rounded-sm border border-border px-3 py-1 ${
                  showBasket ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
                onClick={() => setShowBasket((prev) => !prev)}
              >
                Strategy
              </button>
              <button
                className={`rounded-sm border border-border px-3 py-1 ${
                  showSpy ? "bg-muted text-foreground" : "text-muted-foreground"
                }`}
                onClick={() => setShowSpy((prev) => !prev)}
              >
                Market
              </button>
            </div>
          </div>
        </div>

        <AboutSidebar
          description={strategy.about}
          startDate={strategy.startDate}
          cagr={Number(computeMetrics.cagr.toFixed(2))}
          return30d={Number(computeMetrics.return30d.toFixed(2))}
          return1y={Number(computeMetrics.return1y.toFixed(2))}
        />
      </section>

      <section>
        <div className="text-sm font-semibold">Key Metrics</div>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <MetricCard
            label="Return (1Y)"
            value={`${computeMetrics.return1y.toFixed(2)}%`}
          />
          <MetricCard label="CAGR" value={`${computeMetrics.cagr.toFixed(2)}%`} />
          <MetricCard
            label="Max Drawdown"
            value={`${computeMetrics.maxDrawdown.toFixed(2)}%`}
          />
          <MetricCard
            label="Volatility"
            value={`${computeMetrics.volatility.toFixed(2)}%`}
          />
          <MetricCard
            label="Sharpe Ratio"
            value={`${computeMetrics.sharpe.toFixed(2)}`}
          />
          <MetricCard
            label="Basket vs SP500"
            value={`${computeMetrics.basketVsSpy.toFixed(2)}%`}
          />
          <MetricCard
            label="Return (30D)"
            value={`${computeMetrics.return30d.toFixed(2)}%`}
          />
          <MetricCard
            label="Return (1D)"
            value={`${computeMetrics.return1d.toFixed(2)}%`}
          />
        </div>
      </section>
    </main>
  );
}

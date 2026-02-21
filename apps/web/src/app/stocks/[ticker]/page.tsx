"use client";

import { useMemo, useState } from "react";
import { STOCK_GROUPS, STOCK_GROUPS_ORDER } from "@/lib/data/stocks";
import { stockMetricsMock } from "@/lib/mock/stockMetrics";
import { stockPriceSeriesMock } from "@/lib/mock/stockPriceSeries";
import { mockNews } from "@/lib/mock/news";
import { articleMock } from "@/lib/mock/articles";
import { StockHeader } from "@/components/StockHeader";
import { StockChart, StockTimeframe } from "@/components/StockChart";
import { LatestArticlesPanel } from "@/components/LatestArticlesPanel";
import { KeyRatiosSection } from "@/components/KeyRatiosSection";

interface StockPageProps {
  params: { ticker: string };
}

const timeframeOptions: StockTimeframe[] = [
  "1D",
  "5D",
  "1M",
  "3M",
  "6M",
  "YTD",
  "1Y",
  "5Y",
  "MAX"
];

const isInUniverse = (symbol: string) =>
  STOCK_GROUPS_ORDER.some((group) =>
    STOCK_GROUPS[group].some((stock) => stock.symbol === symbol)
  );

const toDate = (value: string) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return new Date();
  }
  return parsed;
};

const formatTimeAgo = (value: string) => {
  const then = toDate(value).getTime();
  const now = Date.now();
  const diffMinutes = Math.max(1, Math.round((now - then) / 60000));
  if (diffMinutes < 60) return `${diffMinutes}m`;
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h`;
  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d`;
};

export default function StockPage({ params }: StockPageProps) {
  const symbol = params.ticker.toUpperCase();
  const [timeframe, setTimeframe] = useState<StockTimeframe>("1Y");

  if (!isInUniverse(symbol)) {
    return (
      <main className="mx-auto w-full max-w-4xl px-6 py-8">
        <div className="rounded-xl border border-border bg-card p-6 text-sm">
          Not tracked yet.
        </div>
      </main>
    );
  }

  const metric = stockMetricsMock.find((item) => item.symbol === symbol);
  const series = stockPriceSeriesMock[symbol] ?? [];

  if (!metric) {
    return (
      <main className="mx-auto w-full max-w-4xl px-6 py-8">
        <div className="rounded-xl border border-border bg-card p-6 text-sm">
          No metrics available.
        </div>
      </main>
    );
  }

  const latestArticles = useMemo(() => {
    const analysis = Object.values(articleMock)
      .filter((article) => article.tickers.includes(symbol))
      .map((article) => ({
        id: article.slug,
        title: article.title,
        source: "Your Analysis" as const,
        timeAgo: formatTimeAgo(article.publishedAt),
        tickers: article.tickers,
        href: `/articles/${article.slug}`,
        publishedAt: article.publishedAt
      }));

    const news = mockNews
      .filter((item) => item.tickers.includes(symbol))
      .map((item) => ({
        id: item.id,
        title: item.headline,
        source: "News" as const,
        timeAgo: formatTimeAgo(item.publishedAt),
        tickers: item.tickers,
        href: `/news/${item.id}`,
        publishedAt: item.publishedAt
      }));

    const sortByDate = (a: { publishedAt: string }, b: { publishedAt: string }) =>
      toDate(b.publishedAt).getTime() - toDate(a.publishedAt).getTime();

    return [...analysis.sort(sortByDate), ...news.sort(sortByDate)].slice(0, 10);
  }, [symbol]);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <StockHeader metric={metric} />

      <section className="grid gap-6 lg:grid-cols-[1.8fr_1fr]">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm font-semibold text-foreground">
              Price chart
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              {timeframeOptions.map((frame) => (
                <button
                  key={frame}
                  className={`rounded-md border border-border px-2 py-1 ${
                    frame === timeframe
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setTimeframe(frame)}
                >
                  {frame}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 rounded-lg border border-border bg-background p-3">
            <StockChart series={series} timeframe={timeframe} />
          </div>
        </div>

        <LatestArticlesPanel items={latestArticles} />
      </section>

      <KeyRatiosSection metric={metric} symbol={symbol} />
    </main>
  );
}

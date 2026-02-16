"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemePreviewChart } from "@/components/ThemePreviewChart";
import { themeStrategiesMock, themesMock } from "@/lib/mock";

export default function ThemesPage() {
  const router = useRouter();

  const normalizeSeries = (series: { date: string; value: number }[]) => {
    const base = series[0]?.value ?? 1;
    return series.map((point) => ({
      date: point.date,
      value: Number(((point.value / base) * 100).toFixed(2))
    }));
  };

  const computeBasketSeries = (
    tickers: string[],
    prices: Record<string, { date: string; value: number }[]>
  ) => {
    const normalized = tickers.map((symbol) => normalizeSeries(prices[symbol] ?? []));
    const length = normalized[0]?.length ?? 0;
    return Array.from({ length }, (_, index) => {
      const date = normalized[0]?.[index]?.date ?? "";
      let sum = 0;
      let count = 0;
      normalized.forEach((series) => {
        const value = series[index]?.value;
        if (value !== undefined) {
          sum += value;
          count += 1;
        }
      });
      return {
        date,
        value: count ? Number((sum / count).toFixed(2)) : 0
      };
    });
  };

  const computeReturn = (series: { date: string; value: number }[]) => {
    if (series.length < 2) {
      return 0;
    }
    return Number(((series[series.length - 1].value / series[0].value - 1) * 100).toFixed(2));
  };

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <header className="rounded-xl border border-border bg-card p-6">
        <div className="text-sm font-semibold">Themes</div>
        <p className="mt-2 text-sm text-muted-foreground">
          Explore curated baskets and emerging thematic clusters.
        </p>
      </header>

      {themesMock.map((theme) => {
        const strategy = themeStrategiesMock.find((item) => item.themeId === theme.id);
        if (!strategy) {
          return null;
        }
        const tickers = theme.tickers.map((ticker) => ticker.symbol);
        const basketSeries = computeBasketSeries(tickers, strategy.prices);
        const spySeries = normalizeSeries(strategy.spy);
        const allTimeReturn = computeReturn(basketSeries);
        const oneYearSeries = basketSeries.slice(Math.max(0, basketSeries.length - 365));
        const oneYearReturn = computeReturn(oneYearSeries);

        return (
          <section
            key={theme.id}
            className="rounded-xl border border-border bg-card p-6 transition hover:border-muted-foreground/40 hover:bg-muted/40 focus-within:border-primary/60 focus-within:ring-1 focus-within:ring-primary/40 cursor-pointer"
            role="link"
            tabIndex={0}
            onClick={() => router.push(`/themes/${theme.id}`)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                router.push(`/themes/${theme.id}`);
              }
            }}
          >
            <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-base font-semibold">{theme.name}</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {theme.description}
                    </div>
                  </div>
                  <button
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    aria-label={`Open ${theme.name} theme`}
                    onClick={(event) => {
                      event.stopPropagation();
                      router.push(`/themes/${theme.id}`);
                    }}
                  >
                    Open theme <span aria-hidden>›</span>
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {theme.tickers.map((ticker) => (
                    <Link
                      key={`${theme.id}-${ticker.symbol}`}
                      href={`/stocks/${ticker.symbol}`}
                      className="rounded-full border border-border px-3 py-1 text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {ticker.symbol}
                      {ticker.label ? ` · ${ticker.label}` : ""}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Performance (Basket vs S&amp;P 500)
                </div>
                <div className="text-[11px] text-muted-foreground">
                  Hover for returns. Click “Open theme” for details.
                </div>
                <div className="rounded-md border border-border bg-gradient-to-b from-muted/70 to-transparent p-3">
                  <ThemePreviewChart
                    themeId={theme.id}
                    basketSeries={basketSeries}
                    benchmarkSeries={spySeries}
                  />
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      Basket
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/70" />
                      S&amp;P 500
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-4 text-xs text-muted-foreground">
                  <div>
                    1Y:{" "}
                    <span
                      className={oneYearReturn >= 0 ? "text-primary" : "text-red-400"}
                    >
                      {oneYearReturn.toFixed(2)}%
                    </span>
                  </div>
                  <div>
                    All-time:{" "}
                    <span
                      className={allTimeReturn >= 0 ? "text-primary" : "text-red-400"}
                    >
                      {allTimeReturn.toFixed(2)}%
                    </span>
                  </div>
                  <div>Start: {strategy.startDate}</div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}

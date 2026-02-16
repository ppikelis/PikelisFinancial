"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ThemePreviewChart } from "@/components/ThemePreviewChart";
import { Collection, CollectionType } from "@/lib/types";

interface CollectionPageProps {
  title: string;
  description: string;
  collections: Collection[];
  type: CollectionType;
}

const normalizeSeries = (series: { date: string; value: number }[]) => {
  const base = series[0]?.value ?? 1;
  return series.map((point) => ({
    date: point.date,
    value: Number(((point.value / base) * 100).toFixed(2))
  }));
};

const computeReturn = (series: { date: string; value: number }[]) => {
  if (series.length < 2) {
    return 0;
  }
  return Number(((series[series.length - 1].value / series[0].value - 1) * 100).toFixed(2));
};

export function CollectionPage({ title, description, collections, type }: CollectionPageProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <header className="rounded-xl border border-border bg-card p-6">
        <div className="text-sm font-semibold">{title}</div>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </header>

      {collections.map((collection) => {
        const basketSeries = normalizeSeries(collection.previewPerformance.basketSeries);
        const spySeries = normalizeSeries(collection.previewPerformance.benchmarkSeries);
        const allTimeReturn = computeReturn(basketSeries);
        const oneYearSeries = basketSeries.slice(Math.max(0, basketSeries.length - 365));
        const oneYearReturn = computeReturn(oneYearSeries);

        return (
          <section
            key={collection.id}
            className="rounded-xl border border-border bg-card p-6 transition hover:border-muted-foreground/40 hover:bg-muted/40 focus-within:border-primary/60 focus-within:ring-1 focus-within:ring-primary/40 cursor-pointer"
            role="link"
            tabIndex={0}
            onClick={() => router.push(`/${type}/${collection.id}`)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                router.push(`/${type}/${collection.id}`);
              }
            }}
          >
            <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-base font-semibold">{collection.name}</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {collection.description}
                    </div>
                  </div>
                  <button
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    aria-label={`Open ${collection.name}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      router.push(`/${type}/${collection.id}`);
                    }}
                  >
                    Open theme <span aria-hidden>›</span>
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {collection.tickers.map((ticker) => (
                    <Link
                      key={`${collection.id}-${ticker.symbol}`}
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
                    themeId={collection.id}
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
                    <span className={oneYearReturn >= 0 ? "text-primary" : "text-red-400"}>
                      {oneYearReturn.toFixed(2)}%
                    </span>
                  </div>
                  <div>
                    All-time:{" "}
                    <span className={allTimeReturn >= 0 ? "text-primary" : "text-red-400"}>
                      {allTimeReturn.toFixed(2)}%
                    </span>
                  </div>
                  <div>Start: {collection.previewPerformance.startDate}</div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}

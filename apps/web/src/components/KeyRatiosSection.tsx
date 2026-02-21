"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { StockMetricSnapshot } from "@/lib/mock/stockMetrics";
import { KeyRatiosTable } from "@/components/KeyRatiosTable";
import { RatioChart } from "@/components/RatioChart";
import { getRatioHistory } from "@/lib/mock/ratioHistory";
import { ratioMeta, RatioKey } from "@/lib/data/ratioMeta";
import { STOCK_GROUPS, STOCK_GROUPS_ORDER, StockGroupName } from "@/lib/data/stocks";

type RatiosView = "numbers" | "charts";
type RatioTimeframe = "1y" | "3y" | "5y" | "max";
type CompareMode = "none" | "theme" | "sp500";

interface KeyRatiosSectionProps {
  metric: StockMetricSnapshot;
  symbol: string;
}

const timeframeOptions: RatioTimeframe[] = ["1y", "3y", "5y", "max"];

const filterByTimeframe = (values: { date: string; value: number | null }[], tf: RatioTimeframe) => {
  if (tf === "max") return values;
  const totalPoints = values.length;
  const pointsMap: Record<RatioTimeframe, number> = {
    "1y": 4,
    "3y": 12,
    "5y": 20,
    max: totalPoints
  };
  const count = pointsMap[tf] ?? totalPoints;
  return values.slice(Math.max(totalPoints - count, 0));
};

export function KeyRatiosSection({ metric, symbol }: KeyRatiosSectionProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const ratiosView = (searchParams.get("ratiosView") as RatiosView) ?? "numbers";
  const metricParam = searchParams.get("metric") as RatioKey | null;
  const timeframeParam = (searchParams.get("tf") as RatioTimeframe | null) ?? "5y";
  const compareParam = (searchParams.get("compare") as CompareMode | null) ?? "none";

  const activeMetric =
    ratioMeta.find((item) => item.key === metricParam) ?? ratioMeta[0];

  const setParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const ratioHistory = useMemo(() => getRatioHistory(symbol), [symbol]);
  const chartSeries = filterByTimeframe(
    ratioHistory[activeMetric.key],
    timeframeParam
  );

  const themeForSymbol = useMemo(() => {
    for (const groupName of STOCK_GROUPS_ORDER) {
      if (STOCK_GROUPS[groupName].some((stock) => stock.symbol === symbol)) {
        return groupName;
      }
    }
    return null;
  }, [symbol]);

  const compareSeries = useMemo(() => {
    if (compareParam === "none") return undefined;
    const symbols =
      compareParam === "sp500"
        ? STOCK_GROUPS_ORDER.flatMap((group) =>
            STOCK_GROUPS[group].map((stock) => stock.symbol)
          )
        : themeForSymbol
        ? STOCK_GROUPS[themeForSymbol].map((stock) => stock.symbol)
        : [];

    if (symbols.length === 0) return undefined;

    const histories = symbols.map((sym) => getRatioHistory(sym)[activeMetric.key]);
    return chartSeries.map((point, index) => {
      const values = histories
        .map((series) => series[index]?.value)
        .filter((value): value is number => value !== null && value !== undefined);
      if (values.length === 0) {
        return { date: point.date, value: null };
      }
      const sorted = values.slice().sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      const median =
        sorted.length % 2 === 0
          ? (sorted[mid - 1] + sorted[mid]) / 2
          : sorted[mid];
      return { date: point.date, value: Number(median.toFixed(2)) };
    });
  }, [activeMetric.key, chartSeries, compareParam, themeForSymbol]);

  const compareLabel =
    compareParam === "sp500"
      ? "SP500 median"
      : compareParam === "theme"
      ? "Theme median"
      : undefined;

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-foreground">Key Ratios</h2>
        <div className="flex items-center gap-2 rounded-md border border-border bg-card p-1 text-xs font-semibold">
          {(["numbers", "charts"] as RatiosView[]).map((view) => (
            <button
              key={view}
              className={`rounded-md px-3 py-1 ${
                ratiosView === view
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
              onClick={() => setParam("ratiosView", view)}
            >
              {view === "numbers" ? "Numbers" : "Charts"}
            </button>
          ))}
        </div>
      </div>

      {ratiosView === "numbers" ? (
        <KeyRatiosTable metric={metric} />
      ) : (
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <div className="text-xs font-semibold uppercase text-muted-foreground">
                Metric
              </div>
              <select
                className="mt-2 rounded-md border border-border bg-background px-3 py-2 text-sm"
                value={activeMetric.key}
                onChange={(event) => setParam("metric", event.target.value)}
              >
                {ratioMeta.map((item) => (
                  <option key={item.key} value={item.key}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase text-muted-foreground">
                Timeframe
              </div>
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                {timeframeOptions.map((frame) => (
                  <button
                    key={frame}
                    className={`rounded-md border border-border px-2 py-1 ${
                      timeframeParam === frame
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setParam("tf", frame)}
                  >
                    {frame.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase text-muted-foreground">
                Compare
              </div>
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                {(["none", "theme", "sp500"] as CompareMode[]).map((mode) => (
                  <button
                    key={mode}
                    className={`rounded-md border border-border px-2 py-1 ${
                      compareParam === mode
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setParam("compare", mode === "none" ? null : mode)}
                  >
                    {mode === "none"
                      ? "None"
                      : mode === "theme"
                      ? "Compare vs Theme"
                      : "Compare vs SP500 median"}
                  </button>
                ))}
              </div>
            </div>
            <div className="ml-auto">
              <div className="text-xs font-semibold uppercase text-muted-foreground">
                Frequency
              </div>
              <div className="mt-2 flex gap-2 text-xs text-muted-foreground">
                <button className="rounded-md border border-border px-2 py-1 bg-primary/10 text-primary">
                  Quarterly
                </button>
                <button
                  className="rounded-md border border-border px-2 py-1 text-muted-foreground"
                  aria-disabled="true"
                >
                  Annual
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-border bg-background p-3">
            <RatioChart
              series={chartSeries}
              formatType={activeMetric.formatType}
              compareSeries={compareSeries}
              compareLabel={compareLabel}
            />
          </div>
        </div>
      )}
    </section>
  );
}

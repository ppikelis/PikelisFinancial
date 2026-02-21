"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { useMemo } from "react";
import { filterSeriesByTimeframe, Timeframe } from "@/lib/utils/timeframe";

interface ThemePreviewChartProps {
  themeId: string;
  basketSeries: { date: string; value: number }[];
  benchmarkSeries: { date: string; value: number }[];
  timeframe: Timeframe;
}

export function ThemePreviewChart({
  basketSeries,
  benchmarkSeries,
  timeframe
}: ThemePreviewChartProps) {
  const filtered = useMemo(() => {
    const basket = filterSeriesByTimeframe(basketSeries, timeframe);
    const spy = filterSeriesByTimeframe(benchmarkSeries, timeframe);
    return basket.map((point, index) => ({
      date: point.date,
      basket: point.value,
      spy: spy[index]?.value ?? point.value
    }));
  }, [basketSeries, benchmarkSeries, timeframe]);

  const timeframeReturnLabel = timeframe === "MAX" ? "MAX" : timeframe;

  const computeReturn = (series: { value: number }[]) => {
    if (series.length < 2) {
      return 0;
    }
    return ((series[series.length - 1].value / series[0].value - 1) * 100);
  };

  const basketReturn = computeReturn(filtered.map((point) => ({ value: point.basket })));
  const spyReturn = computeReturn(filtered.map((point) => ({ value: point.spy })));
  const outperformance = basketReturn - spyReturn;

  return (
    <div className="space-y-2">
      <div className="h-32 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={filtered}>
          <XAxis dataKey="date" hide />
          <YAxis hide />
          <Tooltip
            cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
            content={({ label, payload }) => {
              if (!payload || payload.length === 0) {
                return null;
              }
              const basket = payload.find((item) => item.dataKey === "basket")?.value ?? 0;
              const spy = payload.find((item) => item.dataKey === "spy")?.value ?? 0;
              const basketReturn = basket - 100;
              const spyReturn = spy - 100;
              const outperformance = basketReturn - spyReturn;
              return (
                <div className="rounded-md border border-border bg-card px-3 py-2 text-xs text-foreground shadow">
                  <div className="text-muted-foreground">{label}</div>
                  <div className="mt-1 flex justify-between gap-3">
                    <span>Basket</span>
                    <span>{basketReturn.toFixed(2)}%</span>
                  </div>
                  <div className="mt-1 flex justify-between gap-3 text-muted-foreground">
                    <span>S&amp;P 500</span>
                    <span>{spyReturn.toFixed(2)}%</span>
                  </div>
                  <div className="mt-1 flex justify-between gap-3">
                    <span>Outperformance</span>
                    <span>{outperformance.toFixed(2)}%</span>
                  </div>
                </div>
              );
            }}
          />
          <Line
            type="monotone"
            dataKey="basket"
            stroke="hsl(var(--primary))"
            strokeWidth={2.8}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="spy"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={1.8}
            strokeDasharray="6 6"
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap items-center justify-between text-[11px] text-muted-foreground">
        <div>
          {timeframeReturnLabel}:{" "}
          <span className={basketReturn >= 0 ? "text-primary" : "text-red-400"}>
            {basketReturn.toFixed(2)}%
          </span>
        </div>
        <div>
          S&amp;P 500:{" "}
          <span className="text-muted-foreground">{spyReturn.toFixed(2)}%</span>
        </div>
        <div>
          +/‑{" "}
          <span className={outperformance >= 0 ? "text-primary" : "text-red-400"}>
            {outperformance.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
}

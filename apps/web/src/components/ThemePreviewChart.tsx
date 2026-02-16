"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

interface ThemePreviewChartProps {
  themeId: string;
  basketSeries: { date: string; value: number }[];
  benchmarkSeries: { date: string; value: number }[];
}

export function ThemePreviewChart({
  basketSeries,
  benchmarkSeries
}: ThemePreviewChartProps) {
  const merged = basketSeries.map((point, index) => ({
    date: point.date,
    basket: point.value,
    spy: benchmarkSeries[index]?.value ?? point.value
  }));

  return (
    <div className="h-32 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={merged}>
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
  );
}

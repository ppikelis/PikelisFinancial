"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { PricePoint } from "@/lib/mock/stockPriceSeries";

export type StockTimeframe =
  | "1D"
  | "5D"
  | "1M"
  | "3M"
  | "6M"
  | "YTD"
  | "1Y"
  | "5Y"
  | "MAX";

interface StockChartProps {
  series: PricePoint[];
  timeframe: StockTimeframe;
}

const filterSeries = (series: PricePoint[], frame: StockTimeframe) => {
  if (frame === "MAX") return series;
  const end = new Date(series[series.length - 1]?.date ?? new Date());
  if (frame === "YTD") {
    const start = new Date(end.getFullYear(), 0, 1);
    return series.filter((point) => new Date(point.date) >= start);
  }
  const map: Record<StockTimeframe, number> = {
    "1D": 1,
    "5D": 5,
    "1M": 30,
    "3M": 90,
    "6M": 180,
    "1Y": 365,
    "5Y": 1825,
    YTD: 365,
    MAX: 0
  };
  const days = map[frame] ?? 30;
  const start = new Date(end);
  start.setDate(end.getDate() - days);
  return series.filter((point) => new Date(point.date) >= start);
};

export function StockChart({ series, timeframe }: StockChartProps) {
  const filtered = filterSeries(series, timeframe);
  const base = filtered[0]?.price ?? 1;

  const data = filtered.map((point) => ({
    ...point,
    changePct: ((point.price / base - 1) * 100).toFixed(2)
  }));

  return (
    <div className="space-y-3">
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" hide />
            <YAxis
              width={40}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              domain={["auto", "auto"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "6px"
              }}
              formatter={(value, name, props) => {
                if (name === "price") {
                  return [`$${Number(value).toFixed(2)}`, "Price"];
                }
                return [value, name];
              }}
              labelFormatter={(label) =>
                new Date(label).toLocaleString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })
              }
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const price = payload[0]?.payload?.price ?? 0;
                const changePct = payload[0]?.payload?.changePct ?? "0.00";
                return (
                  <div className="rounded-md border border-border bg-card p-3 text-xs text-muted-foreground">
                    <div>{new Date(label).toLocaleString()}</div>
                    <div className="mt-1 text-sm font-semibold text-foreground">
                      ${Number(price).toFixed(2)}
                    </div>
                    <div>{changePct}% since start</div>
                  </div>
                );
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="hsl(var(--primary))"
              strokeWidth={2.2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

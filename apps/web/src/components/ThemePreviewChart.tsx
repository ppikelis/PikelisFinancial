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
    <div className="h-28 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={merged}>
          <XAxis dataKey="date" hide />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              borderRadius: "4px"
            }}
            labelStyle={{ color: "hsl(var(--muted-foreground))" }}
          />
          <Line
            type="monotone"
            dataKey="basket"
            stroke="hsl(var(--primary))"
            strokeWidth={2.2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="spy"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={1.4}
            strokeDasharray="6 6"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

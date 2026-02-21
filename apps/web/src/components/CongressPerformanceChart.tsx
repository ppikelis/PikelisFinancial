"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export interface PerformancePoint {
  date: string;
  value: number;
}

interface CongressPerformanceChartProps {
  series: PerformancePoint[];
}

export function CongressPerformanceChart({ series }: CongressPerformanceChartProps) {
  return (
    <div className="h-60 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={series}>
          <XAxis dataKey="date" hide />
          <YAxis
            width={44}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              borderRadius: "6px"
            }}
            labelFormatter={(label) =>
              new Date(label).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric"
              })
            }
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--primary))"
            strokeWidth={2.2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

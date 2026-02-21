"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { RatioPoint } from "@/lib/mock/ratioHistory";
import { RatioFormatType } from "@/lib/data/ratioMeta";

interface RatioChartProps {
  series: RatioPoint[];
  formatType: RatioFormatType;
  compareSeries?: RatioPoint[];
  compareLabel?: string;
}

const formatValue = (value: number, formatType: RatioFormatType) => {
  if (formatType === "percent") {
    return `${value.toFixed(1)}%`;
  }
  if (formatType === "usd") {
    return `$${value.toFixed(1)}B`;
  }
  return `${value.toFixed(2)}x`;
};

export function RatioChart({
  series,
  formatType,
  compareSeries,
  compareLabel
}: RatioChartProps) {
  const data = series.map((point, index) => ({
    date: point.date,
    value: point.value,
    compareValue: compareSeries?.[index]?.value ?? null
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" hide />
          <YAxis
            width={48}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => formatValue(Number(value), formatType)}
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
                year: "numeric"
              })
            }
            formatter={(value) => [
              formatValue(Number(value), formatType),
              "Value"
            ]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--primary))"
            strokeWidth={2.2}
            dot={false}
            connectNulls={false}
          />
          {compareSeries ? (
            <Line
              type="monotone"
              dataKey="compareValue"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={1.8}
              strokeDasharray="6 6"
              dot={false}
              connectNulls={false}
              name={compareLabel ?? "Compare"}
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

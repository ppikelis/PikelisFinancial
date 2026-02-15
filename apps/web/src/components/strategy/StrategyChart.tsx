"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

interface StrategyChartProps {
  equityCurve: { date: string; value: number }[];
  benchmarkCurve: { date: string; value: number }[];
  showBenchmark: boolean;
}

export function StrategyChart({
  equityCurve,
  benchmarkCurve,
  showBenchmark
}: StrategyChartProps) {
  const merged = equityCurve.map((point, index) => ({
    date: point.date,
    strategy: point.value,
    benchmark: benchmarkCurve[index]?.value ?? point.value
  }));

  return (
    <div className="h-96 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={merged}>
          <XAxis dataKey="date" hide />
          <YAxis
            width={36}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            domain={["auto", "auto"]}
          />
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
            dataKey="strategy"
            stroke="hsl(var(--primary))"
            strokeWidth={2.2}
            dot={false}
          />
          {showBenchmark ? (
            <Line
              type="monotone"
              dataKey="benchmark"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={1.6}
              dot={false}
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { useState } from "react";

interface ThemeStrategyChartProps {
  data: Record<string, number | string>[];
  tickers: string[];
  showBasket: boolean;
  showSpy: boolean;
}

export function ThemeStrategyChart({
  data,
  tickers,
  showBasket,
  showSpy
}: ThemeStrategyChartProps) {
  const [visible, setVisible] = useState<Record<string, boolean>>(
    tickers.reduce((acc, symbol) => {
      acc[symbol] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggle = (symbol: string) => {
    setVisible((prev) => ({ ...prev, [symbol]: !prev[symbol] }));
  };

  return (
    <div className="space-y-4">
    <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
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
            {tickers.map((symbol) =>
              visible[symbol] ? (
                <Line
                  key={symbol}
                  type="monotone"
                  dataKey={symbol}
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={1}
                  dot={false}
                />
              ) : null
            )}
            {showBasket ? (
              <Line
                type="monotone"
                dataKey="basket"
                stroke="hsl(var(--primary))"
                strokeWidth={2.4}
                dot={false}
              />
            ) : null}
            {showSpy ? (
              <Line
                type="monotone"
                dataKey="spy"
                stroke="#f8fafc"
                strokeWidth={2.2}
                strokeDasharray="6 6"
                dot={false}
              />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap gap-3 text-xs">
        <span className="rounded-md border border-border px-2 py-1 text-muted-foreground">
          Basket
        </span>
        <span className="rounded-md border border-border px-2 py-1 text-muted-foreground">
          S&P 500
        </span>
        {tickers.map((symbol) => (
          <button
            key={symbol}
            className={`rounded-md border border-border px-2 py-1 ${
              visible[symbol] ? "bg-muted text-foreground" : "text-muted-foreground"
            }`}
            onClick={() => toggle(symbol)}
          >
            {symbol}
          </button>
        ))}
      </div>
    </div>
  );
}

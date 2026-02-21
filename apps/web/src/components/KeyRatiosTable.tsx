"use client";

import { StockMetricSnapshot } from "@/lib/mock/stockMetrics";

interface KeyRatiosTableProps {
  metric: StockMetricSnapshot;
}

const formatPct = (value: number) => `${value.toFixed(1)}%`;

export function KeyRatiosTable({ metric }: KeyRatiosTableProps) {
  const valuation = [
    { label: "P/E (TTM)", value: `${metric.pe.toFixed(1)}x` },
    { label: "Forward P/E", value: `${metric.forwardPe.toFixed(1)}x` },
    { label: "PEG", value: metric.peg.toFixed(2) },
    { label: "Price/Sales", value: metric.priceToSales.toFixed(2) },
    { label: "EV/EBITDA", value: metric.evEbitda.toFixed(1) },
    { label: "Price/Book", value: metric.priceToBook.toFixed(2) }
  ];

  const growth = [
    { label: "Revenue Growth YoY", value: formatPct(metric.revenueGrowth) },
    { label: "EPS Growth YoY", value: formatPct(metric.epsGrowth) }
  ];

  const profitability = [
    { label: "Gross Margin", value: formatPct(metric.grossMargin) },
    { label: "Operating Margin", value: formatPct(metric.operatingMargin) },
    { label: "Net Margin", value: formatPct(metric.netMargin) },
    { label: "ROE", value: formatPct(metric.roe) },
    { label: "ROIC", value: formatPct(metric.roic) }
  ];

  const health = [
    { label: "Debt/Equity", value: metric.debtToEquity.toFixed(2) },
    { label: "Current Ratio", value: metric.currentRatio.toFixed(2) },
    { label: "Free Cash Flow (TTM)", value: `$${metric.freeCashFlow.toFixed(1)}B` }
  ];

  const renderGroup = (
    title: string,
    items: { label: string; value: string }[]
  ) => (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="text-sm font-semibold text-foreground">{title}</div>
      <div className="mt-3 space-y-2 text-sm">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between">
            <span className="text-muted-foreground">{item.label}</span>
            <span className="font-semibold text-foreground">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Key Ratios</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {renderGroup("Valuation", valuation)}
        {renderGroup("Growth", growth)}
        {renderGroup("Profitability", profitability)}
        {renderGroup("Financial Health", health)}
      </div>
    </section>
  );
}

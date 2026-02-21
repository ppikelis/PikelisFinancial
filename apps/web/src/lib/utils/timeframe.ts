export type Timeframe =
  | "1W"
  | "1M"
  | "3M"
  | "6M"
  | "YTD"
  | "1Y"
  | "3Y"
  | "5Y"
  | "MAX";

const timeframeMap: Record<Exclude<Timeframe, "YTD" | "MAX">, number> = {
  "1W": 7,
  "1M": 30,
  "3M": 90,
  "6M": 180,
  "1Y": 365,
  "3Y": 1095,
  "5Y": 1825
};

export function filterSeriesByTimeframe<T extends { date: string }>(
  series: T[],
  timeframe: Timeframe
) {
  if (series.length === 0 || timeframe === "MAX") {
    return series;
  }

  const end = new Date(series[series.length - 1].date);

  if (timeframe === "YTD") {
    const start = new Date(end.getFullYear(), 0, 1);
    return series.filter((point) => new Date(point.date) >= start);
  }

  const days = timeframeMap[timeframe];
  const start = new Date(end);
  start.setDate(end.getDate() - days);
  return series.filter((point) => new Date(point.date) >= start);
}

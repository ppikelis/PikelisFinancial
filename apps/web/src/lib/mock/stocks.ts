import {
  ActivityEvent,
  KPI,
  RatingSummary,
  Ticker
} from "@/lib/types";
import { STOCK_GROUPS, STOCK_GROUPS_ORDER } from "@/lib/data/stocks";
import { articleMock } from "@/lib/mock/articles";

export interface StockMetric {
  symbol: string;
  name: string;
  price: number;
  changePct: number;
  marketCap: number;
  pe: number;
  forwardPe: number;
  peg: number;
  priceToSales: number;
  evEbitda: number;
  revenueGrowth: number;
  epsGrowth: number;
  nextEarningsDate: string;
  analystRating: "Buy" | "Hold" | "Sell";
  priceTarget: number;
}

const baseDate = new Date("2026-03-05T13:00:00Z");

const seeded = (seed: string) => {
  let value = seed.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
};

const formatName = (name?: string, fallback?: string) =>
  name ?? fallback ?? "Unknown";

const ratingFromSeed = (rand: () => number) => {
  const value = rand();
  if (value > 0.66) return "Buy";
  if (value > 0.33) return "Hold";
  return "Sell";
};

const marketCapBase: Record<string, number> = {
  MAG7: 1200,
  "AI Infrastructure": 250,
  Nuclear: 50,
  "Quantum Computing": 8,
  "Flying Taxis": 6
};

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const mockStockMetrics: StockMetric[] = STOCK_GROUPS_ORDER.flatMap(
  (groupName) => {
    const baseCap = marketCapBase[groupName] ?? 50;
    return STOCK_GROUPS[groupName].map((stock, index) => {
      const rand = seeded(`${groupName}-${stock.symbol}`);
      const price = Number((20 + rand() * 380).toFixed(2));
      const changePct = Number(((rand() - 0.5) * 6).toFixed(2));
      const marketCap = Number((baseCap + rand() * baseCap * 0.6).toFixed(1));
      const pe = Number((10 + rand() * 35).toFixed(1));
      const forwardPe = Number((8 + rand() * 30).toFixed(1));
      const peg = Number((0.6 + rand() * 2.4).toFixed(2));
      const priceToSales = Number((2 + rand() * 12).toFixed(2));
      const evEbitda = Number((6 + rand() * 20).toFixed(1));
      const revenueGrowth = Number(((rand() - 0.2) * 35).toFixed(1));
      const epsGrowth = Number(((rand() - 0.15) * 40).toFixed(1));
      const earningsOffset = 7 + Math.round(rand() * 90) + index * 2;
      const earningsDate = new Date(baseDate);
      earningsDate.setDate(baseDate.getDate() + earningsOffset);

      return {
        symbol: stock.symbol,
        name: formatName(stock.name, stock.symbol),
        price,
        changePct,
        marketCap,
        pe,
        forwardPe,
        peg,
        priceToSales,
        evEbitda,
        revenueGrowth,
        epsGrowth,
        nextEarningsDate: earningsDate.toISOString(),
        analystRating: ratingFromSeed(rand),
        priceTarget: Number((price * (1 + rand() * 0.35)).toFixed(2))
      };
    });
  }
);

const buildKpis = (metric: StockMetric): KPI[] => [
  { label: "Market Cap", value: `${metric.marketCap.toFixed(1)}B` },
  { label: "P/E", value: `${metric.pe.toFixed(1)}x` },
  { label: "Revenue Growth", value: `${metric.revenueGrowth.toFixed(1)}%` },
  { label: "Forward P/E", value: `${metric.forwardPe.toFixed(1)}x` }
];

const buildRatings = (metric: StockMetric): RatingSummary[] => [
  {
    label: "Analyst Consensus",
    value: metric.analystRating,
    tone:
      metric.analystRating === "Buy"
        ? "positive"
        : metric.analystRating === "Hold"
        ? "neutral"
        : "negative"
  }
];

const buildRelatedArticles = (symbol: string) =>
  Object.values(articleMock)
    .filter((article) => article.tickers.includes(symbol))
    .map((article) => ({ slug: article.slug, title: article.title }));

export const stockMock: Record<
  string,
  {
    ticker: Ticker;
    kpis: KPI[];
    ratings: RatingSummary[];
    activity: ActivityEvent[];
    relatedArticles: { slug: string; title: string }[];
  }
> = mockStockMetrics.reduce((acc, metric) => {
  acc[metric.symbol] = {
    ticker: {
      symbol: metric.symbol,
      name: metric.name,
      price: metric.price,
      change: Number((metric.price * (metric.changePct / 100)).toFixed(2)),
      changePercent: metric.changePct,
      trend: metric.changePct >= 0 ? "up" : "down"
    },
    kpis: buildKpis(metric),
    ratings: buildRatings(metric),
    activity: [],
    relatedArticles: buildRelatedArticles(metric.symbol)
  };
  return acc;
}, {} as Record<string, {
  ticker: Ticker;
  kpis: KPI[];
  ratings: RatingSummary[];
  activity: ActivityEvent[];
  relatedArticles: { slug: string; title: string }[];
}>);
